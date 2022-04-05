enum navigationRoutes {
  BOTTOM_NAVIGATION = 'BottomNavigation',
  HOME = 'Home',
  LOGIN = 'Login',
  PRODUCT = 'Product',
  ACCOUNT = 'Account',
  TRANSACTION = 'Transaction',
  DETAIL = 'Detail',
  DRAWERCLOSE = 'DrawerClose',
  DRAWEROPEN = 'DrawerOpen',
}

const DEFAULT_LANGUAGE = 'vi';
const REQUEST_TIMEOUT = 15 * 1000;
const X_API_APP_CENTER = '4de27f198314b6b8ea20397104271ae661cd5c02';

const LINK_STORE_APP =
  'https://play.google.com/store/apps/details?id=com.apec.abond&hl=vi&gl=US';
const LINK_CENTER_APP =
  'https://api.appcenter.ms/v0.1/apps/tunglamdo996-gmail.com/code_push_demo/releases?published_only=true&scope=public';

const isObjectEmpty = (obj: Record<string, unknown> | undefined): boolean => {
  return obj === undefined || (Boolean(obj) && Object.keys(obj).length === 0);
};

const isNumeric = (text: string): boolean => {
  return !isNaN(+text);
};

export {
  navigationRoutes,
  DEFAULT_LANGUAGE,
  REQUEST_TIMEOUT,
  isObjectEmpty,
  isNumeric,
  LINK_STORE_APP,
  LINK_CENTER_APP,
  X_API_APP_CENTER,
};
