import { createContext } from "react";

export const InviteContext = createContext({
    recipients: [],
    groupId: null
});
