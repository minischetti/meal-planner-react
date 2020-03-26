import React from "react";
import { AbstractPage } from "../containers";
import { SignIn, Page } from "../components";
import { useAuthSession } from "../hooks";

export const SignInPage = () => {
    const { user } = useAuthSession();

    if (!!user) {
        return (
            <AbstractPage>
                <Page.Section
                    position={Page.SECTION_CONFIGURATION.POSITION.MAIN}
                >
                    <Page.Header title="Sign In" />
                    <div>You're signed in.</div>
                </Page.Section>
            </AbstractPage>
        );
    }

    return (
        <AbstractPage disableGlobalHeader={true}>
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Sign In" />
                <SignIn />
            </Page.Section>
        </AbstractPage>
    );
};
