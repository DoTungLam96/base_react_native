/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/stackNavigation';

type ResetState =
  | PartialState<NavigationState>
  | NavigationState
  | (Omit<NavigationState, 'routes'> & {
      routes: Omit<Route<string>, 'key'>[];
    });

interface IConfig {
  navigator?: NavigationContainerRef<any>;
}
const config: IConfig = {};

export function setNavigator(nav: NavigationContainerRef<any>): void {
  config.navigator = nav;
}

function navigate(
  name: keyof RootStackParamList,
  params: RootStackParamList[typeof name],
): void {
  if (config.navigator && name) {
    const action = CommonActions.navigate({name, params});

    config.navigator.dispatch(action);
  }
}

function goBack(): void {
  if (config.navigator) {
    const action = CommonActions.goBack();
    config.navigator.dispatch(action);
  }
}

function reset(state: string | ResetState): void {
  if (typeof state === 'string') {
    state = {routes: [{name: state}]};
  }
  if (config.navigator) {
    const action = CommonActions.reset(state);
    config.navigator.dispatch(action);
  }
}

function toggleDrawer(): void {
  config.navigator?.dispatch(DrawerActions.toggleDrawer());
}

function canGoBack(): boolean {
  return config.navigator?.canGoBack() || false;
}

function getCurrentRouteName(): string {
  return config.navigator?.getCurrentRoute()?.name || '';
}

const navigationService = {
  navigate,
  goBack,
  reset,
  toggleDrawer,
  canGoBack,
  getCurrentRouteName,
};

export default navigationService;
