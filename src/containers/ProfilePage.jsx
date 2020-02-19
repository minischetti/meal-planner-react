import * as React from "react";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { Page } from "./Page";

export const ProfilePage = () => {
    return (
        <Page>
            <Header />
            <h1>Profile</h1>
            <Profile />
        </Page>
    )
}