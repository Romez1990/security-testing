import store, { Store, StoreContext } from './root/rootStore';
import useStore from './root/useStore';
import useProfileStore from './profile/useProfileStore';

export default store;

export {
  Store,
  StoreContext,
  useStore,
  useProfileStore,
};
