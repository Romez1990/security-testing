import { IncomingMessage } from 'http';
import { Action, Dispatch } from 'redux';
import { getCookie, setCookie } from '../../src/cookies';
import { AppState } from '../store';

export interface ThemeState {
  darkTheme: boolean;
}

export type ThemeAction =
  | never
  ;

export {
};
