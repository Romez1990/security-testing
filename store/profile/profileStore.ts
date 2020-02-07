import { IncomingMessage } from 'http';
import { action, observable } from 'mobx';
import { getCookie, setCookie } from '../../src/coookies';

class ProfileStore {
  @observable darkMode = false;

  @action
  setDarkMode(darkMode: boolean): void {
    this.darkMode = darkMode;
  }

  readDarkMode(req?: IncomingMessage): void {
    const darkMode = getCookie('darkMode', req) === 'true';
    this.setDarkMode(darkMode);
  }

  saveDarkMode(darkMode: boolean): void {
    this.setDarkMode(darkMode);
    setCookie('darkMode', darkMode.toString());
  }

  hydrate(profileStore: ProfileStore): void {
    this.setDarkMode(profileStore.darkMode);
  }
}

export default ProfileStore;
