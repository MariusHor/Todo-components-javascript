import { Controller, View, ComponentFactory, PubSub } from 'lib';
import { type Props, type Render } from 'lib/_types';

import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from 'actions';
import { type GeneralState } from 'types';
import { GlobalStore } from 'stores';
import Filters from './Filters';

/*
  Controller
*/

class FooterController extends Controller {
  protected ViewBlueprint = FooterView;
  protected GlobalStoreBlueprint = GlobalStore;

  protected components(state: GeneralState) {
    if (state.global.todos.length === 0) return [];
    return [Filters.create()];
  }
}

/*
  View 
*/

class FooterView extends View {
  protected refSelectors = {
    node: `footer-${this.props.nodeId}`,
  };

  protected render({ state }: Render<Props, GeneralState>) {
    if (state.global.todos.length === 0) return '';
    const uncompletedTodos = state.global.todos.reduce((total, current) => {
      return (total = !current.completed ? total + 1 : total);
    }, 0);

    return /*html*/ `
      <footer class="footer" data-view=${this.refSelectors.node}>
        <span class="todo-count">
            <strong>${uncompletedTodos}</strong>
            ${uncompletedTodos === 1 ? ' item' : ' items'} left
        </span>
      </footer>
    `;
  }
}

/*
  Local Store - optional: if used, it has to be assigned to the StoreBlueprint property of the Controller
*/

// class FooterStore extends Store {
//   protected state: State = {};
// }

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class Footer extends ComponentFactory {
  protected ComponentBlueprint = FooterController;

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
        callback: this.update.bind(this),
      },
    ]);
  }
}

export default new Footer();
