import React, {useContext, useEffect} from "react";
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from "react-redux";
import { getProfileFrom } from "../redux/selectors";

export function Profile() {
    const profile = useSelector(state => getProfileFrom(state));

    if (profile) {
        return (
            <React.Fragment>
                <h1>Profile</h1>
                <div>{profile.firstName} {profile.lastName}</div>
            </React.Fragment>
        )
    }

    return null;
};