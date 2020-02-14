import * as firebase from "firebase/app";

export const REQUEST_PROFILE = "REQUEST_PROFILE";
export const requestProfile = payload => {
    return {
        type: REQUEST_PROFILE,
    }
}

export const RECIEVE_PROFILE = "RECIEVE_PROFILE";
export const recieveProfile = payload => {
    return {
        type: RECIEVE_PROFILE,
        payload
    }
}

export const LOGOUT = "LOGOUT";
export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const requestClient = {};
const apiBaseUrl = "http://localhost:8000/api/";

// fetchProfile = payload => {
//     const profileId = payload.profileId;
//     return fetch(apiBaseUrl + "people/" + profileId)
//         .then(json)
//         .then(data => {
//             return data;
//         });
// }

export const LOGIN = "LOGIN";
export function login(payload) {
    return function(dispatch) {
        dispatch(requestProfile())
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
            const profileId = data.user.uid;

            return fetch(apiBaseUrl + "people/" + profileId)
                .then(response => response.json())
                .then(data => {
                    dispatch(recieveProfile(data));
                });
        });
    }
}

// export const RECIEVE_ACCOUNT = "RECIEVE_ACCOUNT";
// export function recieveAccount(payload) {
//     return {
//         type: RECIEVE_ACCOUNT,
//         payload
//     }
// }

export function fetchProfile(payload) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        // Dispatch the request profile
        dispatch(requestProfile(payload))
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.
        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        const profileId = payload.profileId;

        return fetch(apiBaseUrl + "people/" + profileId)
            .then(response => response.json())
            .then(data => {
                dispatch(recieveProfile(data));
            });
    }
}