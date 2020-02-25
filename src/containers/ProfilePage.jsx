import * as React from "react";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { AbstractPage } from "./containers";

export const ProfilePage = () => {
    return (
        <AbstractPage>
            <Header />
            <h1>Profile</h1>
            <Profile />
        </AbstractPage>
    )
}