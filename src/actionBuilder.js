/**
 * Private utility for building actions with given type and payload.
 *
 * Note: these are FSA (flux standard action)
 *     https://github.com/redux-utilities/flux-standard-action
 *
 * @param {string} type - action type
 * @return {function} action builder
 */
const buildAction = (type, payload) => ({type: type, payload: payload});

/**
 * Collection of action types and builders.
 */
export const actionBuilder = {
    GET_PROFILE: "GET_PROFILE",
    getProfile: (payload) => buildAction(actionBuilder.GET_PROFILE, payload),
};
