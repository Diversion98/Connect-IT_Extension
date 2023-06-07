$(document).ready(function () {
    // Load settings and handle intervention type
    chrome.storage.local.get({ brasserie: false, inputData: {} }, function (settings) {
        if (settings.brasserie) {
            var storedData = settings.inputData;
            if (Object.keys(storedData).length !== 0) {
                var techid = storedData.techID;
                if (techid !== undefined) {
                    document.getElementById("techid").value = techid;
                } else {
                    alert("Please input Technieker nummer in the settings window of the Connect-It SFX Plugin.");
                    openSettingsPage();
                }
            } else {
                alert("Please input the Technieker nummer in the settings window of the Connect-It SFX Plugin.");
                openSettingsPage();
            }

            chrome.storage.local.get(['taskDetails'], function (result) {
                var taskDetails = result.taskDetails;

                if (taskDetails) {
                    var clientId = taskDetails.clientId;
                    var interventionType = taskDetails.interventionType;
                    var TaskStatus = taskDetails.TaskStatus
                    console.log("Retrieved TaskDetails");

                    // Process the variables or perform any desired actions
                    console.log("Received variables: ");
                    console.log("Client ID: " + clientId);
                    console.log("Intervention Type: " + interventionType);
                    console.log("Task Status: " + TaskStatus);


                    // installatie status knoppen
                    var radioOk = $('input[type="radio"][name="status"][value="1"]:eq(0)');
                    var radioWait = $('input[type="radio"][name="status"][value="1"]:eq(1)');
                    var radioPostpone = $('input[type="radio"][name="status"][value="14"]');

                    // installatie type radio knoppen
                    var radioInstall = document.querySelector('input[type="radio"][name="installatie"][value="1"]');
                    var radioRepair = document.querySelector('input[type="radio"][name="installatie"][value="20"]');

                    document.getElementById("klantid").value = clientId;

                    switch (interventionType.toLowerCase()) {
                        case "install":
                            // Code to handle the "install" intervention type
                            console.log("Handling install intervention...");
                            radioInstall.checked = true;
                            break;

                        case "repair":
                            // Code to handle the "repair" intervention type
                            console.log("Handling repair intervention...");
                            radioRepair.checked = true;
                            break;

                        default:
                            break;
                    }

                    switch (TaskStatus.toLowerCase()) {
                        case "ok":
                            // Code to handle the "install" intervention type
                            console.log("Handling Status OK...");
                            radioOk.prop('checked', true);
                            break;

                        case "wait":
                            // Code to handle the "repair" intervention type
                            console.log("Handling Status Wait...");
                            radioWait.prop('checked', true);
                            break;

                        case "postpone":
                            // Code to handle the "repair" intervention type
                            console.log("Handling Status Postpone...");
                            radioPostpone.prop('checked', true);
                            break;

                        case "cancel":
                            // Code to handle the "repair" intervention type
                            console.log("Handling Status Cancel...");
                            radioPostpone.checked = true;
                            break;

                        default:
                            break;
                    }
                }

                //chrome.storage.local.remove('taskDetails', function () {
                    //console.log('Item "taskDetails" has been removed from local storage.');
                //});
            });
        }
    });
});

function openSettingsPage() {
    chrome.runtime.sendMessage({ openSettingsPage: true });
}
