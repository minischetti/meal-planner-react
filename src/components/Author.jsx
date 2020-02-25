import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiBaseUrl } from "../redux/actions";

export const Author = ({ id, role }) => {
    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();

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
            <React.Fragment>
                <div>{profile.firstName}</div>
            </React.Fragment>
        )
    }

    return null;
}