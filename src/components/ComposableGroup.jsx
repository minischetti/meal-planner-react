import React, { useState } from "react";
import { Form, Control } from "../components";

export const ComposableGroup = () => {
    const [groupName, setGroupName] = useState();
    return (
        <Form.Container>
            <Form.Section>
                <Form.SectionContent>
                    <Control.TextField
                        value={groupName}
                        placeholder={groupName}
                        onChange={event => setGroupName(event.target.value)}
                    />
                </Form.SectionContent>
            </Form.Section>
            <Form.Footer>
                <Control.Button
                    color={Control.BUTTON_COLOR.BLUE}
                    onClick={onCancel}
                >
                    Cancel
                    <ion-icon name="arrow-back-outline" />
                </Control.Button>
                <Control.Button
                    type={Control.BUTTON_TYPE.SUBMIT}
                    color={Control.BUTTON_COLOR.GREEN}
                >
                    Save
                    <ion-icon name="save-outline" />
                </Control.Button>
            </Form.Footer>
        </Form.Container>
    );
};
