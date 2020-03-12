import * as React from "react";
import { AbstractPage } from "./AbstractPage";
import { Page } from "../components";

export const HomePage = () => {
    return (
        <AbstractPage>
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Home" />
            </Page.Section>
            {/* Recent Activity */}
        </AbstractPage>
    );
};
