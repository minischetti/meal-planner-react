import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../configuration";
import { LinkWrapper } from "./ui/control";

export const Author = ({ id, role }) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "people/" + id, { signal: abortController.signal })
            .then(response => response.json())
            .then(data => setProfile(data));

        return () => {
            abortController.abort();
        }
    }, []);

    if (profile) {
        return (
            <LinkWrapper to={`/profiles/${id}`}>
                <div>{profile.name}</div>
            </LinkWrapper>
        )
    }

    return null;
}