export function createHooks(callback) {
  let states = [];
  let currentIndex = 0;
  let pendingState = null;
  let isUpdateScheduled = false;

  const useState = (initState) => {
    const index = currentIndex++;
    if (states[index] === undefined) {
      states[index] = initState;
    }

    const setState = (newState) => {
      pendingState = { index, newState };
      if (!isUpdateScheduled) {
        isUpdateScheduled = true;
        Promise.resolve().then(() => {
          if (pendingState) {
            states[pendingState.index] = pendingState.newState;
            pendingState = null;
            isUpdateScheduled = false;
            callback();
          }
        });
      }
    };

    return [states[index], setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    currentIndex = 0;
  };
  return { useState, useMemo, resetContext };
}
