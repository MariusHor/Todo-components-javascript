import { ContextProvider } from 'lib';
import { type Filter } from 'types';

export type FiltersContext = {
  activeFilter: Filter;
};

export const FiltersProvider = new ContextProvider<FiltersContext>({
  state: {
    activeFilter: 'all',
  },
});
