//auto login for sfx
$(document).ready(function () {
    chrome.storage.local.get({ autoLogin: false }, function (settings) {
        if (settings.autoLogin) {
            if (!document.getElementById("toast-container")) {
                chrome.storage.local.get({ inputData: {} }, function (data) {
                    var storedData = data.inputData;
                    if (Object.keys(storedData).length !== 0) {
                        var username = storedData.wcUname;
                        var password = storedData.wcPass;
                        if (username !== undefined && password !== undefined) {
                            document.getElementById("UserUsername").value = username;
                            document.getElementById("input-type-password").value = password;
                            var button = document.getElementById("btnLogin");
                            button.click();
                        }
                        else {
                            alert("Please input the username and password in the settings window of the Connect-It SFX Plugin or turn Auto Login off.");
                            openSettingsPage();
                        }
                    }
                    else {
                        alert("Please input the username and password in the settings window of the Connect-It SFX Plugin or turn Auto Login off.");
                        openSettingsPage();
                    }
                });
            }
            else {
                alert("Please check your username and password in the settings window of the Connect-It SFX Plugin");
                openSettingsPage();
            }
        }
    });
});

function openSettingsPage() {
    chrome.runtime.sendMessage({ openSettingsPage: true });
}