import React from "react";
import { AbstractPage } from "../../containers";
import { PAGE_SECTION_AREA, PageSection } from "../../components/ui/page";
import { Bar, BarSection } from "../../components/ui/bar";
import { NavLinkWrapper } from "../../components/ui/controls";
import { useParams } from "react-router";

export const AbstractGroupPage = ({ children }) => {
    const { groupId } = useParams();

    return (
        <AbstractPage>
            {/* Navigation */}
            <PageSection area={PAGE_SECTION_AREA.LEFT}>
                <Bar>
                    <BarSection title="Navigation">
                        <NavLinkWrapper exact to={`/groups/${groupId}/`}>
                            Home
                        </NavLinkWrapper>
                        <NavLinkWrapper exact to={`/groups/${groupId}/profile`}>
                            Profile
                        </NavLinkWrapper>
                        <NavLinkWrapper exact to={`/groups/${groupId}/members`}>
                            Members
                        </NavLinkWrapper>
                        <NavLinkWrapper exact to={`/groups/${groupId}/recipes`}>
                            Recipes
                        </NavLinkWrapper>
                    </BarSection>
                </Bar>
            </PageSection>
            {children}
        </AbstractPage>
    );
};
