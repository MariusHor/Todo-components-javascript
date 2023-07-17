import { Controller } from 'lib/Controller/Controller';
import { Model } from 'lib/Model/Model';
import { View } from 'lib/View/View';
import { BeforeMount, SetActions, SetComponents, Template } from 'lib/_types';

export abstract class Component<T, V> {
  protected beforeMount: BeforeMount<T, V> = null;
  protected setActions: SetActions<T, V> = null;
  protected template: Template<T, V> = null;
  protected setComponents: SetComponents<T> = null;
  protected abstract readonly state: T;

  public create() {
    return (root: HTMLElement, props?: V) => {
      const component = new Controller(
        new View(root, this.template, this.setComponents, this.setActions),
        new Model(this.state),
      );

      return component.mount({
        props,
        beforeMount: this.beforeMount,
      });
    };
  }
}
