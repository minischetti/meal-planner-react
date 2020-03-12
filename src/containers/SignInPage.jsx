import React from "react";
import { Redirect } from "react-router-dom";
import { AbstractPage } from "../containers";
import { SignIn, Page, Loading} from "../components";
import { useAuthSession } from "../hooks";

export const SignInPage = () => {
    const { authInProgress, user } = useAuthSession();

    if (!!user) {
        return <Redirect to={"/"}></Redirect>;
    }

    return (
        <AbstractPage disableGlobalHeader={true}>
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Sign In" />
                {authInProgress ? <Loading.Spinner /> : <SignIn />}
            </Page.Section>
        </AbstractPage>
    );
};
