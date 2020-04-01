import React, { useEffect } from "react";
import { List, Loading, Page, Control, Modal, Section, Text } from "../../components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";
import { AbstractGroupPage } from "./AbstractGroupPage";
import { css } from "@emotion/core";

export const GroupMemberListPage = () => {
    const { groupId } = useParams();
    const [query, setQuery] = useState("");
    const [members, setMembers] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [results, setResults] = useState([]);

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

    /**
     * XHR
     */
    const search = () => {
        setWaiting(true);

        fetch(apiBaseUrl + "people/search?searchQuery=" + query)
            .then(response => response.json())
            .then(data => {
                const results = data.map(result => ({ ...result, selected: false }));
                setResults(results);
                setHasError(false);
            })
            .catch(() => {
                setResults([]);
                setHasError(true);
            })
            .finally(() => {
                setWaiting(false);
            });
    };

    /**
     * Methods
     */
    const invite = () => {
        const recipients = results.filter(result => result.selected);
        console.log("recipients", recipients);
    };

    const toggleSelected = index => {
        const updatedResults = [...results];
        updatedResults[index].selected = !results[index].selected;

        setResults(updatedResults);
    };

    const onCancelModal = () => {
        setShowModal(false);
    };

    const handleInviteButtonClick = () => {
        setShowModal(true);
    };

    /**
     * Templates
     */
    const groupMemberListItems = () => {
        if (!members?.length) {
            return null;
        }

        return members.map((member, index) => (
            <List.Link key={index} to={`/profiles/${member.id}`}>
                <div>{member.name}</div>
            </List.Link>
        ));
    };

    const inviteModal = () => {
        return (
            <Modal.Container>
                <Modal.Header title="Invite People" />
                <Modal.Body>
                    <div css={styles.container}>
                        <div css={styles.header}>
                            {hasError ? <div>An error has occurred. Please try again.</div> : ""}
                            <div css={styles.form}>
                                <Control.TextField defaultValue={query} onChange={event => setQuery(event.target.value)} />
                                <Control.Button onClick={search} label="Search" icon={searchIcon} />
                            </div>
                            {!hasError && results?.length ? <div>{`Result${results.length > 1 ? "s" : ""}`}</div> : null}
                        </div>
                        <div css={styles.container}>
                            <Section.Container>
                                <List.Container>{searchResultItems()}</List.Container>
                            </Section.Container>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Control.Button color={Control.BUTTON_CONFIGURATION.COLOR.BLUE} onClick={onCancelModal}>
                        Cancel
                        <ion-icon name="arrow-back-outline" />
                    </Control.Button>
                    <Control.Button color={Control.BUTTON_CONFIGURATION.COLOR.GREEN} onClick={invite}>
                        Send
                        <ion-icon name="save-outline" />
                    </Control.Button>
                </Modal.Footer>
            </Modal.Container>
        );
    };

    const searchResultItems = () => {
        const emptyList = <div>...</div>;

        if (!results?.length) {
            return emptyList;
        }

        return results.map((result, index) => (
            <List.CheckableItem key={index} label={result.name} checkedCallback={() => toggleSelected(index)} checked={result.selected} />
        ));
    };

    /**
     * Icons
     */
    const searchIcon = <ion-icon name="search-outline" />;

    /**
     * Styles
     */
    const styles = {
        container: css`
            display: grid;
            gap: 10px;
        `,
        form: css`
            display: grid;
            gap: 10px;
            grid-auto-flow: column;
            grid-template-columns: 1fr auto;
        `,
        header: css`
            display: grid;
            gap: 10px;
        `,
        content: css`
            display: grid;
            grid-auto-flow: column;
        `
    };

    return (
        <AbstractGroupPage>
            {showModal ? inviteModal() : null}
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Group Members">
                    <Control.Button label="Invite Member" icon={<ion-icon name="add-circle-outline" />} onClick={handleInviteButtonClick} />
                </Page.Header>
                {waiting ? <Loading.Spinner /> : <List.Container emptyText="Group members will appear in this list.">{groupMemberListItems()}</List.Container>}
            </Page.Section>
        </AbstractGroupPage>
    );
};
