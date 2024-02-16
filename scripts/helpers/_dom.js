const nodeListPrototype = {
  execute(fn) {
    if (this instanceof Element || this instanceof HTMLDocument) {
      fn(this);
    } else {
      this.forEach((node, index) => {
        fn(node, index);
      });
    }
  },
  listen(eventName, callback) {
    const callbackWithNode = ($node, index) => (e) =>
      callback({ $node, index, e });

    this.execute((node, index) => {
      const extendedNode = Object.assign(node, nodeListPrototype);
      extendedNode.addEventListener(eventName, (e) =>
        callbackWithNode(extendedNode, index)(e)
      );
    });
  },
  modifyClass(method, className) {
    this.execute((node) => node.classList[method](className));
  },
  setAttributes(attr, value) {
    this.execute((node) => node.setAttribute(attr, value));
  },
};

export function select(selector, parent = document) {
  const improperSelectorPassed =
    typeof selector === 'string' && selector.indexOf('[') !== 0;
  const object =
    typeof selector === 'string' ? parent.querySelectorAll(selector) : selector;
  const mappedObject = [...object].map((item) =>
    Object.assign(item, nodeListPrototype)
  );
  const selectObject =
    mappedObject && mappedObject.length === 1 ? mappedObject[0] : mappedObject;
  const extendedObject = Object.assign(selectObject, nodeListPrototype);

  if (improperSelectorPassed) {
    console.warn(
      'Improper selector value passed. Please use data attribute as selector.'
    );
  }
  return extendedObject;
}
