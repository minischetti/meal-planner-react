import React, { useState, Fragment } from "react";
import { Form, Control } from "../components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../redux/actions";
import {
    getCreateGroupResponseFrom,
    getCreateGroupErrorStatusFrom
} from "../redux/selectors";

export const ComposableGroup = () => {
    const [groupName, setGroupName] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const createGroupResponse = useSelector(state =>
        getCreateGroupResponseFrom(state)
    );
    const hasError = useSelector(state =>
        getCreateGroupErrorStatusFrom(state)
    );

    const onSubmit = event => {
        event.preventDefault();
        const payload = {
            name: groupName
        };

        dispatch(createGroup(payload));

        console.log("createGroupResponse", createGroupResponse);

        if (!hasError) {
            history.push(`/groups/${createGroupResponse.groupId}`);
        }
    };

    const onCancel = () => {
        history.push("/groups");
    };

    return (
        <Fragment>
            {hasError
                ? "There was an error creating this group. Please try again."
                : ""}

            <Form.Container onSubmit={onSubmit}>
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
                    </Form.Section.Content>
                </Form.Section.Container>
                <Form.Footer.Container>
                    <Control.Button
                        color={Control.BUTTON_CONFIGURATION.COLOR.BLUE}
                        onClick={onCancel}
                    >
                        Cancel
                        <ion-icon name="arrow-back-outline" />
                    </Control.Button>
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
