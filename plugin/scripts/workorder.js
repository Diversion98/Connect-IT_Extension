$(document).ready(function () {
    var navbar_nav = document.getElementsByClassName('navbar-nav')[0];
    var clientId = $('#WorkorderTicketName').val();
    //var interventionType = $('.element-workorders-details-portlet .row:eq(4) .col-md5 + div:contains("Task Type:")').text().trim();
    //console.log(interventionType);

    //store some data
    //chrome.storage.sync.set({ taskData: autoLogin }, function () {
        //chrome.runtime.sendMessage({ reloadLoginTab: true });
    //});


    //add spot en ants buttons
    $(navbar_nav).append(`
    <div class="go-to-ants" id="antsBtn" style="float: left; margin-left: 10px"><button class="btn orange" style="border: 0px !important; padding: 11px 14px !important;" onclick="window.open(\`http://ants.inet.telenet.be/tools/modems/modemtest#modem=` + clientId + `\`)">Ants</button></div>
    <div class="go-to-spot" id="spotBtn" style="float: left; margin-left: 10px"><button class="btn blue" style="border: 0px !important; padding: 11px 14px !important;" onclick="window.open(\`https://spot.prd.apps.telenet.be/care/customer/` + clientId + `\`)">Spot</button></div>`);

    //open Brasserie and send message for brasserie.js
    document.getElementById("close_workorder_btn").addEventListener("click", function () {
        window.open("https://brasserie-connect-it.be/afmeld-tool-telenet/", "_blank", "noopener");
        //send task data to brasserie
        //chrome.runtime.sendMessage({ getTaskDetails: true });
    });
});