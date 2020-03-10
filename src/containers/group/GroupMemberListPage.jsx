import React, { useEffect } from "react";
import { List, Loading, Page } from "../../components";
import { useParams } from "react-router";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";
import { AbstractGroupPage } from "./AbstractGroupPage";

export const GroupMemberListPage = () => {
    const { groupId } = useParams();
    const [members, setMembers] = useState([]);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "groups/" + groupId + "/members", {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setMembers(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    const memberListItems = () => {
        if (!members || !members.length) {
            return null;
        }

        return members.map((member, index) => (
            <List.Link key={index} to={`/profiles/${member.id}`}>
                <div>
                    {member.name}
                </div>
            </List.Link>
        ));
    };

    return (
        <AbstractGroupPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Group Members" />
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <List.Container emptyText="Members will appear in this list.">
                        {memberListItems()}
                    </List.Container>
                )}
            </Page.Section>
        </AbstractGroupPage>
    );
};
