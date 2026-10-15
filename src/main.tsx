import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
}

const root = document.getElementById("root");

if (!root) throw new Error("missing #root element in index.html");

enableMocking().then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
