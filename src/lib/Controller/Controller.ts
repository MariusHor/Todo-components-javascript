import {
  type ControllerMount,
  type ControllerSetState,
  type IController,
  type IModel,
  type IView,
} from 'lib/_types';

export class Controller<T, V> implements IController<T, V> {
  constructor(protected view: IView<T, V>, protected model: IModel<T, V>) {}
  private declare props: V;

  public mount({ payload, props, beforeMount, shouldUpdate = false }: ControllerMount<T, V>): void {
    if (beforeMount) return beforeMount(this);
    if (!shouldUpdate) this.handleControllerRefs();
    if (props) this.props = props;
    const state = this.model.getState();

    this.view.handleRender({ state: { ...state, ...payload }, props: this.props });
    this.view.handleComponents({ ...state, ...payload });
    this.view.handleActions({ state: { ...state, ...payload }, props: this.props });
  }

  private handleControllerRefs() {
    this.view.setControllerRef(this);
    this.model.setControllerRef(this);
  }

  public setState({ callback, shouldSkipUpdate }: ControllerSetState<T>): void {
    this.model.setState(callback);
    if (!shouldSkipUpdate) this.update();
  }

  public getState() {
    return this.model.getState();
  }

  public update(payload?: V) {
    this.mount({ payload, shouldUpdate: true });
  }
}
