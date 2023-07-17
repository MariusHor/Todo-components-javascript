import { SetActions, SetComponents, Template } from 'lib/_types';
import {
  appendToFragment,
  el,
  emptyNode,
  getRefreshedNode,
  insertHTMLToFragment,
} from 'lib/_helpers';
import {
  Action,
  type IController,
  type IView,
  type RenderProps,
  type setActionsProps,
} from 'lib/_types';

export class View<T, V> implements IView<T, V> {
  constructor(
    protected root: HTMLElement,
    protected template: Template<T, V>,
    protected setComponents: SetComponents<T>,
    protected setActions: SetActions<T, V>,
  ) {}

  public controller: IController<T, V> | null = null;
  private declare updatedNode: HTMLElement;

  public setControllerRef(controller: IController<T, V>) {
    this.controller = controller;
  }

  public handleComponents(state: T): void {
    this.setComponents && this.setComponents({ state, root: this.updatedNode || this.root });
  }

  public handleActions({ state, props }: setActionsProps<T, V>) {
    const actions = this.getActions({ state, props });
    this.InitActions(actions);
  }

  private getActions({ state, props }: setActionsProps<T, V>) {
    return this.setActions ? this.setActions({ state, props }) : [];
  }

  private InitActions(actions: Action<T, V>[]) {
    actions?.forEach((action) => {
      el(action.elementSelector).addEventListener(action?.event ?? 'click', (event) => {
        action.callback.call(this, event, this.controller);
      });
    });
  }

  public handleRender({ state, props }: RenderProps<T, V>) {
    const viewMarkup = this.getMarkup({ state, props });
    viewMarkup ? this.appendToDOM(viewMarkup) : emptyNode(this.root);
  }

  private getMarkup = ({ state, props }: RenderProps<T, V>): string | null => {
    return this.template && this.template({ props, state });
  };

  private appendToDOM(viewMarkup: string): void {
    const { fragment, div } = insertHTMLToFragment(viewMarkup);
    this.updatedNode = appendToFragment(fragment, div);
    const currentNode = getRefreshedNode(this.updatedNode);
    const root = getRefreshedNode(this.root);

    if (root) {
      currentNode
        ? root.replaceChild(this.updatedNode, currentNode)
        : root.appendChild(this.updatedNode);
    }
  }
}
