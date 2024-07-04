import { createHooks } from "./hooks";
import { render as updateElement } from "./render";

function MyReact() {
  let oldNode = null;
  let newNode = null;
  let rootElement = null;
  let rootComponent = null;

  const _render = () => {
    if (!rootElement || !rootComponent) return;
    resetHookContext();
    const newNode = rootComponent();
    updateElement(rootElement, newNode, oldNode);
    oldNode = newNode;
  };

  function render($root, component) {
    oldNode = null;
    rootElement = $root;
    rootComponent = component;
    //resetHookContext();
    _render();
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();