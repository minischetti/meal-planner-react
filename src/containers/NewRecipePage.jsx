import React from "react";
import { ComposableRecipe } from "../components";
import { AbstractPage } from "../containers";
import { PageHeader } from "../components/ui/page";

export const NewRecipePage = () => {
    return (
        <AbstractPage>
            <PageSection area={PAGE_SECTION_AREA.HEADER}>
                <PageHeader title="New Recipe" />
            </PageSection>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <ComposableRecipe />
            </PageSection>
        </AbstractPage>
    );
};
