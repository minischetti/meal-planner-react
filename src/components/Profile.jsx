import React from "react";
import { useSelector } from "react-redux";
import { getProfileFrom, getUserWaitingStatusFrom } from "../redux/selectors";

export function Profile() {
    const profile = useSelector(state => getProfileFrom(state));
    const waiting = useSelector(state => getUserWaitingStatusFrom(state));

    if (waiting) {
        return (
            <div>Loading...</div>
        )
    }

    if (profile) {
        return (
            <React.Fragment>
                <div>{profile.firstName} {profile.lastName}</div>
            </React.Fragment>
        )
    }

    return null;
};