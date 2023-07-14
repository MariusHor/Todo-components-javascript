import { View, ViewFn } from '../View/View';
import { Props, State } from '../_types';

export type CreateView = {
  root: HTMLElement;
  props: Props;
  isUpdating?: boolean;
};

export type MountView = {
  root: HTMLElement;
  isUpdating?: boolean;
  state: {
    local: State;
    global: State;
  };
};

export class ViewController {
  constructor(private ViewBlueprint: ViewFn | null) {}

  private declare view: View;

  public createView({ root, props, isUpdating }: CreateView): View | undefined {
    if (!this.ViewBlueprint || isUpdating) return;
    if (!root) throw new Error('A valid root element is missing');

    this.view = new this.ViewBlueprint(props, root);
    return this.view;
  }

  public mountView({ root, state, isUpdating }: MountView): View | undefined {
    if (!this.view) return;
    if (!root) throw new Error('A valid root element is missing');

    this.view.mount({ root, state, isUpdating });
    return this.view;
  }

  public getViewNode(root: HTMLElement): HTMLElement {
    const viewNode = this.view?.getViewNode() ?? root;
    if (!viewNode) throw new Error('No current root node available');

    return viewNode;
  }
}
