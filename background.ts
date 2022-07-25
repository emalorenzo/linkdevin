chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.sendMessage(activeInfo.tabId, {
    type: "TAB_ACTIVATED",
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const newUrl = changeInfo.url;
  // like send the new url to contentscripts.js
  if (newUrl?.includes("linkedin.com/messaging")) {
    chrome.tabs.sendMessage(tabId, {
      type: "URL_CHANGED",
      // payload: changeInfo.url // here could be sent a payload
    });
  }
});
