import { createContext, useContext, useEffect, useState, useMemo, useRef } from "react";
import { deepEquals } from '../basic/basic';

const cache = {};
export const memo1 = (fn) => {
  const key = fn.toString();
  if (!cache[key]) {
    cache[key] = fn(fn);
  }
  return cache[key];
}

const cacheTwo = {};
export const memo2 = (fn, initialArgs) => {
  const key = initialArgs.toString();

  if (!cacheTwo.hasOwnProperty(key)) {
    cacheTwo[key] = fn(fn);
  }
  return cacheTwo[key];

}


export const useCustomState = (initValue) => {
  const [state, setState] = useState(initValue);

  const updateState = (newValue) => {
    if (deepEquals(newValue, state)) return;
    setState(newValue);
  };

  return [state, updateState];
}

const textContextDefaultValue = {
  user: null,
  todoItems: [],
  count: 0,
};

export const TestContext = createContext({
  value: textContextDefaultValue,
  setValue: () => null,
});

export const TestContextProvider = ({ children }) => {
  const value = useRef(textContextDefaultValue);
  const setValue = ({ key, newValue }) => {
    if (deepEquals(value.current[key], newValue)) return;
    value.current[key] = newValue;
  };
  // const [value, setValue] = useState(textContextDefaultValue);

  return (
    <TestContext.Provider value={{ value: value.current, setValue: setValue }}>
      {children}
    </TestContext.Provider>
  )
}

const useTestContext = () => {
  return useContext(TestContext);
}

export const useUser = () => {
  const { value, setValue } = useTestContext();
  const [state, setState] = useState(value.user);
  useEffect(() => {
    setValue('user', state);
  }, [state]);

  return [
    state,
    setState
  ];
}

export const useCounter = () => {
  const { value, setValue } = useTestContext();
  const [state, setState] = useState(value.count);
  useEffect(() => {
    setValue('count', state);
  }, [state]);

  return [
    state,
    setState
  ];
}

export const useTodoItems = () => {
  const { value, setValue } = useTestContext();
  const [state, setState] = useState(value.todoItems);
  console.log(value.todoItems);
  useEffect(() => {
    setValue('todoItems', state);
  }, [state]);

  return [
    state,
    setState
  ];
}
