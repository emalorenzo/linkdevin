// Function called when a new message is received
const messagesListener = async (
  msg: { type: "TAB_ACTIVATED" | "GET_DOM" | "URL_CHANGED" },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
) => {
  console.log("Received message: " + msg.type);

  let response = null;
  switch (msg.type) {
    case "TAB_ACTIVATED": {
      response = await handleQuickReply();
      break;
    }
    case "URL_CHANGED": {
      response = await handleQuickReply();
      break;
    }
    case "GET_DOM": {
      response = await handleQuickReply();
      break;
    }
    default:
      console.log("Unknown message type: " + msg.type);
  }

  sendResponse(response);
};

const waitForDOM = async () => {
  // this is a hack to wait for the DOM to be loaded
  // DOMContentLoaded was not being fired and got lazy to debug
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
};

const createQuickReplyButton = (title: string, message: string) => {
  const buttonText = document.createElement("span");
  buttonText.setAttribute("class", "ml2 mr3");
  buttonText.innerText = title;

  // Button
  const button = document.createElement("button");
  button.setAttribute(
    "class",
    "conversations-quick-replies__reply-button artdeco-button artdeco-button--2 artdeco-button--secondary p0"
  );

  button.setAttribute("type", "button");
  button.appendChild(buttonText);

  const buttonContainer = document.createElement("li");
  buttonContainer.setAttribute(
    "class",
    "ml5 mb2 mt2 conversations-quick-replies__reply"
  );

  buttonContainer.style.listStyle = "none";
  buttonContainer.appendChild(button);

  return buttonContainer;
};

const handleQuickReply = async () => {
  // wait for original quick reply buttons to be loaded
  await waitForDOM();

  // remove original quick reply buttons
  const quickReplies = document.querySelector(
    ".conversations-quick-replies__container"
  ) as HTMLElement;
  const quickRepliesMore = document.querySelector(
    ".msg-s-message-list__quick-replies-container"
  ) as HTMLElement;

  if (quickReplies) {
    quickReplies.remove();
  }
  if (quickRepliesMore) {
    quickRepliesMore.remove();
  }

  const button = createQuickReplyButton("hola", "contenido");

  // add custom quick reply buttons to the DOM
  const chat = document.querySelector(".msg-thread.msg-thread--pillar");
  const formContainer = document.querySelector("form");
  if (chat) {
    chat.insertBefore(button, formContainer);
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesListener);

// console.log("[content.js]. Message rexx", msg);

// const names = Array.from(document.querySelectorAll(NAMES_SELECTOR)).map((e) =>
//   e.textContent
//     ? e.textContent.replace(/[\u{0080}-\u{FFFF}]/gu, "").trim()
//     : ""
// );

// const images = Array.from(document.querySelectorAll(IMGS_SELECTOR)).map(
//   (e) => e.getAttribute("src") || ""
// );

// const texts = Array.from(document.querySelectorAll(MESSAGES_SELECTOR)).map(
//   (e) => (e.textContent ? e.textContent.replaceAll("\n", "").trim() : "")
// );

// const messages: Message[] = texts.map((text, i) => ({
//   name: names[i],
//   image: images[i],
//   text,
// }));

// const textboxContainer = document.querySelector(
//   '[role="textbox"]'
// ) as HTMLElement;

// const placeholder = document.querySelector(
//   ".msg-form__placeholder"
// ) as HTMLElement;
// if (placeholder) {
//   placeholder.classList.replace("visible", "hidden");
// }

// if (textboxContainer) {
//   textboxContainer.setAttribute("data-artdeco-is-focused", "true");

//   const textbox = document.querySelector('[role="textbox"] p') as HTMLElement;

//   textbox.focus();
//   textbox.textContent = "hello world2";
// }
