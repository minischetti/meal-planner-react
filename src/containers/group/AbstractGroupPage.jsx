import React from "react";
import { AbstractPage } from "../../containers";
import { PAGE_SECTION_AREA, PageSection } from "../../components/ui/page";
import { NavLinkWrapper } from "../../components/ui/controls";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Spinner } from "../../components/ui/general";
import { apiBaseUrl } from "../../configuration/api";
import { Bar, IdentityPanel } from "../../components";
export const AbstractGroupPage = ({ children }) => {
    const { groupId } = useParams();
    const [group, setGroup] = useState({});
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "groups/" + groupId, {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setGroup(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <AbstractPage>
            {/* Navigation */}
            <PageSection area={PAGE_SECTION_AREA.LEFT}>
                <Bar.Container>
                    <Bar.Section>
                        {waiting ? (
                            <Spinner />
                        ) : (
                            <IdentityPanel.Group name={group.name} />
                        )}
                    </Bar.Section>
                    <Bar.Section title="Navigation">
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
                    </Bar.Section>
                </Bar.Container>
            </PageSection>
            {children}
        </AbstractPage>
    );
};
