import BuildApp from './lib/BuildApp';
import { store } from './store';
import App from './App';

const app = new BuildApp({
  component: App,
  props: {
    targetSelector: '[data-root="app"]',
    name: 'app',
  },
  store,
});

app.run();
