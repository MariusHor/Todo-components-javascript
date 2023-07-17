import { updateFilter } from 'actions';
import { FiltersProvider } from 'providers';
import { type ExtendedRoute, type Filter } from 'types';

export const routes = [
  {
    path: '/',
    title: 'All todos',
    description: 'All todos',
    filter: 'all',
    action: (route: ExtendedRoute) =>
      FiltersProvider.setState(updateFilter(route.filter as Filter)),
  },
  {
    path: '/active',
    title: 'Active todos',
    description: 'Active todos',
    filter: 'active',
    action: (route: ExtendedRoute) =>
      FiltersProvider.setState(updateFilter(route.filter as Filter)),
  },
  {
    path: '/completed',
    title: 'Completed todos',
    description: 'Completed todos',
    filter: 'completed',
    action: (route: ExtendedRoute) =>
      FiltersProvider.setState(updateFilter(route.filter as Filter)),
  },
  {
    path: '/*',
    title: '404',
    description: 'Page not found',
    action: () => {
      console.log('Not Found');
    },
  },
];
