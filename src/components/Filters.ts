import { Controller, View, ComponentFactory } from 'lib';

import { type GeneralState } from 'types';
import { FILTERS } from 'utils/constants';
import { GlobalStore } from 'stores';
import { updateFilter } from 'actions';
import FilterItem from './FilterItem';

/*
  Controller
*/

class FiltersController extends Controller {
  declare view: FiltersView;
  protected ViewBlueprint = FiltersView;
  protected GlobalStoreBlueprint = GlobalStore;

  protected components(state: GeneralState) {
    return [
      ...FILTERS.map((filter) =>
        FilterItem.create({ ...filter, activeFilter: state.global.activeFilter }),
      ),
    ];
  }

  delegateFilterToggle() {
    this.view.handleFilterToggle((activeFilter: string) => {
      this.setState({
        callback: updateFilter(activeFilter),
      });
    });
  }
}

/*
  View
*/

class FiltersView extends View {
  protected refSelectors = {
    node: `filters-${this.props.nodeId}`,
  };

  handleFilterToggle(callback: (activeFilter: string) => void) {
    this.refs.node.addEventListener('click', (event) => {
      const filterEl = (event.target as HTMLElement).closest('a');
      if (!filterEl) return;
      const { filter } = filterEl.dataset;
      if (!filter) return;

      callback(filter);
    });
  }

  protected render() {
    return /*html*/ `
      <ul class="filters" data-view=${this.refSelectors.node}>
      </ul>
    `;
  }
}

/*
  Local Store - optional: if used, it has to be assigned to the StoreBlueprint property of the Controller
*/

// class FiltersStore extends Store {
//   protected state: LocalState = {
//     activeFilter: 'all',
//   };
// }

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class Filters extends ComponentFactory {
  protected ComponentBlueprint = FiltersController;
}

export default new Filters();
