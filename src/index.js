import React from "react";
import { createRoot } from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS
import "./styles/index.scss";
import App from "./App";

/**
 * This is the entry point of your React application where the root element is in the public/index.html.
 * We call this a “root” DOM node because everything inside it will be managed by React DOM.
 * Applications built with just React usually have a single root DOM node.
 * More: https://react.dev/reference/react-dom/client/createRoot
 */

const container = document.getElementById("app");

const root = createRoot(container); // Use createRoot to create the root element

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
