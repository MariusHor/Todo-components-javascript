import { Component } from 'lib';
import { type IController, type SetComponentsProps } from 'lib/_types';

import { type FiltersContext, FiltersProvider } from 'providers';
import { FILTERS } from 'utils/constants';
// import { updateFilter } from 'actions';
import FilterItem from './FilterItem';

type State = FiltersContext;

class Filters extends Component<State, object> {
  protected state = {} as State;

  protected template = (): string => {
    return /*html*/ `
          <ul class="filters" data-el="filters">
          </ul>
    `;
  };

  protected setComponents = ({ state, root }: SetComponentsProps<State>) => {
    return [
      ...FILTERS.map((filter) => FilterItem(root, { ...filter, activeFilter: state.activeFilter })),
    ];
  };

  // private handleFilterToggle = (event: Event) => {
  //   const filterEl = (event.target as HTMLElement).closest('a');
  //   if (!filterEl) return;
  //   const { filter } = filterEl.dataset;
  //   if (!filter) return;

  //   FiltersProvider.setState(updateFilter(filter));
  // };

  // protected setActions = () => [
  //   {
  //     elementSelector: 'data-el="filters"',
  //     callback: (event: Event) => this.handleFilterToggle(event),
  //   },
  // ];

  protected beforeMount = (controller: IController<State, object>) => {
    FiltersProvider.registerListener({
      onConnect: controller.update.bind(controller),
      onChange: controller.update.bind(controller),
      id: 'filters',
    });
  };
}

export default new Filters().create();
