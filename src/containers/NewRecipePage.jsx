import React from "react";
import { ComposableRecipe, GlobalHeader } from "../components";
import { AbstractPage } from "../containers";
import { PageHeader } from "../components/ui/page";

export const NewRecipePage = () => {
    return (
        <AbstractPage>
            <GlobalHeader />
            <PageHeader title="New Recipe"/>
            <ComposableRecipe />
        </AbstractPage>
    )
}