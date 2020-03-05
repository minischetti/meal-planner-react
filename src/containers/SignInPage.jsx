import React from "react";
import { Redirect } from "react-router-dom";
import { AbstractPage } from "../containers";
import { SignIn } from "../components";
import { PageHeader, PageSection, PAGE_SECTION_AREA } from "../components/ui/page";
import { Spinner } from "../components/ui/general";
import { useAuthSession } from "../hooks";

export const SignInPage = () => {
    const { authInProgress, user } = useAuthSession();

    if (!!user) {
        return <Redirect to={"/"}></Redirect>;
    }

    return (
        <AbstractPage disableHeader={true}>
            <PageSection area={PAGE_SECTION_AREA.HEADER}>
                <PageHeader title="Sign In" />
            </PageSection>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                {authInProgress ? <Spinner /> : <SignIn />}
            </PageSection>
        </AbstractPage>
    );
};
