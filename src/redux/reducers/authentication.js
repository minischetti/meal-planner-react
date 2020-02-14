import * as firebase from "firebase/app";
import {REQUEST_PROFILE, LOGOUT, RECIEVE_PROFILE} from "../actions";

const initialState = {
    user: null,
    profile: null,
    waiting: false
}

export function authentication(previousState = initialState, action) {
    const {payload} = action;

    switch (action.type) {
        case LOGOUT:
            return firebase.auth().signOut()
                .then(() => {
                    return {...previousState, profile: null};
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
                waiting: false
            }
        default:
            return previousState;
    };
}