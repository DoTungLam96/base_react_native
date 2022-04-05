import React, {createContext} from 'react';
import {useColorScheme} from 'react-native';
import * as Persist from 'src/utils/persist';
import {IThemeProps, ThemeName, ThemeType} from './IThemeProps';
import themes from './configs';

export interface IThemeProviderProps {
  theme?: IThemeProps;
  changeTheme?(themeName: ThemeName): void;
}

export const ThemeContext = createContext<IThemeProviderProps>({});

const Provider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [theme, setTheme] = React.useState<IThemeProps>(themes.default);
  const scheme = useColorScheme();
  const changeTheme = React.useCallback(
    (themeName: ThemeName) => {
      if (themeName === ThemeType.System) {
        setTheme({...themes.default, ...themes[scheme || ThemeType.Light]});
        Persist.setTheme((scheme as ThemeType) || ThemeType.Light);
      } else {
        setTheme({...themes.default, ...themes[themeName || ThemeType.Light]});
        Persist.setTheme(themeName || ThemeType.Light);
      }
    },
    [scheme],
  );

  React.useEffect(() => {
    Persist.getTheme().then((_theme) =>
      changeTheme(_theme || ThemeType.System),
    );
  }, [changeTheme]);
  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {Boolean(children) && children}
    </ThemeContext.Provider>
  );
};

export default Provider;
