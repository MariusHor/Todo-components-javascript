export type Route = {
  path: string;
  title: string;
  description: string;
  action: (route: Route) => void;
};

type RouterOptions<T> = {
  routes: T[];
};

export class Router<T extends Route> {
  private declare routes: T[];

  constructor(options: RouterOptions<T>) {
    this.routes = options.routes;
  }

  public start() {
    window.addEventListener('hashchange', this.handleLocationChange.bind(this));
    this.handleLocationChange();
  }

  private handleLocationChange() {
    const location = this.getLocation();
    const route = this.getRoute(this.routes, location);
    this.setRouteMetadata(route);
    route.action(route);
  }

  private getLocation() {
    const location = window.location.hash.replace('#', '');
    return location.length === 0 ? '/' : location;
  }

  private setRouteMetadata(route: T) {
    document.title = route.title;
  }

  private getRoute(routes: T[], location: string) {
    return routes.find((route) => route.path === location) || this.getNotFoundRoute(routes);
  }

  private getNotFoundRoute(routes: T[]) {
    return routes.find((route) => route.title === '404') as T;
  }
}
