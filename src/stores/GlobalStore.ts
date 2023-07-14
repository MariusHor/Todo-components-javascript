import { Store } from 'lib';
import { type Index } from 'lib/_types';

import { type Todo } from 'types';

/*
  Global Store
*/

export type GlobalState = Index & {
  nextId: number;
  todos: Todo[];
  activeFilter: string;
  form: {
    value: string;
    isEditing: boolean;
  };
};

export class GlobalStore extends Store {
  private constructor() {
    super();
  }

  private static instance: GlobalStore;

  public static getInstance(): GlobalStore {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }
    return GlobalStore.instance;
  }

  protected state: GlobalState = {
    nextId: 1,
    todos: [],
    form: {
      value: '',
      isEditing: false,
    },
    activeFilter: 'all',
  };
}
