import BuildApp from './src/lib/BuildApp';
import { store } from './src/store';
import App from './src/App';

const app = new BuildApp({
  component: App,
  props: {
    targetSelector: '[data-root="app"]',
    name: 'app',
  },
  store,
});

app.run();
