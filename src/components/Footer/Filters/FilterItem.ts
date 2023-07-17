import { Component } from 'lib';
import { type RenderProps } from 'lib/_types';

import { type FiltersContext } from 'providers';

type State = FiltersContext;
type Props = {
  href: string;
  name: string;
  activeFilter: string;
  title: string;
};

class FilterItem extends Component<State, Props> {
  protected state = {} as State;

  protected template = ({ props }: RenderProps<State, Props>): string => {
    return /*html*/ `
        <li class="filter-${props.name}">
          <a 
              href=${props.href}
              data-filter=${props.name}
              ${props.activeFilter === props.name ? 'class="selected"' : ''}
          >
              ${props.title}
          </a>
        </li>
    `;
  };
}

export default new FilterItem().create();
