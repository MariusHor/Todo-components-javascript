export const el = (selector: string, root: HTMLElement | Document = document) => {
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
