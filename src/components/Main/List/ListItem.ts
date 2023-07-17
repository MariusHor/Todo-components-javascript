import { Component } from 'lib';
import { type RenderProps, type setActionsProps } from 'lib/_types';

import { deleteTodo, toggleTodo, startTodoEdit } from 'actions';
import { FormProvider, TodosProvider } from 'providers';
import { el } from 'utils';

type Props = {
  completed: boolean;
  id: number;
  title: string;
};

type State = object;

class ListItem extends Component<State, Props> {
  protected state = {};

  protected template = ({ props }: RenderProps<State, Props>): string => {
    return /*html*/ `
      <li
      class="${props?.completed ? 'completed' : ''} todo-item-${props.id}"
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
  };

  protected setActions = ({ props }: setActionsProps<State, Props>) => [
    {
      elementSelector: `data-el=${`deleteTodo` + props.id}`,
      callback: () => {
        TodosProvider.setState(deleteTodo(props.id));
        el('data-el="input"').focus();
      },
    },
    {
      elementSelector: `data-el=${`checkbox` + props.id}`,
      callback: () => TodosProvider.setState(toggleTodo(props.id)),
    },
    {
      elementSelector: `data-el=${`label` + props.id}`,
      event: 'dblclick',
      callback: () => {
        FormProvider.setState(startTodoEdit(props.id, props.title));
        el('data-el="input"').focus();
      },
    },
  ];
}

export default new ListItem().create();
