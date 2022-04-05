import {ThemeContext, IThemeProviderProps} from './ThemeProvider';
import {useContext} from 'react';

export default function useTheme(): IThemeProviderProps {
  return useContext<IThemeProviderProps>(ThemeContext);
}
