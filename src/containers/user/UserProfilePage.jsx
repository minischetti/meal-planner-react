import React, { useEffect } from "react";
import { Profile, Page, Loading } from "../../components";
import { AbstractUserPage } from "../../containers";
import { useState } from "react";
import { useParams } from "react-router-dom";
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
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Profile" />
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <Profile profileId={profile.id} name={profile.name} />
                )}
            </Page.Section>
        </AbstractUserPage>
    );
};
