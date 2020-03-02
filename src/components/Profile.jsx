import React from "react";
import { useSelector } from "react-redux";
import { getProfileFrom, getUserWaitingStatusFrom } from "../redux/selectors";
import { Spinner } from "./ui/general";

export function Profile({id, firstName, lastName}) {
    return (
        <React.Fragment>
            <div>{firstName} {lastName}</div>
        </React.Fragment>
    )

};