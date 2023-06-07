//reload the tab if the urls are a match
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.reloadPlanningTab) {
        var tabUrls = [
            "https://webclient.unit-t.eu/workorders/index",
            "https://webclient.unit-t.eu/workorders",
            "https://webclient.unit-t.eu/workorders/",
            "https://webclient.unit-t.eu/workorders//"
        ];

        // Reload the tab if any of the URLs match
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (tabUrls.includes(tab.url)) {
                    chrome.tabs.reload(tab.id);
                }
            });
        });
    }

    if (message.reloadLoginTab) {
        var tabUrls = [
            "https://webclient.unit-t.eu/users/login",
            "https://webclient.unit-t.eu/users/login/",
            "https://webclient.unit-t.eu/users/login//"
        ];

        // Reload the tab if any of the URLs match
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (tabUrls.includes(tab.url)) {
                    chrome.tabs.reload(tab.id);
                }
            });
        });
    }

    if (message.reloadWorkorderTab) {
        var tabUrls = [
            "https://webclient.unit-t.eu/workorders/perform/*"
        ];

        // Reload the tab if any of the URLs match
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (tabUrls.includes(tab.url)) {
                    console.log("reload tab");
                    chrome.tabs.reload(tab.id);
                }
            });
        });
    }

    if (message.openSettingsPage) {
        chrome.tabs.create({ url: "html/settings.html" });
    }
});

//block tech script
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.url === "https://webclient.unit-t.eu/js/JFS.Components/telenet-layout/tech.js") {
            return { cancel: true };
        }
    },
    { urls: ["*://webclient.unit-t.eu/*"] },
    ["blocking"]
);