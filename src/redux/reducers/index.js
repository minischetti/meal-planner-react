import {combineReducers} from "redux";
import {authentication} from "./authentication";
import {recipes} from "./recipes";

export default combineReducers({ authentication, recipes });