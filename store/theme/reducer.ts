import {
  ThemeState,
  ThemeAction,
} from './action';

const initialState = {
  darkTheme: false,
};

function reducer(state: ThemeState = initialState, action: ThemeAction) {
  switch (action.type) {
    case 'SET_DARK_THEME':
      return {
        ...state,
        darkTheme: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
