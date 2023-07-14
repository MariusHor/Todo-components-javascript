import { type GlobalState } from 'stores';
import { type State } from 'lib/_types';

export type Todo = {
  title: string;
  completed: boolean;
  id: number;
};

export type GeneralState = {
  local: State;
  global: GlobalState;
};
