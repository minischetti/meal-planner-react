import React, { useState, Fragment } from "react";
import { Form, Control } from "../components";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../redux/actions";
import { getCreateGroupResponseFrom } from "../redux/selectors";

export const ComposableGroup = () => {
    const [groupName, setGroupName] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    const createGroupResponse = useSelector(state =>
        getCreateGroupResponseFrom(state)
    );

    const onSubmit = event => {
        event.preventDefault();
        const payload = {
            name: groupName
        };

        dispatch(createGroup(payload));

        if (!createGroupResponse.error) {
            history.push(`/groups/${createGroupResponse.groupId}`);
        }
    };

    const onCancel = () => {
        history.push("/groups");
    };

    return (
        <Fragment>
            {createGroupResponse.error
                ? "There was an error creating this group. Please try again."
                : ""}

            <Form.Container onSubmit={onSubmit}>
                <Form.Section>
                    <Form.Section.Content>
                        <Control.TextField
                            value={groupName}
                            placeholder={groupName}
                            onChange={event => setGroupName(event.target.value)}
                        />
                    </Form.Section.Content>
                </Form.Section>
                <Form.Footer>
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
                </Form.Footer>
            </Form.Container>
        </Fragment>
    );
};
