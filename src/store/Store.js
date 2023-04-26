import { cloneDeep } from 'lodash';

export default class Store {
  constructor({ eventsEmitter }) {
    this.eventsEmitter = eventsEmitter;

    this.prevState = null;

    this.state = {
      filtersProps: [
        {
          id: 0,
          name: 'all',
          title: 'All',
          href: '#/',
        },
        {
          id: 1,
          name: 'active',
          title: 'Active',
          href: '#/active',
        },
        {
          id: 2,
          name: 'completed',
          title: 'Completed',
          href: '#/completed',
        },
      ],
      form: {
        input: {
          value: '',
        },
        isUpdating: false,
        noteToUpdate: null,
      },
      activeNotesFilter: 'all',
      nextNoteId: 0,
      notes: {},
    };

    this.areAllNotesChecked = true;
  }

  getState = () => this.state;

  getPrevState = () => this.prevState;

  subscribe = (event, listener) => {
    return this.eventsEmitter.subscribe(event, listener);
  };

  unsubscribe = (event, listener) => {
    return this.eventsEmitter.unsubscribe(event, listener);
  };

  initUpdate = (event) => {
    this.history = this.saveStateToHistory(this.state);
    this.dispatchUpdate(event);
  };

  dispatchUpdate(event) {
    this.eventsEmitter.emit(event, this.state);
  }

  setPrevState = (state) => {
    return cloneDeep(state);
  };

  dispatch = (actions) => {
    this.prevState = this.setPrevState(this.state);

    actions.forEach((action) => {
      const { type, payload } = action();
      switch (type) {
        case 'todos/add':
          this.state = this.addTodo(this.state, payload);
          break;
        case 'todos/check':
          this.state = this.checkTodo(this.state, payload);
          break;
        case 'todos/toggleAll':
          this.state = this.toggleAllTodos(this.state);
          break;
        case 'todos/clearCompleted':
          this.state = this.clearCompleted(this.state);

          break;
        case 'form/setInput':
          this.state = this.setFormInput(this.state, payload);
          break;
      }
    });

    this.dispatchUpdate('update');
  };

  addTodo = (state, payload) => {
    return {
      ...state,
      nextNoteId: state.nextNoteId + 1,
      notes: {
        ...state.notes,
        [state.nextNoteId]: {
          id: state.nextNoteId,
          ...payload,
        },
      },
    };
  };

  checkTodo = (state, payload) => {
    return {
      ...state,
      notes: {
        ...state.notes,
        [payload.id]: {
          ...state.notes[payload.id],
          completed: !state.notes[payload.id].completed,
        },
      },
    };
  };

  toggleAllTodos = (state) => {
    const notesLeft = Object.values(state.notes).some((note) => !note.completed);

    const updatedTodos = Object.entries(state.notes)
      .map(([key, value]) => {
        return {
          [key]: {
            ...value,
            completed: notesLeft ? true : false,
          },
        };
      })
      .reduce((acc, curr) => {
        return {
          ...acc,
          ...curr,
        };
      }, {});

    return {
      ...state,
      notes: {
        ...updatedTodos,
      },
    };
  };

  clearCompleted = (state) => {
    const filteredNotes = Object.entries(state.notes)
      .filter((entry) => entry[1].completed === false)
      .reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {});

    return {
      ...state,
      notes: {
        ...filteredNotes,
      },
    };
  };

  setFormInput = (state, payload) => {
    return {
      ...state,
      form: {
        ...this.state.form,
        input: {
          ...payload,
        },
      },
    };
  };
}
