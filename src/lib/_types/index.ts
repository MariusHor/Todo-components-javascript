export type BeforeMount<T, V> = ((controller: IController<T, V>) => void) | null;
export type SetActions<T, V> = (({ state, props }: setActionsProps<T, V>) => Action<T, V>[]) | null;
export type Template<T, V> = (({ state, props }: RenderProps<T, V>) => string) | null;
export type SetComponents<T> = (({ root }: SetComponentsProps<T>) => void) | null;
export type State<V> = { state: V };
export type Props<V> = { props: V };
export type RenderProps<T, V> = State<T> & Props<V>;
export type setActionsProps<T, V> = State<T> & Props<V>;
export type ProviderOptions<T> = { state: T };

export interface IView<T, V> {
  controller: IController<T, V> | null;
  handleComponents: (state: T) => void;
  handleActions: (options: setActionsProps<T, V>) => void;
  setControllerRef: (controller: IController<T, V>) => void;
  handleRender: (options: RenderProps<T, V>) => void;
}

export interface IModel<T, V> {
  getState: () => T;
  setState: (callback: (state: T) => T) => void;
  setControllerRef: (controller: IController<T, V>) => void;
}

export interface IController<T, V> {
  mount: (options: ControllerMount<T, V>) => void;
  setState: (params: ControllerSetState<T>) => void;
  getState: () => T;
  update: (payload?: V) => void;
}

export type ControllerSetState<T> = {
  callback: (state: T) => T;
  shouldSkipUpdate?: boolean;
};

export type ControllerMount<T, V> = {
  payload?: V;
  props?: V;
  shouldUpdate?: boolean;
  beforeMount?: BeforeMount<T, V>;
};

export type ComponentConfig<T, V> = {
  state: T;
  setActions: SetActions<T, V>;
  template: Template<T, V>;
  setComponents: SetComponents<T>;
  beforeMount: BeforeMount<T, V>;
};

export type Action<T, V> = {
  elementSelector: string;
  event?: string;
  callback: (event: Event, controller: IController<T, V> | null) => void;
};

export type SetComponentsProps<T> = {
  state: T;
  root: HTMLElement;
};

export type Detail<T> = {
  onConnect: (context: T) => unknown;
  onChange: (context: T) => unknown;
  id: string;
};
