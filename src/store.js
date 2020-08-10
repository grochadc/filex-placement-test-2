import {createStore} from 'redux';
import {generateCode} from './lib';

const initialValues = { info: '', route: 'personal', code: generateCode(1), level: 1 }

const myReducer = (state, action) => {
  switch (action.type) {
    case "route":
      return { ...state, route:action.payload};
    case "info":
      return { ...state, info: action.payload }
    case "ADVANCE_LEVEL":
      return { ...state, level: state.level + 1}
    default:
      return state
  }
}

let store = createStore(myReducer, initialValues, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const unsubscribe = store.subscribe(() => console.log(store.getState()));

export default store;
