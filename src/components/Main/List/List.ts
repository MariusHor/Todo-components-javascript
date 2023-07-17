import { Component } from 'lib';
import { type IController, type SetComponentsProps } from 'lib/_types';

import { TodosProvider, type TodosContext, FiltersProvider, FiltersContext } from 'providers';
import ListItem from './ListItem';
import { type Filter } from 'types';
import { filterTodos } from 'utils/helpers';

type State = TodosContext & {
  activeFilter: Filter;
};

class List extends Component<State, object> {
  protected readonly state = {} as State;

  protected template = (): string => {
    return /*html*/ `
      <ul class="todo-list">
      </ul>
    `;
  };

  protected setComponents = ({ state, root }: SetComponentsProps<State>) => {
    const filteredTodos = filterTodos(state.todos, state.activeFilter);
    return [...filteredTodos.map((todo) => ListItem(root, todo))];
  };

  protected beforeMount = (controller: IController<State, object>) => {
    FiltersProvider.registerListener({
      onConnect: (context) => this.handleFiltersProvider(context, controller),
      onChange: (context) => this.handleFiltersProvider(context, controller),
      id: 'list',
    });

    TodosProvider.registerListener({
      onConnect: (context) => this.handleTodosProvider(context, controller),
      onChange: (context) => this.handleTodosProvider(context, controller),
      id: 'list',
    });
  };

  private handleFiltersProvider(context: FiltersContext, controller: IController<State, object>) {
    const todos = TodosProvider.getState();
    controller.update.call(controller, { ...context, ...todos });
  }

  private handleTodosProvider(context: TodosContext, controller: IController<State, object>) {
    const filter = FiltersProvider.getState();
    controller.update.call(controller, { ...context, ...filter });
  }
}

export default new List().create();
