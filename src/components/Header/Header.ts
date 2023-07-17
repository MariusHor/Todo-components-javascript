import { Component } from 'lib';
import { type IController, type RenderProps, type setActionsProps } from 'lib/_types';

import { TodosProvider, type FormContext, FormProvider } from 'providers';
import { saveTodoEdit, addTodo, resetForm } from 'actions';
import { el } from 'utils';

type State = FormContext & {
  title: string;
};

class Header extends Component<State, object> {
  protected state = {
    title: 'Todos',
  } as State;

  protected template = ({ state }: RenderProps<State, object>): string => {
    return /*html*/ `
      <header class="header">
          <h1>${state.title}</h1>
          <form data-el="form">
              <input 
                class="new-todo" 
                placeholder="What needs to be done?" 
                data-el="input" 
                value=${state.value}>
          </form>
      </header>
    `;
  };

  protected setActions = ({ state }: setActionsProps<State, object>) => [
    {
      elementSelector: 'data-el="form"',
      event: 'submit',
      callback: (event: Event) => this.handleSubmit(event, state),
    },
  ];

  protected beforeMount = (controller: IController<State, object>) =>
    FormProvider.registerListener({
      onConnect: (context) => this.handleStateChange(context, controller),
      onChange: (context) => this.handleStateChange(context, controller),
      id: 'header',
    });

  private handleStateChange = (context: FormContext, controller: IController<State, object>) => {
    controller.update.call(controller, context);
    const input = el(`data-el="input"`) as HTMLInputElement;
    input.focus();
  };

  private handleSubmit = (event: Event, state: State) => {
    event.preventDefault();
    const input = el(`data-el="input"`) as HTMLInputElement;
    const todoTitle = input.value;

    if (state.isEditing) {
      TodosProvider.setState(saveTodoEdit(todoTitle, state.todoToEditId as number));
      FormProvider.setState(resetForm());
    }
    if (!state.isEditing) {
      TodosProvider.setState(addTodo(todoTitle));
    }

    input.focus();
    input.value = '';
  };
}

export default new Header().create();
