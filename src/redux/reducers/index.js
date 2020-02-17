import {combineReducers} from "redux";
import {user} from "./user";
import {recipes} from "./recipes";
import { LOGOUT } from "../actions";

const appReducer = combineReducers({ user, recipes });

export default (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
}
