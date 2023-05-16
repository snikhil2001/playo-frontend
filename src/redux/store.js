import {
  legacy_createStore as createStore,
  applyMiddleware,
  // compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";
import authReducer from "./auth/reducer";
import { eventReducer } from "./events/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, applyMiddleware(thunk));
