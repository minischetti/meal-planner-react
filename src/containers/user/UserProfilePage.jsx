import React, { useEffect } from "react";
import { Profile } from "../../components";
import {
    PageHeader,
    PageSection,
    PAGE_SECTION_AREA
} from "../../components/ui/page";
import { AbstractUserPage } from "../../containers";
import { useState } from "react";
import { Spinner } from "../../components/ui/general";
import { useParams } from "react-router";
import { apiBaseUrl } from "../../configuration";

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
        <AbstractUserPage>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="Profile" />
                {waiting ? (
                    <Spinner />
                ) : (
                    <Profile profileId={profile.id} name={profile.name} />
                )}
            </PageSection>
        </AbstractUserPage>
    );
};
