import {createLogger} from "redux-logger";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/index";

const loggerMiddleware = createLogger();

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));