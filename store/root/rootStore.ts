import { createContext } from 'react';
import { configure } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';
import ProfileStore from '../profile/profileStore';

configure({ enforceActions: 'always' });
if (!process.browser)
  useStaticRendering(true);

class RootStore {
  profileStore: ProfileStore;

  constructor() {
    this.profileStore = new ProfileStore();
  }

  hydrate(store: RootStore): void {
    this.profileStore.hydrate(store.profileStore);
  }
}

const StoreContext = createContext<RootStore | undefined>(undefined);

export default new RootStore();

export {
  RootStore as Store,
  StoreContext,
};
