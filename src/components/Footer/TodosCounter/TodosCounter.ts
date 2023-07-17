import { Component } from 'lib';
import { type IController, type RenderProps } from 'lib/_types';

import { type TodosContext, TodosProvider } from 'providers';
import { getUncompletedTodos } from 'utils';

type State = TodosContext;

class TodosCounter extends Component<State, object> {
  protected state = {} as State;

  protected template = ({ state }: RenderProps<State, object>): string => {
    const uncompletedTodos = getUncompletedTodos(state.todos);

    return /*html*/ `
        <span class="todo-count">
            <strong>${uncompletedTodos}</strong>
            ${uncompletedTodos === 1 ? ' item' : ' items'} left
        </span>
    `;
  };

  protected beforeMount = (controller: IController<State, object>) =>
    TodosProvider.registerListener({
      onConnect: controller.update.bind(controller),
      onChange: controller.update.bind(controller),
      id: 'todos-counter',
    });
}

export default new TodosCounter().create();
