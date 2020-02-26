import React from "react";
import { useSelector } from "react-redux";
import { getProfileFrom, getUserWaitingStatusFrom } from "../redux/selectors";
import { Spinner } from "./global/global";

export function Profile() {
    const profile = useSelector(state => getProfileFrom(state));
    const waiting = useSelector(state => getUserWaitingStatusFrom(state));

    if (waiting) {
        return (
            <Spinner/>
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