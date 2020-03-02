import { createContext } from "react";

export const authContext = createContext({
    authInProgress: false,
    authError: null,
    user: null,
    signIn: null,
    signOut: null
});
