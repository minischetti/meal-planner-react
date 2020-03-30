import React, { useState, Fragment } from "react";
import { Form, Control, Modal, IdentityPanel } from "../components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../store/actions";
import { getCreateGroupErrorStatusFrom } from "../store/selectors";

export const ComposableGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const hasError = useSelector(state => getCreateGroupErrorStatusFrom(state));

    const createGroupRequest = event => {
        event.preventDefault();
        const payload = {
            name: groupName,
            description: groupDescription
        };

        dispatch(createGroup(payload));

        resetForm();
    };

    const onCancelModal = () => {
        setShowModal(false);
    };

    const confirmAction = event => {
        event.preventDefault();
        setShowModal(true);
    };

    const resetForm = () => {
        setGroupName("");
        setGroupDescription("");
        setShowModal(false);
    };

    return (
        <Fragment>
            {hasError
                ? "There was an error creating this group. Please try again."
                : ""}
            {showModal ? (
                <Modal.Container>
                    <Modal.Header title="Create group?" />
                    <Modal.Body>
                        <div>
                            Are you sure that you want to create this group?
                        </div>
                        <IdentityPanel.Group
                            name={groupName}
                            withBorder={true}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Control.Button
                            color={Control.BUTTON_CONFIGURATION.COLOR.RED}
                            onClick={onCancelModal}
                        >
                            Cancel
                            <ion-icon name="arrow-back-outline" />
                        </Control.Button>
                        <Control.Button
                            color={Control.BUTTON_CONFIGURATION.COLOR.GREEN}
                            onClick={createGroupRequest}
                        >
                            Yes
                            <ion-icon name="save-outline" />
                        </Control.Button>
                    </Modal.Footer>
                </Modal.Container>
            ) : (
                ""
            )}
            <Form.Container onSubmit={confirmAction}>
                <Form.Section.Container>
                    <Form.Section.Header>
                        <Form.Section.Title>Details</Form.Section.Title>
                    </Form.Section.Header>
                    <Form.Section.Content
                        style={
                            Form.Section.CONTENT_CONFIGURATION.STYLE.NO_BORDER
                        }
                    >
                        <Control.TextField
                            value={groupName}
                            placeholder="Group Name"
                            onChange={event => setGroupName(event.target.value)}
                        />
                        <Control.TextField
                            value={groupDescription}
                            placeholder="Group Description"
                            onChange={event =>
                                setGroupDescription(event.target.value)
                            }
                        />
                    </Form.Section.Content>
                </Form.Section.Container>
                <Form.Footer.Container>
                    <Control.Button
                        type={Control.BUTTON_CONFIGURATION.TYPE.SUBMIT}
                        color={Control.BUTTON_CONFIGURATION.COLOR.GREEN}
                    >
                        Create
                        <ion-icon name="save-outline" />
                    </Control.Button>
                </Form.Footer.Container>
            </Form.Container>
        </Fragment>
    );
};
