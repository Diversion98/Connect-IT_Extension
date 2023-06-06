$(document).ready(function () {
    $('body').on('click', 'a', function () {
        chrome.tabs.create({ url: $(this).attr('href') });
        return false;
    });

    // Retrieve the stored state and update the toggle switch
    var togglePlanning = document.getElementById("toggle-dagplanning");
    var toggleLogin = document.getElementById("toggle-login");

    // Retrieve the stored state and update the toggle switch
    chrome.storage.local.get({ blockScript: true }, function (settings) {
        togglePlanning.checked = settings.blockScript;
    });

    chrome.storage.local.get({ autoLogin: false }, function (settings) {
        toggleLogin.checked = settings.autoLogin;
    });

    togglePlanning.addEventListener("change", function () {
        var blockScript = togglePlanning.checked;

        // Store the state in extension storage and reload tab if the website is open
        chrome.storage.local.set({ blockScript: blockScript }, function () {
            chrome.runtime.sendMessage({ reloadPlanningTab: true });
        });
    });

    toggleLogin.addEventListener("change", function () {
        var autoLogin = toggleLogin.checked;

        // Store the state in extension storage
        chrome.storage.local.set({ autoLogin: autoLogin }, function () {
            chrome.runtime.sendMessage({ reloadLoginTab: true });
        });
    });
});