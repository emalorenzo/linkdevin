import { DOMMessage, DOMMessageResponse } from "../types";

const MESSAGES_SELECTOR =
  ".msg-conversations-container__conversations-list li span.msg-conversation-card__message-snippet-body";

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  // eslint-disable-next-line no-unused-vars
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log("[content.js]. Message received", msg);

  const messages = Array.from(document.querySelectorAll(MESSAGES_SELECTOR))
    .map((e) =>
      e.textContent
        ? e.textContent
            .replaceAll("\n", "")
            .replace(/[\u{0080}-\u{FFFF}]/gu, "")
            .trim()
        : ""
    )
    .filter((e) => !!e);

  // Prepare the response object with information about the site
  const response: DOMMessageResponse = {
    messages,
  };

  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
