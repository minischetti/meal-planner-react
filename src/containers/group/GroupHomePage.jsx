import React from "react";
import { Page } from "../../components";
import { AbstractGroupPage } from "./AbstractGroupPage";

export const GroupHomePage = () => {
    return (
        <AbstractGroupPage>
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Group Home" />
            </Page.Section>
            {/* Recent Activity */}
        </AbstractGroupPage>
    );
};
