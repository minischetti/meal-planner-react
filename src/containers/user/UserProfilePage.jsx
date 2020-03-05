import React, { useEffect } from "react";
import { Profile } from "../../components";
import {
    PageHeader,
    PageSection,
    PAGE_SECTION_AREA
} from "../../components/ui/page";
import { Bar, BarSection } from "../../components/ui/bar";
import { AbstractPage } from "../../containers";
import { useState } from "react";
import { Spinner } from "../../components/ui/general";
import { useParams } from "react-router";
import { apiBaseUrl } from "../../configuration";
import { LinkWrapper } from "../../components/ui/controls";

export const UserProfilePage = () => {
    let { profileId } = useParams();
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
            {/* Header */}
            <PageSection area={PAGE_SECTION_AREA.HEADER}>
                <PageHeader title="Profile" />
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
                {waiting ? (
                    <Spinner />
                ) : (
                    <Profile
                        profileId={profile.id}
                        firstName={profile.firstName}
                        lastName={profile.lastName}
                    />
                )}
            </PageSection>
        </AbstractPage>
    );
};
