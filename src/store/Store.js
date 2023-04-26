import { cloneDeep } from 'lodash';

export default class Store {
  constructor({ eventsEmitter }) {
    this.eventsEmitter = eventsEmitter;

    this.history = {
      states: [],
      pointer: -1,
    };

    this.prevState = null;

    this.state = {
      history: {
        length: 0,
      },
      filtersProps: [
        { name: 'all', title: 'All', id: 0 },
        { name: 'active', title: 'Active', id: 1 },
        { name: 'completed', title: 'Completed', id: 2 },
      ],
      form: {
        input: {
          value: '',
        },
        button: {
          title: 'Submit',
        },
        isUpdating: false,
        noteToUpdate: null,
      },
      activeNotesFilter: 'all',
      nextNoteId: 3,
      notes: {},
    };
  }

  get on() {
    return this.eventsEmitter.on;
  }

  get off() {
    return this.eventsEmitter.off;
  }

  get emit() {
    return this.eventsEmitter.emit;
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

  setState = (callback) => {
    this.prevState = this.setPrevState(this.state);

    this.state = callback(this.state);
    this.history = this.saveStateToHistory(this.state);
    this.state = {
      ...this.state,
      history: { length: this.history.states.length },
    };

    this.dispatchUpdate('update');

    return this.state;
  };

  setPrevState = (state) => {
    return cloneDeep(state);
  };

  saveStateToHistory = (state) => {
    const { pointer, states } = this.history;

    this.history = {
      states: [...states, { ...state }],
      pointer: pointer + 1,
    };

    return this.history;
  };

  handleUndo = () => {
    const { pointer, states } = this.history;

    if (pointer <= 0) return;

    this.prevState = this.setPrevState(this.state);

    this.state = {
      ...states[pointer - 1],
    };

    this.history = { ...this.history, pointer: pointer - 1 };

    this.dispatchUpdate('update');
  };

  handleRedo = () => {
    const { pointer, states } = this.history;

    if (pointer >= states.length - 1) return;

    this.prevState = this.setPrevState(this.state);

    this.state = {
      ...states[pointer + 1],
    };

    this.history = { ...this.history, pointer: pointer + 1 };

    this.dispatchUpdate('update');
  };
}
