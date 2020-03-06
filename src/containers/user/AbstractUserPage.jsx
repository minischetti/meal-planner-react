import React from "react";
import { AbstractPage } from "../../containers";
import { PAGE_SECTION_AREA, PageSection } from "../../components/ui/page";
import { Bar, BarSection, BarHeader, BarPanel } from "../../components/ui/bar";
import { NavLinkWrapper } from "../../components/ui/controls";
import { useParams } from "react-router";
import { useState } from "react";
import { Spinner } from "../../components/ui/general";
import { useEffect } from "react";
import { apiBaseUrl } from "../../configuration/api";
import { UserPanel } from "../../components/ui";

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
            <PageSection area={PAGE_SECTION_AREA.LEFT}>
                <Bar>
                    {waiting ? (
                        <Spinner />
                    ) : (
                        <BarSection>
                            <UserPanel
                                name={`${profile.firstName} ${profile.lastName}`}
                            />
                        </BarSection>
                    )}
                </Bar>
                <Bar>
                    <BarSection title="Navigation">
                        <NavLinkWrapper exact to={`/profiles/${profileId}`}>
                            Home
                        </NavLinkWrapper>
                        <NavLinkWrapper
                            exact
                            to={`/profiles/${profileId}/profile`}
                        >
                            Profile
                        </NavLinkWrapper>
                        <NavLinkWrapper
                            exact
                            to={`/profiles/${profileId}/groups`}
                        >
                            Groups
                        </NavLinkWrapper>
                        <NavLinkWrapper
                            exact
                            to={`/profiles/${profileId}/recipes`}
                        >
                            Recipes
                        </NavLinkWrapper>
                    </BarSection>
                </Bar>
            </PageSection>
            {children}
        </AbstractPage>
    );
};
