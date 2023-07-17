import { Route } from 'lib/Router/Router';

export type Todo = {
  title: string;
  completed: boolean;
  id: number;
};

export type Filter = 'all' | 'active' | 'completed';

export type ExtendedRoute = Route & {
  filter?: Filter;
};
