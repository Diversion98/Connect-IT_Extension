//auto login for sfx
$(document).ready(function () {
    chrome.storage.sync.get({ autoLogin: false }, function (settings) {
        console.log(settings.autoLogin);
        if (settings.autoLogin) {
            chrome.storage.sync.get({ inputData: {} }, function (data) {
                var storedData = data.inputData;
                if (Object.keys(storedData).length !== 0) {
                    var username = storedData.wcUname;
                    var password = storedData.wcPass;
                    document.getElementById("UserUsername").value = username;
                    document.getElementById("input-type-password").value = password;
                    var button = document.getElementById("btnLogin");
                    button.click();
                }
            });
        }
    });
});