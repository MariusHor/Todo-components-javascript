import { Controller, View, ComponentFactory, PubSub } from 'lib';
import { type Props, type Render } from 'lib/_types';

import {
  DELETE_TODO,
  EDIT_TODO_START,
  TOGGLE_TODO,
  deleteTodo,
  editTodoStart,
  toggleTodo,
} from 'actions';

import { GlobalStore } from 'stores';
import { type GeneralState } from 'types';

/*
  Controller
*/

class ListItemController extends Controller {
  declare view: ListItemView;
  protected ViewBlueprint = ListItemView;
  protected GlobalStoreBlueprint = GlobalStore;
  private pubSub = PubSub.getInstance();

  protected components() {
    return [];
  }

  protected delegateDeleteTodo(): void {
    this.view.handleDeleteTodo(() => {
      if (typeof this.props.id === 'number') {
        this.setState({ callback: deleteTodo(this.props.id), skipUpdate: true });
        this.pubSub.publish(DELETE_TODO, { node: this.view?.refs.node });
      }
    });
  }

  protected delegateToggleTodo(): void {
    this.view.handleToggleTodo(() => {
      if (typeof this.props.id === 'number') {
        this.setState({ callback: toggleTodo(this.props.id), skipUpdate: true });
        this.pubSub.publish(TOGGLE_TODO);
      }
    });
  }

  protected delegateEditTodo(): void {
    this.view.handleEditTodo(() => {
      if (typeof this.props.id === 'number') {
        this.setState({ callback: editTodoStart(this.props.id), skipUpdate: true });
        this.pubSub.publish(EDIT_TODO_START);
      }
    });
  }
}

/*
  View 
*/

class ListItemView extends View {
  protected refSelectors = {
    node: `todo-item-${this.props.nodeId}`,
    deleteBtn: `data-el=deleteTodo${this.props.id}`,
    checkbox: `data-el=checkbox${this.props.id}`,
    label: `data-el=label${this.props.id}`,
  };

  public handleDeleteTodo(callback: () => void) {
    this.refs.deleteBtn.addEventListener('click', callback);
  }

  public handleToggleTodo(callback: () => void) {
    this.refs.checkbox.addEventListener('click', callback);
  }

  public handleEditTodo(callback: () => void) {
    this.refs.label.addEventListener('dblclick', callback);
  }

  protected render({ props }: Render<Props, GeneralState>) {
    return /*html*/ `
      <li 
        class="${props.completed ? 'completed' : ''} todo-item" 
        data-view=${this.refSelectors.node}
        data-id=${props.id}
    >
        <div class="view">
            <input 
                class="toggle" 
                id=${props.id} 
                data-el=${`checkbox` + props.id} 
                type="checkbox" 
                ${props.completed ? 'checked' : null}
                />
            <label data-el=${`label` + props.id} >
                ${props.title}
            </label>
            <button class="destroy" data-el=${`deleteTodo` + props.id}></button>
        </div>
      </li>
    `;
  }
}

/*
  Local Store - optional: if used, it has to be assigned to the StoreBlueprint property of the Controller
*/

// class ListItemStore extends Store {
//   protected state: State = {};
// }

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class ListItem extends ComponentFactory {
  protected ComponentBlueprint = ListItemController;
}

export default new ListItem();
