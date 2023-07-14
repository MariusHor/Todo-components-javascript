type GetEl = {
  selector: string;
  root: HTMLElement | Document;
};

export const el = ({ selector, root = document }: GetEl) => {
  if (selector.includes('data')) {
    return root.querySelector(`[${selector}]`);
  }

  return root.querySelector(`.${selector}`);
};

export const emptyNode = (node: HTMLElement) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export const getObjMethodsStartingWith = (identifier: string, object: object) => {
  const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(object));

  return methodNames.reduce((methods: (() => void)[] = [], methodName: string) => {
    if (methodName.toLowerCase().startsWith(identifier)) {
      const method = object[methodName as keyof object] as () => void;
      return [...methods, method];
    }
    return methods;
  }, []);
};
