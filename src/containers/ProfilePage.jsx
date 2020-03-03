import React, { useEffect } from "react";
import { GlobalHeader, Profile } from "../components";
import { PageHeader } from "../components/ui/page";
import { AbstractPage } from "../containers";
import { useState } from "react";
import { Spinner } from "../components/ui/general";
import { useParams } from "react-router";
import { apiBaseUrl } from "../configuration";

export const ProfilePage = () => {
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
            <PageHeader title="Profile" />
            {waiting ? (
                <Spinner />
            ) : (
                <Profile
                    profileId={profile.id}
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                />
            )}
        </AbstractPage>
    );
};
