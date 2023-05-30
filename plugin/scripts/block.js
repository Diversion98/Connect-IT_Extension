chrome.storage.local.get({ blockScript: false }, function (settings) {
    //if (settings.blockScript) {
        blockScriptOnPage();
        chrome.runtime.sendMessage({ blockScript: true });
    //}
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.blockScript) {
        blockScriptOnPage();
    }
});

function blockScriptOnPage() {
    var scriptElements = document.getElementsByTagName("script");
    for (var i = 0; i < scriptElements.length; i++) {
        var scriptElement = scriptElements[i];
        if (scriptElement.src === "https://webclient.unit-t.eu/js/JFS.Components/telenet-layout/tech.js") {
            scriptElement.remove();
        }
    }
}