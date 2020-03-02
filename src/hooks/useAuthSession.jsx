import { useContext } from "react";
import { authContext } from "../context/authContext";

export const useAuthSession = () => {
    const { authInProgress, authError, user, signIn, signOut } = useContext(
        authContext
    );

    return {
        authInProgress,
        authError,
        user,
        signIn,
        signOut
    };
};
