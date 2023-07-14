import { Controller, View, ComponentFactory, PubSub } from 'lib';
import { Props, Render } from 'lib/_types';

import { type GeneralState } from 'types';
import { ADD_TODO, EDIT_TODO_START, addTodo } from 'actions';
import { GlobalStore } from 'stores';

/*
  Controller
*/

class HeaderController extends Controller {
  declare view: HeaderView;
  protected ViewBlueprint = HeaderView;
  protected GlobalStoreBlueprint = GlobalStore;
  private pubSub = PubSub.getInstance();

  protected components() {
    return [];
  }

  protected delegateSubmitForm(): void {
    this.view.handleSubmit((todoTitle: string) => {
      this.setState({ callback: addTodo(todoTitle), skipUpdate: true });
      this.pubSub.publish(ADD_TODO);
    });
  }
}

/*
  View - optional: if used, it has to be assigned to the ViewBlueprint property of the Controller
*/

type HeaderViewRefs = {
  form: HTMLFormElement;
  input: HTMLInputElement;
};

class HeaderView extends View {
  declare refs: HeaderViewRefs;
  protected refSelectors = {
    node: `header-${this.props.nodeId}`,
    form: 'data-el="form"',
    input: 'data-el="input"',
  };

  onMount(): void {
    this.refs.input.focus();
  }

  handleSubmit(callback: (todoTitle: string) => void) {
    this.refs.form.addEventListener('submit', (event) => {
      event.preventDefault();
      callback(this.refs.input.value);
      this.refs.input.focus();
      this.refs.input.value = '';
    });
  }

  protected render({ state }: Render<Props, GeneralState>) {
    return /*html*/ `
      <header class="header" data-view=${this.refSelectors.node}>
        <h1>todos</h1>
        <form data-el="form">
          <input class="new-todo" placeholder="What needs to be done?" data-el="input" value=${state.global.form.value}>
        </form>
      </header>
    `;
  }
}

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class Header extends ComponentFactory {
  protected ComponentBlueprint = HeaderController;
  private pubSub = PubSub.getInstance();

  constructor() {
    super();
    this.pubSub.subscribe([
      {
        event: EDIT_TODO_START,
        callback: this.update.bind(this),
      },
    ]);
  }
}

export default new Header();
