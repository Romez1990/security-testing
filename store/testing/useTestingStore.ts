import useStore from '../root/useStore';
import TestingStore from './testingStore';

function useTestingStore(): TestingStore {
  const store = useStore();
  return store.testingStore;
}

export default useTestingStore;
