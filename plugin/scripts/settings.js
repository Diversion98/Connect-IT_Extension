$(document).ready(function () {
    // Fetch version
    var manifestData = chrome.runtime.getManifest();
    document.getElementById('Plugin_version').textContent = 'V' + manifestData.version;

    // Store the user input
    var wcUname = document.getElementById("wc_uname");
    var wcPass = document.getElementById("wc_pass");

    // Retrieve the stored data and update the input fields
    chrome.storage.sync.get({ autoLogin: false, inputData: {} }, function (settings) {
        wcUname.value = settings.inputData.wcUname;
        wcPass.value = settings.inputData.wcPass;
    });

    wcUname.addEventListener("input", function () {
        var wcUnameValue = wcUname.value;

        // Store the wcUname value in extension storage
        chrome.storage.sync.get({ inputData: {} }, function (data) {
            var inputData = data.inputData || {};
            inputData.wcUname = wcUnameValue;
            chrome.storage.sync.set({ inputData: inputData });
        });
    });

    wcPass.addEventListener("input", function () {
        var wcPassValue = wcPass.value;

        // Store the wcPass value in extension storage
        chrome.storage.sync.get({ inputData: {} }, function (data) {
            var inputData = data.inputData || {};
            inputData.wcPass = wcPassValue;
            chrome.storage.sync.set({ inputData: inputData });
        });
    });
});