import { Controller, View, ComponentFactory } from 'lib';

import { GlobalStore } from 'stores';
import List from './List';

/*
  Controller
*/

class MainController extends Controller {
  protected ViewBlueprint = MainView;
  protected GlobalStoreBlueprint = GlobalStore;

  protected components() {
    return [List.create()];
  }
}

/*
  View 
*/

class MainView extends View {
  protected refSelectors = {
    node: `main-${this.props.nodeId}`,
  };

  protected render() {
    return /*html*/ `
      <div class="main" data-view=${this.refSelectors.node}>
        <input class="toggle-all" id="toggle-all" type="checkbox"/>
        <label for="toggle-all">
            Mark all as complete
        </label>
      </div>
    `;
  }
}

/*
  Local Store - optional: if used, it has to be assigned to the StoreBlueprint property of the Controller
*/

// class MainStore extends Store {
//   protected state: State = {};
// }

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class Main extends ComponentFactory {
  protected ComponentBlueprint = MainController;
}

export default new Main();
