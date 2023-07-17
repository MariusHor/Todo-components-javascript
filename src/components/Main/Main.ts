import { Component } from 'lib';
import { type SetComponentsProps } from 'lib/_types';

import List from './List/List';
import { TodosProvider } from 'providers';
import { toggleCompleted } from 'actions/actions';

type State = object;

class Main extends Component<State, object> {
  protected state = {};

  protected template = (): string => /*html*/ `
  <div class="main">
      <input class="toggle-all" id="toggle-all" type="checkbox"/>
      <label for="toggle-all">
          Mark all as complete
      </label>
  </div>
`;

  protected setComponents = ({ root }: SetComponentsProps<State>) => {
    List(root);
  };

  protected setActions = () => {
    return [
      {
        elementSelector: 'toggle-all',
        callback: this.handleToggleCompleted,
      },
    ];
  };

  handleToggleCompleted() {
    TodosProvider.setState(toggleCompleted());
  }
}

export default new Main().create();
