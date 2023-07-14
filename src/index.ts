import { Todos } from 'components';
import { el } from 'utils';
import { App } from './App';

const root = el('data-root="app"') as HTMLElement;
App.init([Todos.create()], root);
