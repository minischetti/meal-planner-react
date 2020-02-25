import * as React from "react";
import { Header, Profile } from "../components/components";
import { PageActionBar } from "../components/global/global";
import { AbstractPage } from "./containers";

export const ProfilePage = () => {
    return (
        <AbstractPage>
            <Header />
            <PageActionBar title="Profile" />
            <Profile />
        </AbstractPage>
    )
}