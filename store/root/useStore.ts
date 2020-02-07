import { useContext } from 'react';
import { Store, StoreContext } from './rootStore';
import StoreError from './storeError';

function useStore(): Store {
  const store = useContext(StoreContext);
  if (typeof store === 'undefined')
    throw new StoreError('store is not defined');
  return store;
}

export default useStore;
