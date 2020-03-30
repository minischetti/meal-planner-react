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

    const invite = () => {
        const recipients = results.filter(result => result.selected);
        console.log("recipients", recipients);
        // dispatch();
    };

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

    // const toggleSelected = index => (results[index].selected = !results[index].selected);
    const toggleSelected = index => {
        results[index].selected = !results[index].selected;
        console.log(results[index].selected);
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

    const headerStyle = css``;

    const contentStyle = css`
        display: grid;
        grid-auto-flow: column;
        gap: 20px;
        grid-template-columns: 1fr 1fr;
    `;

    const onCancelModal = () => {
        setShowModal(false);
    };

    const handleInviteButtonClick = () => {
        setShowModal(true);
    };

    const inviteModal = () => {
        return (
            <Modal.Container>
                <Modal.Header title="Invite People" />
                <Modal.Body>
                    <div css={containerStyle}>
                        <div css={headerStyle}>
                            {hasError ? <div>An error has occurred. Please try again.</div> : ""}
                            <div css={formStyle}>
                                <Control.TextField defaultValue={query} onChange={event => setQuery(event.target.value)} />
                                <Control.Button onClick={search} label="Search" icon={searchIcon} />
                            </div>
                            {!hasError && results?.length ? <div>{results.length} Results</div> : null}
                        </div>
                        <div css={contentStyle}>
                            <Section.Container>
                                <Text.Header title="Not Invited" titleSize={Text.HEADER_TITLE_SIZE.MEDIUM} />
                                <List.Container>{unselectedListItems()}</List.Container>
                            </Section.Container>
                            <Section.Container>
                                <Text.Header title="Invited" titleSize={Text.HEADER_TITLE_SIZE.MEDIUM} />
                                <List.Container>{selectedListItems()}</List.Container>
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

    const unselectedListItems = () => {
        const emptyList = <div>...</div>;

        if (!results?.length) {
            return emptyList;
        }

        const unselectedResults = results.filter(result => !result.selected);
        console.log("unselectedResults", unselectedResults);

        if (!unselectedResults?.length) {
            return emptyList;
        }

        return unselectedResults.map((result, index) => (
            <List.CheckableItem key={index} label={result.name} checkedCallback={() => toggleSelected(index)} checked={result.selected} />
        ));
    };

    const selectedListItems = () => {
        const emptyList = <div>...</div>;

        if (!results?.length) {
            return emptyList;
        }

        const selectedResults = results.filter(result => result.selected);
        console.log("selectedResults", selectedResults);

        if (!selectedResults?.length) {
            return emptyList;
        }

        return selectedResults.map((result, index) => (
            <List.CheckableItem key={index} label={result.name} checkedCallback={() => toggleSelected(index)} checked={result.selected} />
        ));
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
