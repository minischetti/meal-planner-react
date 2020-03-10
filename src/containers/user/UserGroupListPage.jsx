import React, { useEffect } from "react";
import { AbstractUserPage } from "../../containers";
import { List, Loading, Page, Control } from "../../components";
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
            <List.Link key={group.id} to={`/groups/${group.id}`}>
                {group.name}
            </List.Link>
        ));
    };

    const newGroupButton = () => {
        if (!user || !user.uid === profileId) {
            return null;
        }

        return (
            <Control.LinkWrapper to="/group/new">
                <Control.Button
                    color={Control.Button.CONFIGURATION.COLOR.DEFAULT}
                >
                    New Group
                    <ion-icon name="add-circle-outline" />
                </Control.Button>
            </Control.LinkWrapper>
        );
    };

    return (
        <AbstractUserPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Groups">{newGroupButton()}</Page.Header>
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <List.Container>{groupListItems()}</List.Container>
                )}
            </Page.Section>
        </AbstractUserPage>
    );
};
