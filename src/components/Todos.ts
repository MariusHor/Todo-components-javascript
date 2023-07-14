import { Controller, View, ComponentFactory } from 'lib';

import { GlobalStore } from 'stores';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

/*
    Controller
  */

class TodosController extends Controller {
  protected ViewBlueprint = TodosView;
  protected GlobalStoreBlueprint = GlobalStore;

  protected components() {
    return [Header.create(), Main.create(), Footer.create()];
  }
}

/*
  View
*/

class TodosView extends View {
  protected refSelectors = {
    node: `todos-${this.props.nodeId}`,
  };

  protected render() {
    return /*html*/ `
      <div class="todos" data-view=${this.refSelectors.node}>
      </div>
    `;
  }
}

/*
  Local Store - optional: if used, it has to be assigned to the StoreBlueprint property of the Controller
*/

// class TodosStore extends Store {
//   protected state: State = {};
// }

/*
  Component Factory subclass which delivers a new instance of this component on each call of its create method
*/

class Todos extends ComponentFactory {
  protected ComponentBlueprint = TodosController;
}

export default new Todos();
