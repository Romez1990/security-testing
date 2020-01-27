import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { ThemeState, ThemeAction } from './theme/action';
import theme from './theme/reducer';

export interface AppState {
  theme: ThemeState;
}

export type AppAction =
  | ThemeAction
  ;

const initStore = () => createStore(
  combineReducers({
    theme,
  }),
  applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppAction>),
);

export default initStore;
