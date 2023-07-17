export const el = (selector: string, root: HTMLElement | Document = document) => {
  if (selector.includes('data')) {
    return root.querySelector(`[${selector}]`) as HTMLElement;
  }

  return root.querySelector(`.${selector}`) as HTMLElement;
};
