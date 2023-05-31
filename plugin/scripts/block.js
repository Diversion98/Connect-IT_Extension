const nullthrows = (v) => {
    if (v == null) throw new Error("it's a null");
    return v;
}

function injectCode(src) {
    const script = document.createElement('script');
    // This is why it works!
    script.src = src;
    script.onload = function () {
        this.remove();
    };

    // This script runs before the <head> element is created,
    // so we add the script to <html> instead.
    nullthrows(document.head || document.documentElement).appendChild(script);
}

if (window.location.href === "https://webclient.unit-t.eu/workorders/index" || window.location.href === "https://webclient.unit-t.eu/workorders") {
    chrome.storage.local.get({ blockScript: false }, function (settings) {
        if (settings.blockScript) {
            injectCode(chrome.runtime.getURL('scripts/dagplanning.js'));
        }
    });
}



