import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import "@mantine/core/styles.css";
import { setupStore } from "./store/store.ts";
import "./index.css";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    </HashRouter>
  </StrictMode>,
);
