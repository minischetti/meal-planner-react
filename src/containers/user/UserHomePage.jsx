import * as React from "react";
import { Page } from "../../components";
import { AbstractUserPage } from "../../containers";

export const UserHomePage = () => {
    const { POSITION } = Page.Section.CONFIGURATION;

    return (
        <AbstractUserPage>
            <Page.Section position={POSITION.MAIN}>
                <Page.Header title="Home" />
            </Page.Section>
            {/* Recent Activity */}
        </AbstractUserPage>
    );
};
