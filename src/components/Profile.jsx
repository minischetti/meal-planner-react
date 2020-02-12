import * as React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { store, firebase, ACTION, StateProvider } from "../store";

export function Profile() {
    const { register, handleSubmit, errors } = useForm();
    const [user, initialising, error] = useAuthState(firebase.auth());
    const globalState = React.useContext(store);

    console.log("globalState/profile", globalState.profile);

    return (
        <div>Profile</div>
    )

    // if (globalState.waiting) {
    //     return (
    //         <div>
    //             <p>Loading...</p>
    //         </div>
    //     );
    // }
    // if (error || errors) {
    //     console.log({ error, errors });
    // }
    // if (user) {
    //     return (
    //         <div>
    //             <span>{user.email}</span>
    //             <button onClick={logout}>Log out</button>
    //         </div>
    //     );
    // }
};