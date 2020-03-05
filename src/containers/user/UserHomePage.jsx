import * as React from "react";
import { AbstractPage } from "../../containers";
import { PageHeader, PageSection, PAGE_SECTION_AREA } from "../../components/ui/page";

export const UserHomePage = () => {
    return (
        <AbstractPage>
            <PageSection area={PAGE_SECTION_AREA.HEADER}>
                <PageHeader title="Home" />
            </PageSection>
            {/* Recent Activity */}
        </AbstractPage>
    );
};
