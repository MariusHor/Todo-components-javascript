import { Component } from 'lib';
import { type SetComponentsProps } from 'lib/_types';

import Filters from './Filters/Filters';
import TodosCounter from './TodosCounter/TodosCounter';
import ClearCompletedBtn from './ClearCompletedBtn/ClearCompletedBtn';

type State = object;

class Footer extends Component<State, object> {
  protected state = {} as State;

  protected template = (): string => {
    return /*html*/ `
      <footer class="footer">
      </footer>
    `;
  };

  protected setComponents = ({ root }: SetComponentsProps<State>) => {
    TodosCounter(root);
    Filters(root);
    ClearCompletedBtn(root);
  };
}

export default new Footer().create();
