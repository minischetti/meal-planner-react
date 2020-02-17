import * as React from "react";
import {Header} from "../components/Header";
import {Profile} from "../components/Profile";

export const ProfilePage = () => {
    return (
        <React.Fragment>
            <Header/>
            <h1>Profile</h1>
            <Profile/>
        </React.Fragment>
    )
}