import React from "react";
import {
    PageHeader,
    PAGE_SECTION_AREA,
    PageSection
} from "../../components/ui/page";
import { AbstractGroupPage } from "./AbstractGroupPage";

export const GroupHomePage = () => {
    return (
        <AbstractGroupPage>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="Group Home" />
            </PageSection>
            {/* Recent Activity */}
        </AbstractGroupPage>
    );
};
