import { StrictMode } from "react";
import "flowbite";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Tokencontextprovider from "./Tokencontext/Tokencontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Tokencontextprovider>
      <App />
    </Tokencontextprovider>
  </StrictMode>
);
