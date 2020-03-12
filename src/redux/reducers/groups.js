import { CREATE_GROUP_REQUEST, CREATE_GROUP_RESPONSE, RESET_CREATE_GROUP_STATUS } from "../actions";

const initialState = {
    groups: [],
    waiting: false,
    response: null
};

export function groups(previousState = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case CREATE_GROUP_REQUEST:
            return {
                ...previousState,
                waiting: true
            };
        case CREATE_GROUP_RESPONSE:
            return {
                ...previousState,
                waiting: false,
                response: payload
            };
        case RESET_CREATE_GROUP_STATUS:
            return {
                ...previousState,
                waiting: false,
                response: null
            };
        default:
            return previousState;
    }
}
