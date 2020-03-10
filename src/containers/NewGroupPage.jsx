import React from "react";
import { AbstractPage } from "../containers";
import { Page } from "../components";
import { ComposableGroup } from "../components/ComposableGroup";

export const NewGroupPage = () => {
    return (
        <AbstractPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="New Group" />
                <ComposableGroup></ComposableGroup>
            </Page.Section>
        </AbstractPage>
    );
};
