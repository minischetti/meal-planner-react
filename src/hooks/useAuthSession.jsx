import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthSession = () => {
    const { authInProgress, authError, user, signIn, signOut } = useContext(
        AuthContext
    );

    return {
        authInProgress,
        authError,
        user,
        signIn,
        signOut
    };
};
