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
      notes: {
        0: {
          title: 'Hello',
          completed: true,
        },
        1: {
          title: 'What is up?',
          completed: false,
        },
      },
    };
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
    this.dispatchUpdate('update');

    return this.state;
  };

  setPrevState = (state) => {
    return cloneDeep(state);
  };
}
