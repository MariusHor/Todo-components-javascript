import { deepFreezeObject } from 'lib/_helpers';
import { type IController, type IModel } from 'lib/_types';

export class Model<T, V> implements IModel<T, V> {
  constructor(private state: T) {}
  private declare controller: IController<T, V>;

  public getState(): T {
    return deepFreezeObject(this.state);
  }

  public setState(callback: (state: T) => T): void {
    this.state = callback(this.state);
  }

  public setControllerRef(controller: IController<T, V>) {
    this.controller = controller;
  }
}
