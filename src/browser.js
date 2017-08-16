import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import App from "./App";

import configureStore from './store';
const store = configureStore(window.__initialState);
delete window.__initialState;

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
