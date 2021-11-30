import "./App.css";

import { useEffect, useState } from "react";

// import logo from "./logo.svg";
import { DOMMessage, DOMMessageResponse } from "./types";

function App() {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null);
  const [response, setResponse] = useState<DOMMessageResponse | null>(null);

  useEffect(() => {
    const getTab = async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      setTab(tab);
    };
    getTab();
  }, []);

  useEffect(() => {
    window.console.log("");
    if (tab) {
      chrome.tabs.sendMessage(
        // Current tab ID
        tab.id || 0,

        // Message type
        { type: "GET_DOM" } as DOMMessage,

        // Callback executed when the content script sends a response
        (response: DOMMessageResponse) => {
          setResponse(response);
          console.log("frula", response);
        }
      );
    }
  }, [tab]);

  return (
    <div className="container">
      <p>Mensajes pendientes de responder</p>
      <pre>{JSON.stringify(tab, null, 2)}</pre>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default App;
