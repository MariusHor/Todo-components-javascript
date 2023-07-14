import { Store } from 'lib';
import { type State } from 'lib/_types';

import { type Todo } from 'types';

/*
    External Store with a different interface
*/

type ExternalStoreState = {
  nextId: number;
  todos: Todo[];
};

interface IExternalStore {
  provideState(): State;
  updateState(callback: (state: State) => State): void;
}

class ExternalStore implements IExternalStore {
  state: ExternalStoreState = {
    nextId: 0,
    todos: [],
  };

  public provideState() {
    return this.state;
  }

  public updateState(callback: (state: ExternalStoreState) => ExternalStoreState) {
    this.state = callback(this.state);
  }
}

/*
  Store Adapter that extends the original Store class and adapts its methods to work with an External Store class
  This means that it is compatible with the Controller which only accepts Stores that implement this IStore interface
*/

export class StoreAdapter extends Store {
  constructor() {
    super();
    this.externalStore = new ExternalStore();
  }

  protected externalStore;
  protected state: State = {};

  public getState(): State {
    return this.externalStore.provideState();
  }

  public setState<GenericState>(callback: (state: GenericState) => GenericState) {
    this.externalStore.updateState(
      callback as unknown as (state: ExternalStoreState) => ExternalStoreState,
    );
  }
}
