import * as firebase from "firebase/app";
import {REQUEST_PROFILE, LOGOUT, RECIEVE_PROFILE, GET_PROFILE} from "../actions";

const initialState = {
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
        case GET_PROFILE:
            return {
                ...previousState,
            }
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
                isAuthenticated: true
            }
        default:
            return previousState;
    };
}