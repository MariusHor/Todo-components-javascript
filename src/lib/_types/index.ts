export type Index = {
  [key: string]: unknown;
};

export type Props = Index;

export type State = Record<string, unknown>;

export type RefSelectors = {
  [key: string]: string;
};

export type Refs = {
  [key: string]: HTMLElement;
};

export type GetRefs = {
  selectors: RefSelectors;
  root: HTMLElement;
};

export type CreateRefs = {
  name: string;
  selector: string;
  root: HTMLElement;
};

export type AddToDOM = {
  root: HTMLElement;
  state: State;
  props: Props;
};

export type MountView = {
  root: HTMLElement;
  state: GeneralState;
  isUpdating?: boolean;
};

export type Render<GenericProps, GenericState> = {
  props: GenericProps;
  state: GenericState;
};

export type Payload = Index;

export type Callback = (payload?: Payload) => void;

export type Subscribers = {
  [key: string]: Callback[];
};

export interface IStore {
  getState(): State;
  setState<GenericState extends State>(callback: (state: GenericState) => GenericState): void;
}

export type ControllerSetState<GenericState> = {
  callback: (state: GenericState) => GenericState;
  skipUpdate?: boolean;
};

export type GeneralState = {
  local: State;
  global: State;
};
