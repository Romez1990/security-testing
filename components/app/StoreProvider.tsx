import React, { ReactNode } from 'react';
import store, { StoreContext } from '../../store';

interface Props {
  children: ReactNode;
}

function StoreProvider({ children }: Props): JSX.Element {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
