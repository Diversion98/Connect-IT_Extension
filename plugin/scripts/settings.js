if (window.location.href === "chrome-extension://jbkjciamkjjfnalbacdnkifommldfabd/html/settings.html") {
    $(document).ready(function () {
        // Fetch version
        var manifestData = chrome.runtime.getManifest();
        document.getElementById('Plugin_version').textContent = 'V' + manifestData.version;

        // Store the user input
        var wcUname = document.getElementById("wc_uname");
        var wcPass = document.getElementById("wc_pass");
        var techId = document.getElementById("tech_nr");

        // Retrieve the stored data and update the input fields
        chrome.storage.local.get({ autoLogin: false, inputData: {} }, function (settings) {
            wcUname.value = settings.inputData.wcUname;
            wcPass.value = settings.inputData.wcPass;
            techId.value = settings.inputData.techID;
            console.log("retrieved the following information from the local storage:");
            console.log("technummer: " + settings.inputData.techID);
            console.log("username: " + settings.inputData.wcUname);
            console.log("password: " + settings.inputData.wcPass);
        });

        wcUname.addEventListener("input", function () {
            var wcUnameValue = wcUname.value;

            // Store the wcUname value in extension storage
            chrome.storage.local.get({ inputData: {} }, function (data) {
                var inputData = data.inputData;
                inputData.wcUname = wcUnameValue;
                console.log("saving the following information to the local storage:");
                console.log("inputData: " + inputData.wcUname);
                chrome.storage.local.set({ inputData: inputData });
            });
        });

        wcPass.addEventListener("input", function () {
            var wcPassValue = wcPass.value;

            // Store the wcPass value in extension storage
            chrome.storage.local.get({ inputData: {} }, function (data) {
                var inputData = data.inputData;
                inputData.wcPass = wcPassValue;
                console.log("saving the following information to the local storage:");
                console.log("inputData: " + inputData.wcPass);
                chrome.storage.local.set({ inputData: inputData });
            });
        });

        techId.addEventListener("input", function () {
            var techIdValue = techId.value;

            // Store the techId value in extension storage
            chrome.storage.local.get({ inputData: {} }, function (data) {
                var inputData = data.inputData;
                inputData.techID = techIdValue;
                console.log("saving the following information to the local storage:");
                console.log("inputData: " + inputData.techID);
                chrome.storage.local.set({ inputData: inputData });
            });
        });
    });
}