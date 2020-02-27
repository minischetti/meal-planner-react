import * as React from "react";
import { GlobalHeader, Profile } from "../components";
import { PageActionBar } from "../components/ui/page";
import { AbstractPage } from "../containers";

export const ProfilePage = () => {
    return (
        <AbstractPage>
            <GlobalHeader />
            <PageActionBar title="Profile" />
            <Profile />
        </AbstractPage>
    )
}