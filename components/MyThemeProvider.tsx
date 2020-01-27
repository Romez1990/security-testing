import React, { ReactNode } from 'react';
import theme, { useTheme } from '../src/theme';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

interface Props {
  children: ReactNode;
}

function MyThemeProvider({ children }: Props) {
  const { darkTheme } = useTheme();

  if (theme.palette)
    theme.palette.type = darkTheme ? 'dark' : 'light';

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      {children}
    </ThemeProvider>
  );
}

export default MyThemeProvider;
