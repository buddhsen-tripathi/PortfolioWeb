import * as React from 'react';

function getStrictContext<T = any>(name?: string): [
  React.FC<{ value: T; children: React.ReactNode }>,
  () => T
] {
  const Context = React.createContext<T | undefined>(undefined);

  const Provider: React.FC<{ value: T; children: React.ReactNode }> = ({
    value,
    children,
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  const useSafeContext = (): T => {
    const ctx = React.useContext(Context);
    if (ctx === undefined) {
      throw new Error(`useContext must be used within ${name ?? 'a Provider'}`);
    }
    return ctx;
  };

  return [Provider, useSafeContext];
}

export { getStrictContext };
