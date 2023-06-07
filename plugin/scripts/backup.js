window.addEventListener("message", function (event) {
    // We only accept messages from https://webclient.unit-t.eu
    if (event.origin !== "https://webclient.unit-t.eu") return;

    //clear and set extension storage
    var planning = JSON.parse(localStorage.getItem('planning'));
    chrome.storage.local.clear();
    chrome.storage.local.set({planning: planning});
});

if (window.location.protocol === 'chrome-extension:' && window.location.pathname.endsWith('/html/dayplanning.html')) {
    window.onload = () => {
        chrome.storage.local.get('planning', function (result) {
            var task = result.planning;
            var time = task[0].savetime;

            if (task && task.length > 0) {
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
            }
        });
    };
}