$(document).ready(function () {
    //insert ants en spot button
    var navbar_nav = document.getElementsByClassName('navbar-nav')[0];
    clientId = $('#WorkorderTicketName').val();

    $(navbar_nav).append(`
    <div class="go-to-ants" id="antsBtn" style="float: left; margin-left: 10px"><button class="btn orange" style="border: 0px !important; padding: 11px 14px !important;" onclick="window.open(\`http://ants.inet.telenet.be/tools/modems/modemtest#modem=` + clientId + `\`)">Ants</button></div>
    <div class="go-to-spot" id="spotBtn" style="float: left; margin-left: 10px"><button class="btn blue" style="border: 0px !important; padding: 11px 14px !important;" onclick="window.open(\`https://spot.prd.apps.telenet.be/care/customer/` + clientId + `\`)">Spot</button></div>`);

    document.getElementById("close_workorder_btn").addEventListener("click", function () {
        window.open("https://brasserie-connect-it.be/afmeld-tool-telenet/", "_blank", "noopener");
    });
});