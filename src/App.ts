import { Controller } from 'lib';

export class App {
  private constructor() {}

  public static init(components: Controller[], root: HTMLElement) {
    for (const component of components) component.mount(root);
  }
}
