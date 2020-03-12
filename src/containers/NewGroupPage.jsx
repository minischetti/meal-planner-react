import React from "react";
import { AbstractPage } from "../containers";
import { Page, ComposableGroup } from "../components";

export const NewGroupPage = () => {
    return (
        <AbstractPage>
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="New Group" />
                <ComposableGroup></ComposableGroup>
            </Page.Section>
        </AbstractPage>
    );
};
