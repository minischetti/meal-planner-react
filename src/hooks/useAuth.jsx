import { useEffect } from "react";
import { firebaseAuth } from "../configuration";
import { useReducer } from "react";

const initialAuthState = {
    authInProgress: true,
    authError: null,
    user: null
};

const AUTH_ACTION = {
    SIGN_IN_REQUEST: "SIGN_IN_REQUEST",
    SIGN_IN_RESPONSE: "SIGN_IN_RESPONSE",
    SIGN_OUT_REQUEST: "SIGN_OUT_REQUEST",
    SIGN_OUT_RESPONSE: "SIGN_OUT_RESPONSE"
};

const authReducer = (previousState, action) => {
    const { authError, user } = action.value;

    switch (action.type) {
        case AUTH_ACTION.SIGN_IN_REQUEST:
            return {
                ...previousState,
                authInProgress: true,
                authError
            };
        case AUTH_ACTION.SIGN_IN_RESPONSE:
            return {
                ...previousState,
                user,
                authInProgress: false,
                authError
            };
        case AUTH_ACTION.SIGN_OUT_REQUEST:
            return {
                ...previousState,
                authInProgress: true,
                authError
            };
        case AUTH_ACTION.SIGN_OUT_RESPONSE:
            return {
                ...initialAuthState,
                authError
            };
        case AUTH_ACTION.UPDATE_AUTH_STATUS:
            return {
                ...previousState,
                authInProgress: false,
                user
            };
        default:
            return previousState;
    }
};

export const useAuth = () => {
    const [authState, dispatchAuthAction] = useReducer(
        authReducer,
        initialAuthState
    );

    const signIn = (email, password) => {
        dispatchAuthAction({
            type: AUTH_ACTION.SIGN_IN_REQUEST,
            value: { user: null, authError: null }
        });
        firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(response =>
                dispatchAuthAction({
                    type: AUTH_ACTION.SIGN_IN_RESPONSE,
                    value: {
                        user: response.user,
                        authError: null
                    }
                })
            )
            .catch(error => {
                dispatchAuthAction({
                    type: AUTH_ACTION.SIGN_IN_RESPONSE,
                    value: {
                        user: null,
                        authError: error
                    }
                });
            });
    };

    const signOut = () => {
        dispatchAuthAction({
            type: AUTH_ACTION.SIGN_OUT_REQUEST,
            value: { authError: null }
        });
        firebaseAuth
            .signOut()
            .then(() =>
                dispatchAuthAction({
                    type: AUTH_ACTION.SIGN_OUT_RESPONSE,
                    value: {
                        user: null,
                        authError: null
                    }
                })
            )
            .catch(error => {
                dispatchAuthAction({
                    type: AUTH_ACTION.SIGN_OUT_RESPONSE,
                    value: {
                        user: null,
                        authError: error
                    }
                });
            });
    };

    const onAuthChange = user => {
        if (user) {
            dispatchAuthAction({
                type: AUTH_ACTION.UPDATE_AUTH_STATUS,
                value: {
                    user,
                    authError: null
                }
            });
        } else {
            dispatchAuthAction({
                type: AUTH_ACTION.UPDATE_AUTH_STATUS,
                value: {
                    user: null,
                    authError: null
                }
            });
        }
    };

    useEffect(() => {
        // listen for auth state changes
        const unsubscribe = firebaseAuth.onAuthStateChanged(onAuthChange);

        // unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, []);

    return { authState, signIn, signOut };
};
