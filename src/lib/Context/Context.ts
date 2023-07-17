import { deepFreezeObject } from 'lib/_helpers';
import { type ProviderOptions, type Detail } from 'lib/_types';

export class ContextProvider<T> {
  private state: T;
  private listeners: Detail<T>[] = [];

  constructor(protected options: ProviderOptions<T>) {
    this.state = options.state;
  }

  public getState() {
    return deepFreezeObject(this.state);
  }

  public setState(next: (state: T) => T) {
    this.state = next(this.state);
    this.listeners.forEach((listener) => listener.onChange(deepFreezeObject(this.state)));
  }

  registerListener(newListener: Detail<T>) {
    this.listeners = this.listeners.filter((listener) => listener.id !== newListener.id);
    this.listeners = [...this.listeners, newListener];

    newListener.onConnect(deepFreezeObject(this.state));
    return this;
  }
}
