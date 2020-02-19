import * as firebase from "firebase/app";
import {REQUEST_PROFILE, LOGOUT, RECIEVE_PROFILE, REQUEST_ACCOUNT, RECIEVE_ACCOUNT} from "../actions";

const initialState = {
    id: null,
    isAuthenticated: false,
    profile: null,
    waiting: false
}

export function user(previousState = initialState, action) {
    const {payload} = action;

    switch (action.type) {
        case LOGOUT:
            return firebase.auth().signOut()
                .then(() => {
                    return {
                        ...previousState,
                        profile: null,
                        isAuthenticated: false
                    };
                });
        case REQUEST_PROFILE:
            return {
                ...previousState,
                waiting: true
            }
        case RECIEVE_PROFILE:
            return {
                ...previousState,
                profile: payload,
                waiting: false,
            }
        case REQUEST_ACCOUNT:
            return {
                ...previousState,
                waiting: true
            }
        case RECIEVE_ACCOUNT:
            return {
                ...previousState,
                id: payload,
                isAuthenticated: true,
                waiting: false
            }
        default:
            return previousState;
    };
}