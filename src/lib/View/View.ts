import { el } from '../_utils/helpers';
import {
  AddToDOM,
  GetRefs,
  MountView,
  Props,
  RefSelectors,
  Refs,
  CreateRefs,
  GeneralState,
} from '../_types';

export interface ViewFn {
  new (props: Props, root: HTMLElement): View;
}

type UIprops = {
  root: HTMLElement;
  props: Props;
  state: GeneralState;
  selectors: RefSelectors;
};

export abstract class View {
  constructor(protected props: Props, protected root: HTMLElement) {}

  public declare refs: Refs;
  protected abstract render(config: unknown): string;
  protected declare refSelectors: RefSelectors;
  protected onMount(): void {}

  public mount({ root, state, isUpdating }: MountView) {
    isUpdating
      ? this.handleUpdateUI({ root, props: this.props, state, selectors: this.refSelectors })
      : this.handleRenderUI({ root, props: this.props, state, selectors: this.refSelectors });
  }

  private handleRenderUI({ root, props, state, selectors }: UIprops) {
    this.addToDOM({ root, props, state });
    this.setRefs({ root, selectors });
    this.onMount();
  }

  private handleUpdateUI({ root, props, state, selectors }: UIprops) {
    this.updateDOM({ root, props, state });
    this.setRefs({ root, selectors });
    this.onMount();
  }

  private setRefs({ root, selectors }: GetRefs) {
    Object.entries(selectors).map(([name, selector]) => {
      name === 'node'
        ? this.createNodeRef({ name, selector, root })
        : this.createRef({ name, selector, root });
    });
  }

  private createNodeRef({ name, selector, root }: CreateRefs) {
    this.refs = {};
    return (this.refs[name] = el({ selector: `data-view=${selector}`, root }) as HTMLElement);
  }

  private createRef({ name, selector, root }: CreateRefs) {
    return (this.refs[name] = el({ selector, root }) as HTMLElement);
  }

  private addToDOM({ root, props, state }: AddToDOM) {
    root.insertAdjacentHTML('beforeend', this.render({ props, state }));
  }

  private updateDOM({ root, props, state }: AddToDOM) {
    if (!this.getViewNode()) {
      return this.addToDOM({ root, props, state });
    }

    const newMarkup = this.render({ props, state });
    if (!newMarkup) return this.removeNode(root);

    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', newMarkup);
    fragment.appendChild(div);

    root.replaceChild(fragment.children[0].children[0], this.getViewNode());
  }

  private removeNode(root: HTMLElement) {
    root.removeChild(this.getViewNode());
  }

  public removeChildNode(node: HTMLElement) {
    this.getViewNode().removeChild(node);
  }

  public getViewNode(): HTMLElement {
    return this.refs.node;
  }
}
