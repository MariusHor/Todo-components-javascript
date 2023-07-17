import { Component } from 'lib';
import { setActionsProps, type RenderProps } from 'lib/_types';

type State = object;
type Props = { title: string; class: string; id: string; callback: () => void };

class Button extends Component<State, Props> {
  protected state = {};

  protected template = ({ props }: RenderProps<State, Props>): string => /*html*/ `
  <button class=${props.class}>
    ${props.title}
  </button>
`;

  protected setActions = ({ props }: setActionsProps<State, Props>) => {
    return [
      {
        elementSelector: props.class,
        callback: props.callback,
      },
    ];
  };
}

export default new Button().create();
