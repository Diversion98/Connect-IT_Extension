chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    $(document).ready(function () {
        if (message.getTaskdetails) {
            var klantid = '';
            document.getElementById("klantid").value = klantid;
        }
    });
});

$(document).ready(function () {
    chrome.storage.local.get({ inputData: {} }, function (data) {
        var techid = data.inputData.techID;
        document.getElementById("techid").value = techid;
    });
});