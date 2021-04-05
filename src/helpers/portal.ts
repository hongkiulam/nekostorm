/**
 * Original code from [https://svelte.dev/repl/86ec36c27be2471f86590e0c18c7198c?version=3.23.2]
 */
let state: { [selector: string]: any } = {};

export function portal(node: HTMLElement, selector: string) {
  state[selector] = state[selector] || {};

  // Store this portals children
  state[selector].portalChildren = node.children;

  // Find where the portal should go
  state[selector].targetNode = document.querySelector(selector);

  // Backup the children of what the portal will replace
  state[selector].targetNodeChildren = state[selector].targetNode.children;

  // Replace the original contents of the targetNode with the portal
  state[selector].targetNode.innerHTML = '';
  state[selector].targetNode.append(...state[selector].portalChildren);

  // On destroy swap back original target
  return {
    destroy() {
      state[selector].portalChildren = state[selector].portalChildren.clone;
      state[selector].targetNode.innerHTML = '';
      state[selector].targetNode.append(...state[selector].targetNodeChildren);
    },
  };
}
