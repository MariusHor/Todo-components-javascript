import { View, ViewFn } from '../View/View';
import { getObjMethodsStartingWith } from '../_utils/helpers';
import { Props, State, IStore, ControllerSetState } from '../_types';
import { StoresController } from './StoresController';
import { ViewController, CreateView } from './ViewController';

export abstract class Controller {
  constructor(protected props: Props = {}, protected shouldRender: boolean = true) {}

  public declare view: View | undefined;
  protected onMount(): void {}
  protected abstract components(state: State): (Controller | null)[];
  protected declare GlobalStoreBlueprint: { getInstance(): IStore };
  protected declare LocalStoreBlueprint: { new (): IStore };
  protected declare ViewBlueprint: ViewFn;
  private declare root: HTMLElement;
  private declare viewController: ViewController;
  private declare storeController: StoresController;
  private declare actions: (() => void)[];
  private declare localStore: IStore | undefined;
  private declare globalStore: IStore | undefined;

  public mount(root: HTMLElement, isUpdating?: boolean): void {
    if (!this.shouldRender) return;

    this.setRoot(root);
    this.initControllers();
    this.handleStores();
    this.handleView({ root, isUpdating, props: this.props });
    this.handleActions();
    this.handleComponents(root);
    this.onMount();
  }

  private setRoot(root: HTMLElement): void {
    if (!root) throw new Error('A valid root element is missing');
    this.root = root;
  }

  private initControllers() {
    this.viewController = !this.viewController
      ? new ViewController(this.ViewBlueprint)
      : this.viewController;

    this.storeController = !this.storeController
      ? new StoresController(this.LocalStoreBlueprint, this.GlobalStoreBlueprint)
      : this.storeController;
  }

  private handleStores() {
    this.localStore = this.storeController.createLocalStore();
    this.globalStore = this.storeController.createGlobalStore();
  }

  private handleView({ root, props, isUpdating }: CreateView) {
    const state = this.storeController.getGeneralState();
    this.view = this.viewController.createView({ root, isUpdating, props });
    this.view = this.viewController.mountView({ root, isUpdating, state });
  }

  private handleActions() {
    this.actions = getObjMethodsStartingWith('delegate', this);
    this.actions?.forEach((action) => action.call(this));
  }

  private handleComponents(root: HTMLElement) {
    const viewNode = this.viewController.getViewNode(root);
    const state = this.storeController.getGeneralState();
    const components = this.components(state);
    components.forEach((component) => (component ? component.mount(viewNode) : null));
  }

  protected setState<GenericState extends State>({
    callback,
    skipUpdate,
  }: ControllerSetState<GenericState>): void {
    this.storeController.setState({ callback });
    if (!skipUpdate) this.update();
  }

  public update(): void {
    if (!this.root) throw new Error('Cannot update without a valid root node');
    this.mount(this.root, true);
  }
}
