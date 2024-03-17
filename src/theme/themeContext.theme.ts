import { createContext } from 'react';
import type { Theme } from '~src/models/theme.model';

export const ThemeContext = createContext<Theme>({
  theme: 'dark',
  isDarkTheme: true,
  toggleTheme: () => {},
});
