import React, { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react-lite';
import theme from '../../src/theme';
import { useProfileStore } from '../../store';

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props): JSX.Element {
  const { darkMode } = useProfileStore();

  if (theme.palette)
    theme.palette.type = darkMode ? 'dark' : 'light';

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default observer(ThemeProvider);
