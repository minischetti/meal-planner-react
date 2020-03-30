import { createContext } from "react";

export const AuthContext = createContext({
    authInProgress: false,
    authError: null,
    user: null,
    signIn: null,
    signOut: null
});
