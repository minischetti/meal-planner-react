import React from "react";
import { AbstractPage } from "../../containers";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiBaseUrl } from "../../configuration/api";
import { Bar, IdentityPanel, Loading, Page, Control } from "../../components";
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
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.LEFT}>
                <Bar.Container>
                    <Bar.Section>
                        {waiting ? (
                            <Loading.Spinner />
                        ) : (
                            <IdentityPanel.Group name={group.name} />
                        )}
                    </Bar.Section>
                    <Bar.Section title="Navigation">
                        <Control.NavLinkWrapper
                            exact
                            to={`/groups/${groupId}/`}
                        >
                            Home
                        </Control.NavLinkWrapper>
                        <Control.NavLinkWrapper
                            exact
                            to={`/groups/${groupId}/profile`}
                        >
                            Profile
                        </Control.NavLinkWrapper>
                        <Control.NavLinkWrapper
                            exact
                            to={`/groups/${groupId}/members`}
                        >
                            Members
                        </Control.NavLinkWrapper>
                        <Control.NavLinkWrapper
                            exact
                            to={`/groups/${groupId}/recipes`}
                        >
                            Recipes
                        </Control.NavLinkWrapper>
                    </Bar.Section>
                </Bar.Container>
            </Page.Section>
            {children}
        </AbstractPage>
    );
};
