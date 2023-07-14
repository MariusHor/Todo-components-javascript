import { ControllerSetState, IStore, State } from '../_types';

export class StoresController {
  constructor(
    private LocalStoreBlueprint: { new (): IStore },
    private GlobalStoreBlueprint: { getInstance(): IStore },
  ) {}

  private declare localStore: IStore;
  private declare globalStore: IStore;

  public createLocalStore(): IStore | undefined {
    if (!this.LocalStoreBlueprint || this.localStore) return;

    this.localStore = new this.LocalStoreBlueprint();
    return this.localStore;
  }

  public createGlobalStore(): IStore | undefined {
    if (!this.GlobalStoreBlueprint || this.globalStore) return;
    if (Object.prototype.hasOwnProperty.call(this.GlobalStoreBlueprint, 'getInstance')) {
      this.globalStore = this.GlobalStoreBlueprint.getInstance();
    }

    return this.globalStore;
  }

  public getGeneralState() {
    const localState = this.getLocalState();
    const globalState = this.getGlobalState();

    return { local: localState, global: globalState };
  }

  public setState<GenericState extends State>({
    callback,
  }: ControllerSetState<GenericState>): void {
    if (!this.localStore && !this.globalStore) throw new Error('Cannot set state without a store');
    this.localStore && this.localStore.setState<GenericState>(callback);
    this.globalStore && this.globalStore.setState<GenericState>(callback);
  }

  private getLocalState(): State {
    return this.localStore?.getState() ?? {};
  }

  private getGlobalState(): State {
    return this.globalStore?.getState() ?? {};
  }
}
