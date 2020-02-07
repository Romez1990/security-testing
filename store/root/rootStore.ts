import { createContext } from 'react';
import { configure } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';

configure({ enforceActions: 'always' });
if (!process.browser)
  useStaticRendering(true);

class RootStore {
  constructor() {
  }

  hydrate(store: RootStore): void {
  }
}

const StoreContext = createContext<RootStore | undefined>(undefined);

export default new RootStore();

export {
  RootStore as Store,
  StoreContext,
};
