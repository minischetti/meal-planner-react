import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./components/App";
import {StateProvider} from "./store";

const app = (
    <StateProvider>
        <App />
    </StateProvider>
);

ReactDOM.render(app, document.getElementById('app'));