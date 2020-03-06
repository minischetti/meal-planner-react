import * as React from "react";
import { PageHeader, PageSection, PAGE_SECTION_AREA } from "../../components/ui/page";
import { AbstractUserPage } from "../../containers";

export const UserHomePage = () => {
    return (
        <AbstractUserPage>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="Home" />
            </PageSection>
            {/* Recent Activity */}
        </AbstractUserPage>
    );
};
