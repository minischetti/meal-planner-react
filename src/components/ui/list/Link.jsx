import { Control, List } from "../../../components";

export const Link = ({ to, children }) => {
    return (
        <Control.LinkWrapper to={to}>
            <List.Item>{children}</List.Item>
        </Control.LinkWrapper>
    );
};
