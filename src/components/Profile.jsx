import React, {useContext} from "react";
// import { useAuthState } from 'react-firebase-hooks/auth';
import {GlobalStateContext} from "../GlobalStateContext";

export function Profile() {
    const {state} = useContext(GlobalStateContext);

    if (state.profile) {
        return (
            <div>{state.profile.firstName} {state.profile.lastName}</div>
        )
    }

    return null;
};