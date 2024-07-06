export function createHooks(callback) {
  let state = [];
  let callbackFunc = callback;
  let currentIndex = 0;
  let memoCache = null;

  const useState = (initState) => {
    const index = currentIndex++;
    if (state[index] === undefined) {
      state[index] = initState;
    }

    const setState = (newState) => {
      if (newState !== state[index]) {
        state[index] = newState;
        currentIndex = 0;
        callbackFunc();
      }
    };

    return [state[index], setState];
  };

  const useMemo = (fn, deps) => {
    if (!memoCache) {
      memoCache = { value: fn(), deps };
    } else {
      const depsChanged = !deps || !memoCache.deps ||
        deps.length !== memoCache.deps.length ||
        deps.some((dep, i) => dep !== memoCache.deps[i]);

      if (depsChanged) {
        memoCache.value = fn();
        memoCache.deps = deps;
      }
    }
    return memoCache.value;
  };

  const resetContext = () => {
    currentIndex = 0;
  };

  return { useState, useMemo, resetContext };
}
