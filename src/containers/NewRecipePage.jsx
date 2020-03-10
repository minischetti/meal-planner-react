import React from "react";
import { ComposableRecipe, Page } from "../components";
import { AbstractPage } from "../containers";

export const NewRecipePage = () => {
    return (
        <AbstractPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="New Recipe" />
                <ComposableRecipe />
            </Page.Section>
        </AbstractPage>
    );
};
