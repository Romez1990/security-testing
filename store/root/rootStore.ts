import { createContext } from 'react';
import { configure } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';
import ProfileStore from '../profile/profileStore';
import TestingStore from '../testing/testingStore';

configure({ enforceActions: 'always' });
if (!process.browser)
  useStaticRendering(true);

class RootStore {
  profileStore: ProfileStore;

  testingStore: TestingStore;

  constructor() {
    this.profileStore = new ProfileStore();
    this.testingStore = new TestingStore();
  }

  hydrate(store: RootStore): void {
    this.profileStore.hydrate(store.profileStore);
    this.testingStore.hydrate(store.testingStore);
  }
}

const StoreContext = createContext<RootStore | undefined>(undefined);

export default new RootStore();

export {
  RootStore as Store,
  StoreContext,
};
