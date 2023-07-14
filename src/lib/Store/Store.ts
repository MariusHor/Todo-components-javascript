import { State } from '../_types';

export abstract class Store {
  protected abstract state: State;

  public getState(): State {
    return this.state;
  }

  public setState<GenericState extends State>(callback: (state: GenericState) => GenericState) {
    this.state = callback(this.state as GenericState);
  }
}
