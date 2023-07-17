import { Component } from 'lib';
import { type IController, type SetComponentsProps } from 'lib/_types';

import { type TodosContext, TodosProvider } from 'providers';
import { Header, Main, Footer } from 'components';

type State = TodosContext;

class App extends Component<State, object> {
  protected state = {} as State;

  protected setComponents = ({ state, root }: SetComponentsProps<State>) => {
    Header(root);
    if (state.todos.length > 0) {
      Main(root);
      Footer(root);
    }
  };

  protected beforeMount = (controller: IController<State, object>) =>
    TodosProvider.registerListener({
      onConnect: (context) => this.handleRender(context, controller),
      onChange: (context) => this.handleRender(context, controller),
      id: 'todos',
    });

  private handleRender = (context: TodosContext, controller: IController<State, object>) => {
    if (context.todos.length <= 1) controller.update.call(controller, context);
  };
}

export default new App().create();
