import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Popup from "./Popup";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const root = document.getElementById("root");
const popup = document.getElementById("popup");
if (root) {
  ReactDOM.render(<App />, root);
} else if (popup) {
  ReactDOM.render(<Popup />, popup);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
