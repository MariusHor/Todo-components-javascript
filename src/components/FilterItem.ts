import { Controller, View, ComponentFactory } from 'lib';
import { type Render } from 'lib/_types';

import { type GlobalState, GlobalStore } from 'stores';

/*
  Controller
*/

class FilterItemController extends Controller {
  protected ViewBlueprint = FilterItemView;
  protected GlobalStoreBlueprint = GlobalStore;

  protected components() {
    return [];
  }
}

/*
  View
*/

interface RenderProps {
  activeFilter: string;
  title: string;
  name: string;
  href: string;
}

class FilterItemView extends View {
  protected refSelectors = {
    node: `filter-${this.props.nodeId}`,
  };

  protected render({ props }: Render<RenderProps, GlobalState>) {
    return /*html*/ `
      <li class="filter" data-view=${this.refSelectors.node}>
        <a 
            href=${props.href}
            data-filter=${props.name}
            ${props.activeFilter === props.name ? 'class="selected"' : ''}
        >
            ${props.title}
        </a>
      </li>
    `;
  }
}

/*
  Local Store - optional: if used, it has to be assigned to the StoreBlueprint property of the Controller
*/

// class FilterItemStore extends Store {
//   protected state: State = {};
// }

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class FilterItem extends ComponentFactory {
  protected ComponentBlueprint = FilterItemController;
}

export default new FilterItem();
