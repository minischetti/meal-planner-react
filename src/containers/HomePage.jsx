import * as React from "react";
import { AbstractPage } from "./AbstractPage";
import { PageSection, PageHeader, PAGE_SECTION_AREA } from "../components/ui/page";

export const HomePage = () => {
    return (
        <AbstractPage>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="Home" />
            </PageSection>
            {/* Recent Activity */}
        </AbstractPage>
    );
};
