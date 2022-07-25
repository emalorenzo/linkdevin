import "./App.css";

import { useEffect, useState } from "react";

// import logo from "./logo.svg";
import { DOMMessage, Message } from "./types";

function App() {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);

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
    if (tab) {
      chrome.tabs.sendMessage(
        // Current tab ID
        tab.id || 0,

        // Message type
        { type: "GET_DOM" } as DOMMessage,

        // Callback executed when the content script sends a response
        (messages: Message[]) => {
          // setMessages(messages);
          console.log("volvio", messages);
        }
      );
    }
  }, [tab]);

  return (
    <div className="container">
      <p>Mensajes pendientes de responder</p>
      {messages && messages.length > 0 && (
        <div>
          {messages.map((message, i) => (
            <pre key={i}>{message.name}</pre>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
