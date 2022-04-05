import {useMemo} from 'react';
import {useTranslation, Resources} from 'react-i18next';
import {i18nKey} from 'src/locales/i18n';

const useI18nState = <T>(
  data: T[],
  key: keyof T,
  namespace: keyof Resources,
): T[] => {
  const {t} = useTranslation(namespace);
  const i18nState = useMemo<T[]>(() => {
    return data.map((d) => {
      return {
        ...d,
        [key]: t(((d[key] as unknown) as string) as i18nKey),
      };
    });
  }, [data, key, t]);
  return i18nState;
};

export default useI18nState;
