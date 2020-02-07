import useStore from '../root/useStore';
import ProfileStore from './profileStore';

function useProfileStore(): ProfileStore {
  const store = useStore();
  return store.profileStore;
}

export default useProfileStore;
