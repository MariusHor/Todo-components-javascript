import { Component } from 'lib';
import { IController, type SetComponentsProps } from 'lib/_types';

import { Button } from 'components';
import { TodosContext, TodosProvider } from 'providers';
import { getCompletedTodos } from 'utils';
import { clearCompleted } from 'actions';

type State = TodosContext & {
  name: string;
};

class ClearCompletedBtn extends Component<State, object> {
  protected state = {} as State;

  protected template = (): string => /*html*/ `
  <div class="clear-container">
  </div>
`;

  protected setComponents = ({ state, root }: SetComponentsProps<State>) => {
    const completedTodos = getCompletedTodos(state.todos);
    completedTodos >= 1 &&
      Button(root, {
        title: 'Clear completed',
        class: 'clear-completed',
        id: 'clearAll',
        callback: this.handleClearCompletedCallback,
      });
  };

  protected beforeMount = (controller: IController<State, object>) =>
    TodosProvider.registerListener({
      onConnect: (context) => controller.update.call(controller, context),
      onChange: (context) => controller.update.call(controller, context),
      id: 'clearAll',
    });

  private handleClearCompletedCallback = () => {
    TodosProvider.setState(clearCompleted());
  };
}

export default new ClearCompletedBtn().create();
