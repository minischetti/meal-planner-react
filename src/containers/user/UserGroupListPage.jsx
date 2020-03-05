import React, { useEffect } from "react";
import { AbstractPage } from "../../containers";
import { GroupListItem } from "../../components";
import {
    Button,
    BUTTON_COLOR,
    LinkWrapper
} from "../../components/ui/controls";
import { List } from "../../components/ui/list";
import { Spinner } from "../../components/ui/general";
import {
    PageHeader,
    PageSection,
    PAGE_SECTION_AREA
} from "../../components/ui/page";
import { Bar, BarSection } from "../../components/ui/bar";
import { useParams } from "react-router";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";

export const UserGroupListPage = () => {
    const { profileId } = useParams();
    const [groups, setGroups] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const { user } = useAuthSession();

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "people/" + profileId + "/groups", {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setGroups(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    const groupListItems = () => {
        if (!groups || !groups.length) {
            return null;
        }

        return groups.map(group => (
            <GroupListItem key={group.id} name={group.name} id={group.id} />
        ));
    };

    const newGroupButton = () => {
        if (!user || !user.uid === profileId) {
            return null;
        }

        return (
            <LinkWrapper to="/group/new">
                <Button color={BUTTON_COLOR.GREEN}>
                    New Group
                    <ion-icon name="add-circle-outline" />
                </Button>
            </LinkWrapper>
        );
    };

    return (
        <AbstractPage>
            {/* Header */}
            <PageSection area={PAGE_SECTION_AREA.HEADER}>
                <PageHeader title="Groups">{newGroupButton()}</PageHeader>
            </PageSection>

            {/* Navigation */}
            <PageSection area={PAGE_SECTION_AREA.RIGHT}>
                <Bar>
                    <BarSection title="Navigation">
                        <LinkWrapper to={`/profiles/${profileId}`}>
                            Profile
                        </LinkWrapper>
                        <LinkWrapper to={`/profiles/${profileId}/groups`}>
                            Groups
                        </LinkWrapper>
                        <LinkWrapper to={`/profiles/${profileId}/recipes`}>
                            Recipes
                        </LinkWrapper>
                    </BarSection>
                </Bar>
            </PageSection>

            {/* Main */}
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                {waiting ? <Spinner /> : <List>{groupListItems()}</List>}
            </PageSection>
        </AbstractPage>
    );
};
