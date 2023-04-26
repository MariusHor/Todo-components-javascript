export default class BuildApp {
  constructor({ component, props, model }) {
    this.app = component;
    this.props = props;
    this.model = model;

    model.on('build', this.#build);
    model.on('update', (nextState) => this.updateApp({ nextState }));
  }

  #build = (initialState) => {
    this.updateApp = this.app({ initialState, props: this.props });
  };

  run = () => {
    this.model.dispatchUpdate('build');
  };
}
