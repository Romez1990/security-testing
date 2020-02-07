import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useProfileStore } from '../../store';

function ThemeChanger(): JSX.Element {
  const profileStore = useProfileStore();

  function changeTheme(): void {
    profileStore.saveDarkMode(!profileStore.darkMode);
  }

  return (
    <IconButton color="inherit" onClick={changeTheme}>
      {profileStore.darkMode
        ? <Brightness7Icon />
        : <Brightness4Icon />}
    </IconButton>);
}

export default ThemeChanger;
