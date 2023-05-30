//auto login for sfx
var count = 0;

$(document).ready(function () {
    chrome.storage.local.get({ inputData: {} }, function (data) {
        var storedData = data.inputData;
        if (Object.keys(storedData).length !== 0) {
            var username = storedData.wcUname;
            var password = storedData.wcPass;
            document.getElementById("UserUsername").value = username;
            document.getElementById("input-type-password").value = password;
            var button = document.getElementById("btnLogin");
            button.click();
            count++;
        }
    });
});