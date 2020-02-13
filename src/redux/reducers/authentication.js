import * as firebase from "firebase/app";
import {requestClient} from "../../requestClient";
import {fetchProfile, REQUEST_PROFILE, LOGOUT} from "../actions";

const initialState = {
    user: null,
    profile: null,
    waiting: false
}

export function authentication(previousState = initialState, action) {
    const {type: actionType, payload} = action;

    switch (actionType) {
        case LOGOUT:
            firebase.auth().signOut()
                .then(() => {
                    return {...previousState, profile: null};
                });

            return previousState;
        case REQUEST_PROFILE:
            return {
                ...previousState,
                profile: payload
            }
        default:
            return previousState;
    };
}