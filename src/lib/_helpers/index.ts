export const el = (selector: string, root: HTMLElement | Document = document) => {
  if (selector.includes('data')) {
    return root.querySelector(`[${selector}]`) as HTMLElement;
  }

  return root.querySelector(`.${selector}`) as HTMLElement;
};

export const insertHTMLToFragment = (html: string) => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  div.insertAdjacentHTML('beforeend', html);

  return { fragment, div };
};

export function deepFreezeObject<T>(object: T): T {
  if (typeof object !== 'object' || object === null) return object;

  const newObject = Array.isArray(object)
    ? object.map((value) => deepFreezeObject(value))
    : Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, deepFreezeObject(value)]),
      );

  Object.freeze(newObject);

  return newObject as T;
}

export function emptyNode(root: HTMLElement) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

export const appendToFragment = (fragment: DocumentFragment, div: HTMLElement): HTMLElement => {
  return fragment.appendChild(div.children[0]) as HTMLElement;
};

export const getRefreshedNode = (root: HTMLElement): HTMLElement => {
  return el(root?.classList.value.trim());
};
