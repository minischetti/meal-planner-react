import React from "react";
import { AbstractPage } from "../../containers";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { apiBaseUrl } from "../../configuration/api";
import { Bar, IdentityPanel, Loading, Control, Page } from "../../components";

export const AbstractUserPage = ({ children }) => {
    const { profileId } = useParams();
    const [profile, setProfile] = useState({});
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "people/" + profileId, {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setProfile(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <AbstractPage>
            {/* Profile and Navigation */}
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.LEFT}>
                <Bar.Container>
                    <Bar.Section>
                        {waiting ? (
                            <Loading.Spinner />
                        ) : (
                            <IdentityPanel.User name={profile.name} />
                        )}
                    </Bar.Section>
                    <Bar.Section title="Navigation">
                        <Control.NavLinkWrapper
                            exact
                            to={`/profiles/${profileId}`}
                        >
                            Home
                        </Control.NavLinkWrapper>
                        <Control.NavLinkWrapper
                            exact
                            to={`/profiles/${profileId}/profile`}
                        >
                            Profile
                        </Control.NavLinkWrapper>
                        <Control.NavLinkWrapper
                            exact
                            to={`/profiles/${profileId}/groups`}
                        >
                            Groups
                        </Control.NavLinkWrapper>
                        <Control.NavLinkWrapper
                            exact
                            to={`/profiles/${profileId}/recipes`}
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
