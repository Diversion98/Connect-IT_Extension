window.addEventListener("message", function (event) {
    // We only accept messages from https://webclient.unit-t.eu
    if (event.origin !== "https://webclient.unit-t.eu") return;

    //clear and set extension storage
    var planning = JSON.parse(localStorage.getItem('planning'));
    chrome.storage.sync.clear();
    chrome.storage.sync.set({planning: planning});
});

window.onload = () => {
    //var time = planning.savetime;
    //if (window.location.href === "https://webclient.unit-t.eu/workorders/index") {
        chrome.storage.sync.get('planning', function (result) {
            var task = result.planning;
            var time = task[0].savetime;

            $('#timestamp').text(time);

            var rows = '';
            for (var i = 0; i < task.length; i++) {
                rows += '<tr>';
                rows += '   <td>' + task[i].date + '</td>';
                rows += '   <td>' + task[i].customerNumber + '</td>';
                rows += '   <td>' + task[i].customerName + '</td>';
                rows += '   <td>' + task[i].time + '</td>';
                rows += '   <td>' + task[i].address + '</td>';
                rows += '   <td>' + task[i].meetingtype + '</td>';
                rows += '   <td>' + task[i].contact + '</td>';
                rows += '</tr>';
            }

            $('#tasks').append(rows);
        });
    //}
};