import React, {useContext, useEffect} from "react";
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from "react-redux";
import { getProfile } from "../redux/selectors";

export function Profile() {
    const profile = useSelector(state => getProfile(state));

    if (profile) {
        return (
            <div>{profile.firstName} {profile.lastName}</div>
        )
    }

    return null;
};