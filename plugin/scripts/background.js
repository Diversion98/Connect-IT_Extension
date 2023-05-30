chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.action) {
        case "toggleAutoLogin":
            handleAutoLoginToggle(message.autoLogin);
            reloadTab("webclient.unit-t.eu/users/login");
            break;
        case "toggleBlockScript":
            handleBlockScriptToggle(message.blockScript);
            reloadTab("webclient.unit-t.eu/workorders/index");
            break;
        default:
            // Handle other message actions if needed
            break;
    }
});

function handleAutoLoginToggle(autoLogin) {
    if (autoLogin) {
        chrome.webNavigation.onCompleted.addListener(autoLoginOnPage, {
            url: [
                { hostEquals: "webclient.unit-t.eu", pathPrefix: "/users/login" }
            ]
        });
    } else {
        chrome.webNavigation.onCompleted.removeListener(autoLoginOnPage);
    }
}

function handleBlockScriptToggle(blockScript) {
    if (blockScript) {
        chrome.webRequest.onBeforeRequest.addListener(
            blockRequest,
            { urls: ["*://webclient.unit-t.eu/js/JFS.Components/telenet-layout/tech.js"] },
            ["blocking"]
        );
    } else {
        chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
    }
}

function autoLoginOnPage(details) {
    chrome.storage.local.get({ inputData: {} }, function (data) {
        var storedData = data.inputData;
    });
}

function blockRequest(details) {
    return { cancel: true };
}

// Check if the specified tab is open
function isTabOpen(tabUrl) {
    return new Promise(function (resolve) {
        chrome.tabs.query({ url: tabUrl }, function (tabs) {
            resolve(tabs.length > 0);
        });
    });
}
/*
// Reload a specific tab if it is open
async function reloadTab(tabUrl) {
    var isOpen = await isTabOpen(tabUrl);
    if (isOpen) {
        chrome.tabs.query({ url: tabUrl }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
    }
}

// Send message to the dagplanning script with the toggle state of the button
async function sendMessageToContentScript(tabId) {
    var isOpen = await isTabOpen("https://webclient.unit-t.eu/workorders/index");

    // Retrieve the stored state and update the toggle switch
    chrome.storage.local.get({ blockScript: false }, function (settings) {
    
        if (isOpen) {
            chrome.tabs.sendMessage(tabId, { action: "dagplanningState", dagplanningState: settings.blockScript });
        }
    });
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url === "https://webclient.unit-t.eu/workorders/index") {
        sendMessageToContentScript(tabId);
    }
});*/