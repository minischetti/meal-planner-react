import * as React from "react";
import * as ReactDOM from "react-dom";

import {Provider} from "react-redux";
import store from "./redux/store";

import {App} from "./components/App";

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));