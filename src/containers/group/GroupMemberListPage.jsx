import React, { useEffect } from "react";
import { List, Loading, Page, Control, Modal, Form } from "../../components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";
import { AbstractGroupPage } from "./AbstractGroupPage";
import { css } from "@emotion/core";

export const UserSearch = () => {
    const [query, setQuery] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [results, setResults] = useState([]);
    const [inviteRecipients, setInviteRecipients] = useState([]);
    const searchAbortController = new AbortController();

    const resultListItems = () => {
        if (!results || !results.length) {
            return null;
        }

        return results.map(result => (
            <List.CheckableItem
                key={result.id}
                label={result.name}
                onClick={() => toggleRecipientInviteStatus(result.id)}
                checked={isPersonInvited(result.id)}
            />
        ));
    };

    useEffect(() => {
        return () => {
            searchAbortController.abort();
        };
    });

    const isPersonInvited = recipientId => {
        return !!inviteRecipients.find(id => id === recipientId);
    };

    const toggleRecipientInviteStatus = recipientId => {
        return isPersonInvited(recipientId)
            ? uninviteRecipient(recipientId)
            : inviteRecipient(recipientId);
    };

    const inviteRecipient = recipientId => {
        return setInviteRecipients([...inviteRecipients, recipientId]);
    };

    const uninviteRecipient = recipientId => {
        return setInviteRecipients([
            ...inviteRecipients.filter(id => id !== recipientId)
        ]);
    };

    const search = () => {
        setWaiting(true);

        fetch(apiBaseUrl + "people/search?query=" + query, {
            signal: searchAbortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setResults(data);
                setWaiting(false);
            })
            .catch(error => {
                setResults([]);
                setWaiting(false);
                setHasError(error);
        });

        // const people = [
        //     { name: "Dominic Minischetti", id: "0" },
        //     { name: "Alexandria Grisdale", id: "1" },
        //     { name: "Laura Bailey", id: "2" },
        //     { name: "Patrick Squidlerson", id: "3" },
        //     { name: "Mariah Barey", id: "4" }
        // ];

        // const results = people.filter(person =>
        //     person.name.toLowerCase().includes(query.toLowerCase())
        // );

        // setTimeout(() => {
        //     setResults(results);
        //     setWaiting(false);
        // }, 500);
    };

    const searchIcon = <ion-icon name="search-outline" />;

    const containerStyle = css`
        display: grid;
        gap: 10px;
    `;

    const formStyle = css`
        display: grid;
        gap: 10px;
        grid-auto-flow: column;
    `;

    return (
        <div css={containerStyle}>
            {hasError ? <div>An error has occurred. Please try again.</div> : ""}
            <div css={formStyle}>
                <Control.TextField
                    defaultValue={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <Control.Button
                    onClick={search}
                    label="Search"
                    icon={searchIcon}
                />
            </div>
            {waiting ? <Loading.Spinner /> : <List.Container>{resultListItems()}</List.Container>}
        </div>
    );
};

export const GroupMemberListPage = () => {
    const { groupId } = useParams();
    const [members, setMembers] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "groups/" + groupId + "/members", {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setMembers(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    const memberListItems = () => {
        if (!members || !members.length) {
            return null;
        }

        return members.map((member, index) => (
            <List.Link key={index} to={`/profiles/${member.id}`}>
                <div>{member.name}</div>
            </List.Link>
        ));
    };

    const onCancelModal = () => {
        setShowModal(false);
    };

    const handleInviteButtonClick = () => {
        setShowModal(true);
    };

    const memberInviteModal = () => {
        return (
            <Modal.Container>
                <Modal.Header title="Invite Members" />
                <Modal.Body>
                    <UserSearch />
                </Modal.Body>
                <Modal.Footer>
                    <Control.Button
                        color={Control.BUTTON_CONFIGURATION.COLOR.BLUE}
                        onClick={onCancelModal}
                    >
                        Cancel
                        <ion-icon name="arrow-back-outline" />
                    </Control.Button>
                    <Control.Button
                        color={Control.BUTTON_CONFIGURATION.COLOR.GREEN}
                    >
                        Send
                        <ion-icon name="save-outline" />
                    </Control.Button>
                </Modal.Footer>
            </Modal.Container>
        );
    };

    return (
        <AbstractGroupPage>
            {showModal ? memberInviteModal() : null}
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Group Members">
                    <Control.Button
                        label="Invite Member"
                        icon={<ion-icon name="add-circle-outline" />}
                        onClick={handleInviteButtonClick}
                    />
                </Page.Header>
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <List.Container emptyText="Members will appear in this list.">
                        {memberListItems()}
                    </List.Container>
                )}
            </Page.Section>
        </AbstractGroupPage>
    );
};
