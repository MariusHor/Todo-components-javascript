import { Router } from 'lib';
import App from './App';
import { el } from 'utils';
import { routes } from 'routes';

const root = el('data-root="app"') as HTMLElement;
App(root);

const router = new Router({ routes });
router.start();
