import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../../configuration";
import { AbstractPage } from "../../containers";
import { useAuthSession } from "../../hooks/useAuthSession";
import { Spinner } from "../../components/ui/general";
import {
    PageHeader,
    PAGE_SECTION_AREA,
    PageSection
} from "../../components/ui/page";
import { LinkWrapper } from "../../components/ui/controls";
import { Bar, BarSection } from "../../components/ui/bar";

export const GroupHomePage = () => {
    const { user } = useAuthSession();
    const [group, setGroup] = useState({});
    const [waiting, setWaiting] = useState(true);
    let { groupId } = useParams();

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

    // const canEditGroup = () => {
    //     if (!user || !group?.members) {
    //         return false;
    //     }

    //     return group.members.find(member => {
    //         return (
    //             (member.role === "owner" || member.role === "contributor") &&
    //             member.id === user.uid
    //         );
    //     });
    // };

    return (
        <AbstractPage>
            <PageSection area={PAGE_SECTION_AREA.HEADER}>
                <PageHeader title="Group Profile" />
            </PageSection>

            {/* Navigation */}
            <PageSection area={PAGE_SECTION_AREA.RIGHT}>
                <Bar>
                    <BarSection title="Navigation">
                        <LinkWrapper to={`/groups/${groupId}`}>
                            Profile
                        </LinkWrapper>
                        <LinkWrapper to={`/groups/${groupId}/members`}>
                            Members
                        </LinkWrapper>
                        <LinkWrapper to={`/groups/${groupId}/recipes`}>
                            Recipes
                        </LinkWrapper>
                    </BarSection>
                </Bar>
            </PageSection>

            {/* Main */}
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                {waiting ? (
                    <Spinner />
                ) : (
                    <div>
                        <div>{group.name}</div>
                        <LinkWrapper to={`/groups/${groupId}/recipes`}>
                            Recipes
                        </LinkWrapper>
                        <LinkWrapper to={`/groups/${groupId}/members`}>
                            Members
                        </LinkWrapper>
                    </div>
                )}
            </PageSection>
        </AbstractPage>
    );
};
