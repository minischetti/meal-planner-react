import {requestClient} from "./requestClient";
import {actionBuilder} from "./actionBuilder";

// const RESPONSE_TYPE = {
//     GET_PROFILE: "GET_PROFILE"
// }

// export function ResponseType(responseType) {
//     switch (responseType) {
//         case RESPONSE_TYPE.GET_PROFILE:
//             client.getProfile()
//     }
// }

/**
 * Handles checkout related actions which requires communication to external services.
 *
 * @param  {object} state - previous application state
 * @param  {object} action - request for state change
 * @return {object} next state if action found, falsy otherwise
 */
export const actionHandler = (state, action) => {
    console.log("actionHandler/action", action);
    switch (action.type) {
        case actionBuilder.GET_PROFILE:
            state.waiting = true;
            requestClient.getProfile(action.payload)
                .then(data => state.profile = data)
                .catch(error => console.log(error));
            return state;

        default:
            return false;
    }
}