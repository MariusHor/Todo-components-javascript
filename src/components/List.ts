import { Controller, View, ComponentFactory, PubSub } from 'lib';
import { Payload, Props, Render } from 'lib/_types';

import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from 'actions';
import { type GeneralState } from 'types';
import { GlobalStore } from 'stores';
import ListItem from './ListItem';

/*
  Controller
*/

class ListController extends Controller {
  protected ViewBlueprint = ListView;
  protected GlobalStoreBlueprint = GlobalStore;

  protected components(state: GeneralState) {
    if (state.global.todos.length === 0) return [];
    return [...state.global.todos.map((todo) => ListItem.create({ ...todo }))];
  }
}

/*
  View
*/

class ListView extends View {
  protected refSelectors = {
    node: `todo-list-${this.props.nodeId}`,
  };

  protected render({ state }: Render<Props, GeneralState>) {
    if (state.global.todos.length === 0) return '';
    return /*html*/ `
      <ul class="todo-list" data-view=${this.refSelectors.node}>
      </ul>
    `;
  }
}

/*
  Local Store - optional: if used, it has to be assigned to the StoreBlueprint property of the Controller
*/

// class ListStore extends Store {
//   protected state: State = {};
// }

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class List extends ComponentFactory {
  protected ComponentBlueprint = ListController;

  private pubSub = PubSub.getInstance();

  constructor() {
    super();
    this.pubSub.subscribe([
      {
        event: ADD_TODO,
        callback: this.update.bind(this),
      },
      {
        event: TOGGLE_TODO,
        callback: this.update.bind(this),
      },
      {
        event: DELETE_TODO,
        callback: this.handleDelete.bind(this),
      },
    ]);
  }

  private handleDelete(payload?: Payload): void {
    if (payload?.node instanceof HTMLElement) this.instances[0].view?.removeChildNode(payload.node);
  }
}

export default new List();
