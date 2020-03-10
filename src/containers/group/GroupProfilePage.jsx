import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../../configuration";
import { Page, Loading } from "../../components";
import { AbstractGroupPage } from "./AbstractGroupPage";

export const GroupProfilePage = () => {
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

    return (
        <AbstractGroupPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header subTitle={group.name} title="Group Profile" />
                {waiting ? <Loading.Spinner /> : <div>Group profile page</div>}
            </Page.Section>
        </AbstractGroupPage>
    );
};
