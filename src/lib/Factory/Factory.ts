import { Controller } from '../Controller/Controller';
import { Props } from '../_types';

type ComponentBlueprintType = new (props: Props, shouldRender?: boolean | undefined) => Controller;

export abstract class ComponentFactory {
  protected abstract ComponentBlueprint: ComponentBlueprintType;
  protected declare instances: Controller[];

  protected getId(): string {
    return crypto.randomUUID().replaceAll('-', '').slice(0, 8);
  }

  public update(): void {
    if (this.instances[0]?.view?.refs?.node) {
      this.instances = this.instances.filter((instance) =>
        document.contains(instance.view?.refs.node as Node),
      );
    }

    this.instances.map((instance) => instance.update());
  }

  public create(props?: Props, shouldRender?: boolean): Controller {
    const newInstance = new this.ComponentBlueprint(
      { ...props, nodeId: this.getId() },
      shouldRender,
    );

    this.instances = [];
    this.instances = [...this.instances, newInstance];

    return newInstance;
  }
}
