

// Where our modules wil be stored
window.m = {};

// Window added functions
window.ml = new function () {
    this.itemCallbacks = {};

    /**
     * Checks the URL with the given 'path', and returns if the URL and path match
     * @param {string} path (part of) the url
     * @param {boolean} strict url == path or url.indexOF(path)
     * @returns {boolean} Is the URL
     */
    this.checkURL = function (path, strict = true) {
        var retval = false;

        if (strict)
            retval = location.pathname == path;
        else
            retval = location.pathname.indexOf(path) !== -1;

        return retval;
    };

    // Preparation for the following functions
    this.modules = {};

    /**
     * retrieves a value (async)
     * @param {string} str The parameter to be checked
     * @param {object} callback The callback function to be called when the parameter has updated
     * @param {boolean} liveUpdate Keep running the callback on every update
     */
    this.getItem = function (str, callback, liveUpdate = false) {
        var str_split = str.split('/');
        var refmod = ml.modules;
        var broadcast = false;
        for (var i = 0; i < str_split.length; i++) {
            if (!refmod) {
                broadcast = true;
                break;
            } else if (refmod[str_split[i]] == undefined) {
                broadcast = true;
                break;
            } else {
                refmod = refmod[str_split[i]];
            }
        }
        if (refmod == undefined) broadcast = true;

        if (broadcast) {
            if (callback == null) return null;

            if (ml.itemCallbacks[str] == undefined)
                ml.itemCallbacks[str] = [];

            ml.itemCallbacks[str].push({ liveUpdate: liveUpdate, callback: callback });
        } else {
            if (callback == null) return refmod;
            else callback(refmod)
        }
    };

    /**
     * Updates a value in a shared varsystem
     * @param {string} str The key of the value. Add '/' for subdivision
     * @param {*} val The value that needs to be set
     */
    this.setItem = function (str, val) {
        var str_split = str.split('/');
        var refmod = ml.modules || {};
        var broadcast = false;
        for (var i = 0; i < str_split.length; i++) {
            if (refmod[str_split[i]] == undefined) {
                refmod[str_split[i]] = {};
                broadcast = true;
            }

            if (i == str_split.length - 1)
                refmod[str_split[i]] = val;
            else refmod = refmod[str_split[i]];
        }

        var removelist = [];

        if ((ml.itemCallbacks[str] !== undefined) && (broadcast)) {
            for (var i = 0; i < ml.itemCallbacks[str].length; i++) {
                ml.itemCallbacks[str][i].callback(val);
                if (!ml.itemCallbacks[str][i].liveUpdate) {
                    //removelist.push(ml.itemCallbacks[str][i]);
                    ml.itemCallbacks[str].splice(i, 1);
                    i--;
                }
            }
        }

        for (var i = removelist.length - 1; i >= 0; i--) {
            ml.itemCallbacks[str]
        }
    };

    /**
     * Wait for an element to be loaded
     * @param {string} query CSS-style query
     * @param {object} callback The function that runs when an element is found.
     * @param {integer} interval The ticking time of the check
     */
    this.waitOn = function (query, callback, interval = 100) {
        var int = setInterval(function () {
            var el = document.querySelector(query);
            if (el) {
                callback(el);
                clearInterval(int);
            }
        }, interval);
    };

    /**
     * does a fetch with the given params
     * @param {string} type GET/POST/...
     * @param {string} url URL of the request
     * @param {object} fnDone Function to be ran after the request finished
     * @param {object} headers any headers that need to be present with the request
     */
    function Fetch(type, url, fnDone, headers = {}) {
        function loadOK(res) {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res;
        }

        fetch(url, {
            "headers": headers,
            "referrer": "",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": type.toUpperCase(),
            "mode": "cors",
            "credentials": "include"
        }).then(loadOK).then((response) => {
            return response.json();
        }).then(fnDone).catch((e) => {

        });
    };

    /**
     * Performs a GET on the given URL
     * @param {string} url The URL of the request
     * @param {object} headers Any headers that need to be sent along the request
     * @param {object} fnDone Function to run when the request finishes
     */
    this.get = function (url, headers = {}, fnDone) {
        Fetch('get', url, fnDone, headers);
    };

    // vars
    this.getVar = function (key) {
        var item = localStorage.getItem('sh_' + key);
        try {
            item = JSON.parse(item);
        } catch (e) { }
        return item;
    };

    this.setVar = function (key, value) {
        if (typeof value === 'object') value = JSON.stringify(value);
        localStorage.setItem('sh_' + key, value);
    };
};

function styling() {
    // Styling
    if (ml.checkURL('/workorders') || ml.checkURL('/workorders/index', false) || ml.checkURL('workorders/perform', false) || ml.checkURL('/workorders/') || ml.checkURL('/workorders//', false)) {
        try {
            let style = document.createElement('style');
            style.textContent = `
                    .page-content { background-color: rgb(238, 240, 248); }
                    .header { background-color: rgb(30, 30, 45); }
                    .page-container { background-color: rgb(30, 30, 45); }
                    .page-sidebar-menu > li { background-color: rgb(30, 30, 45); }
                    .page-sidebar { background-color: rgb(30, 30, 45); }
                    body { background-color: rgb(30, 30, 45); }
                    .portlet.box.green { border: none; }
                    .page-sidebar { position: fixed; z-index: 99999; }
                `;
            document.body.appendChild(style);
        } catch (e) {
        }
    }

    if (ml.checkURL('/workorders') || ml.checkURL('/workorders/index', false) || ml.checkURL('/workorders/') || ml.checkURL('/workorders//', false)) {
        try {
            let style = document.createElement('style');

            style.textContent = `
                    .row { max-width: 1340px; margin: 0 auto; }
                    .portlet.box.green { background-color: transparent !important; }
                    .portlet.box.green > .portlet-title { background-color: transparent !important; }
                    .portlet.box.green > .portlet-title > .caption { color: rgb(70, 78, 95); margin-left: 14px; }
                    .page-conten. { font-family: Poppins, Helvetica, "sans-serif"; }
                    .portlet.box > .portlet-body { background-color: transparent; padding: 0px; }
                    .btn { border-radius: 6px !important; }
                    .task_fdate { color:red; font-weight: bold; }
                `;
            document.body.appendChild(style);

            //document.querySelector('.map-wrap').remove();
            //document.querySelector('.page-toolbar > .btn-group > .dropdown-toggle').remove();
            document.querySelector('#spare-parts-list-trigger').style.marginRight = '5px';
        } catch (e) {
        }
    }

    // Workorder screen
    if (ml.checkURL('workorders/perform', false)) {
        try {
            let style = document.createElement('style');

            style.textContent = `
                    .portlet.box.grey > .portlet-title { background-color: transparent; }
                    
                    .portlet.box.grey {
                        background-color: white !important;
                        border-radius: 0.42rem !important;
                        border: none;
                    }

                    .portlet.grey > .portlet-title > .caption {
                        color: #212121;
                    }
                    
                    .portlet.box.grey > .portlet-title {
                        border-bottom: 1px solid rgb(236, 240, 243);
                        padding-top: 8px;
                        padding-left: 20px;
                    }

                    .portlet.box.grey > .portlet-title > .tools > a { filter: invert(100%); -webkit-filter: invert(100%); }
                `;
            document.body.appendChild(style);
        } catch (e) {
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    styling();

    const tasks = document.getElementsByClassName('task-item');

    //save planning
    savePlanning(tasks);

    // Creating styling
    let st = document.createElement('style');
    st.textContent = '.sh_task-item {min-height:160px;position:relative;padding:0px;background:transparent;border:none;}'
        + '.task_tbl {color:black;}'
        + '.btn_action {width:100%;position:absolute;position:absolute;}'
        + '.nav_btn {text-align:center;line-height:40px;border-radius:12px !important;border:1px solid rgb(90,90,90);width:40px;height:40px;background:rgb(140,140,140);cursor:pointer;margin:5px;display:inline-block;}'
        + '.nav_btn img {height:30px;}'
        + '.nav_btn:hover {background:rgb(200,200,255);}'
        + '.test_btn {text-align:center;line-height:40px;border-radius:12px !important;border:1px solid rgb(90,90,90);width:40px;height:40px;background:rgb(140,140,140);cursor:pointer;margin:5px;display:inline-block;}'
        + '.test_btn img {height:30px;}'
        + '.test_btn:hover {background:rgb(200,200,255);}'
        + '.nav_qr {width:200px;height:200px;background:rgb(244,244,244);position:absolute;padding:10px;border:1px solid black;z-index: 9999;}'
        + '.nav_qr img {width:100%;height:100%;}'
        + '.nav_odltime {margin-left:20px;}'
        + '.nav_odltime i {font-size:20px;}'
        + '.odlDriveTime {margin-left:5px;}'
        + ''
        + ''
        + ''
        + ''
        + '';
    document.body.appendChild(st);

    document.getElementById('workorder-list')?.children[0].remove(); // Remove the header for today's meetings
    document.getElementById('future-workorder-list')?.children[0].remove(); // Remove the header for future meetings

    window.onload = () => {
        var task_cnt = 0;

        for (let i = 0; i < tasks.length; i++) {
            let clientId = tasks[i].getElementsByClassName('ticket-name-data')[0].textContent.split(' - ')[0].trim();
            let future_date = '';

            let task = i;

            if (!tasks[i].closest('#future-workorder-list-wrapper')) task_cnt++;
            else future_date = tasks[i].querySelector('.date').innerHTML.split('<br>')[1].trim();
            let tgcode = tasks[i].getElementsByClassName('arrow-container')[0].getAttribute('data-task-id');
            tasks[i].setAttribute('class', tasks[i].getAttribute('class') + ' sh_task-item');

            let html = ``;

            // Getting a hold on all the elements needed
            let logo = tasks[i].getElementsByTagName('label')[0];
            let ticket = tasks[i].getElementsByClassName('ticket-name-data')[0];
            let date = tasks[i].getElementsByClassName('date')[0];
            let time = tasks[i].getElementsByClassName('time')[0];
            let customerName = ticket.parentElement.parentElement.children[2];
            let address = ticket.parentElement.parentElement.children[3];
            let workorder_action = null;
            if (tasks[i].getElementsByClassName('open-workorder').length > 0) workorder_action = tasks[i].getElementsByClassName('open-workorder')[0];
            else if (tasks[i].getElementsByClassName('start-workorder').length > 0) workorder_action = tasks[i].getElementsByClassName('start-workorder')[0];
            else if (tasks[i].getElementsByClassName('updateworkorder').length > 0) workorder_action = tasks[i].getElementsByClassName('updateworkorder')[0];
            else {
                let el = document.createElement('a');
                el.setAttribute('style', 'border:1px solid red;border-radius:4px !important;color:red;font-weight:bold;');
                el.setAttribute('class', 'btn white primary-action-button');
                el.setAttribute('href', 'Javascript:void(0)');
            }

            //hide old dayplanning style
            for (let j = 0; j < tasks[i].children.length; j++) {
                tasks[i].children[j].style.display = 'none';
            }

            // Create the new layout
            let el = document.createElement('div');
            el.setAttribute('tgcode', tgcode);
            el.setAttribute('style', 'width:100%;height:100%;border:none;border-radius:10px !important;background:white;min-height:160px;');
            html = `<div style="border-right:2px solid rgb(105,105,105);width:140px;height:calc(100% - 20px);position:absolute;top:10px;left:0px;text-align:center;color:black;">
                <div class="logo_cont" style="width:100%;height:calc(100% - 40px);"></div>
                <div class="time_cont" style="width:100%;height:40px;position:absolute;bottom:10px;left:0px;border-top:2px solid rgb(105,105,105);text-align:center;line-height:16px;color:black;"></div></div>
                        
                <div style="position:relative;top:0px;left:140px;width:calc(100% - 150px);padding:10px;"><table class="task_tbl" style="width:calc(100% - 230px);"><tbody>`;

            if (future_date != '') html += `<tr><th style="width:160px;">Date</th><td class="task_fdate">` + future_date + `</td></tr>`;
            html += `<tr><th style="width:160px;">Customer</th><td class="task_cust"></td></tr>`;

            html += '<tr><th>Contact</th><td class="task_contact"></td></tr>';
            html += '<tr style="height:20px;"><th></th><td></td></tr>';
            html += '<tr><th>Address</th><td class="task_address"></td></tr>';
            html += '<tr><th>Town</th><td class="task_town"></td></tr>';

            html += `<tr><td colspan=4 class="task_nav">`;

            if (task == 0) {
                html += `
                            <div class="nav_btn"><img src="` + icons.gmaps + `"></img>
                            <div class="nav_qr" style="display:none;" id="link_gmaps"></div></div>
                            <div class="nav_btn"><img src="` + icons.waze + `"></img>
                            <div class="nav_qr" style="display:none;" id="link_waze"></div></div>`;
            }

            //add ants en spot knoppen
            html += `<div class="test_btn" id="antsBtn"><p onclick="window.open(\`http://ants.inet.telenet.be/tools/modems/modemtest#modem=` + clientId + `\`)">A</p></div>
                            <div class="test_btn" id="spotBtn"><p onclick="window.open(\`https://spot.prd.apps.telenet.be/care/customer/` + clientId + `\`)">S</p></div>
                            </div></td></tr>`;

            html += `
                    <tr><th>Meeting type</th><td class="task_meetingtype"></td></tr>`;
            html += `<tr><th colspan=2>Remark</th></tr>
                    <tr><td colspan=2 class="task_remark"><textarea disabled style="min-width:calc(100% - 10px);min-height:60px;cursor:default;"></textarea></td></tr>`;

            html += `</tbody></table>
                    <div class="task_btns" style="position:absolute;top:0px;right:10px;width:220px;height:calc(100% - 10px);">`;
            if (task == 0) html += '<a href="#" class="task_btnMoreInfo btn primary-action-button btn_action" style="background:rgb(155,155,155);margin-top:10px;color:white;">More info</a>';
            `</div></div>`;

            el.innerHTML = html;

            tasks[i].appendChild(el);
            tasks[i].getElementsByClassName('logo_cont')[0].appendChild(logo);
            tasks[i].getElementsByClassName('time_cont')[0].appendChild(time);
            tasks[i].getElementsByClassName('task_cust')[0].textContent = customerName.textContent;
            tasks[i].getElementsByClassName('task_town')[0].textContent = address.textContent.split(',')[1].trim();
            tasks[i].getElementsByClassName('task_meetingtype')[0].textContent = date.firstChild.textContent.trim();
            tasks[i].getElementsByClassName('task_contact')[0].textContent = 'Loading...';
            let ticketid = tasks[i].querySelector('a[data-target^="#modal_contactdetails_uniqueid_"]').getAttribute('data-ticket-details');
            ml.get('/tasks/contactDetails/' + tgcode + '/' + ticketid + '/2?_=' + Date.now(), {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "nl-NL,nl;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
                function (json) {
                    let contact = '';
                    if (json[Object.keys(json)[0]].length !== 0) contact = json[Object.keys(json)[0]][0].value;
                    document.querySelector('div[tgcode="' + Object.keys(json)[0] + '"]').getElementsByClassName('task_contact')[0].textContent = contact;
                });
            tasks[i].getElementsByClassName('task_address')[0].textContent = address.textContent.split(',')[0].trim();

            // Getting remark info
            ml.get("/tasks/extraInfo/" + tgcode + "?_=" + Date.now(), {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "nl-NL,nl;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
                function (json) {
                    // Remarks time!
                    let tgei = json[0].taskGrpExtraInfo[0];
                    let remarkval = '';
                    for (let j = 0; j < tgei.length; j++) {
                        if (tgei[j].name == 'remark') {
                            remarkval = tgei[j].value;
                            break;
                        }
                    }

                    let tei = json[0].taskExtraInfo[0];
                    let planning_remarkval = '';
                    for (let j = 0; j < tei.length; j++) {
                        if (tei[j].name == 'remark') {
                            planning_remarkval = tei[j].value;
                            break;
                        }
                    }

                    let remark = '';
                    if (planning_remarkval.length > 0) {
                        remark += 'UNIT-T: ' + planning_remarkval;
                        if (remarkval.length > 0) remark += '\n\nTELENET: ' + remarkval;
                    } else remark = remarkval;

                    document.querySelector('div[tgcode="' + json[0].id + '"]').getElementsByClassName('task_remark')[0].children[0].textContent = remark;
                });

            if (workorder_action) {
                workorder_action.setAttribute('class', workorder_action.getAttribute('class') + ' btn_action');
                workorder_action.setAttribute('style', 'bottom:0px;');
                tasks[i].getElementsByClassName('task_btns')[0].appendChild(workorder_action);
            }

            // Generate QR urls
            let qrSettings = {
                text: '',
                width: 200,
                height: 200,
                correctLevel: QRCode.CorrectLevel.H
            };

            for (let j = 0; j < tasks[i].getElementsByClassName('nav_btn').length; j++) {
                tasks[i].getElementsByClassName('nav_btn')[j].addEventListener('click', function () {
                    if (this.getElementsByClassName('nav_qr')[0].style.display == 'none')
                        this.getElementsByClassName('nav_qr')[0].style.display = 'block';
                    else
                        this.getElementsByClassName('nav_qr')[0].style.display = 'none';
                });
            }

            let all = address.textContent.split(',')[0].trim() + ' ' + address.textContent.split(',')[1].trim();
            let URLAddress = encodeURI(all.replace(/\s+/g, ' ').trim());

            qrSettings.text = 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=' + URLAddress;
            new QRCode(document.getElementById('link_gmaps'), qrSettings);
            document.getElementById('link_gmaps').removeAttribute('title');

            qrSettings.text = 'https://www.waze.com/ul?navigate=yes&q=' + URLAddress;
            new QRCode(document.getElementById('link_waze'), qrSettings);
            document.getElementById('link_waze').removeAttribute('title');

            tasks[i].closest('.col-md-12').removeAttribute('style');

            // Getting additional info
            // Remarks (we'll use this button to call the popup)
            let as = tasks[i].getElementsByTagName('a');
            let btnRemark = null;
            let btnContact = null
            for (let j = 0; j < as.length; j++) {
                if (as[j].getAttribute('data-target')) {
                    if (as[j].getAttribute('data-target').indexOf('#modal_remark_uniqueid_') != -1) btnRemark = as[j];
                    if (as[j].getAttribute('data-target').indexOf('#modal_contactdetails_uniqueid') != -1) btnContact = as[j];
                }
            }
            // Move the button
            let data_task_id = 0;
            if (btnRemark) {
                tasks[i].getElementsByClassName('task_btns')[0].appendChild(btnRemark);
                btnRemark.setAttribute('class', btnRemark.getAttribute('class').split('blue').join('') + ' primary-action-button btn_action');
                btnRemark.setAttribute('style', 'background:rgb(155,155,155);margin-top:10px;color:white;');
                btnRemark.textContent = 'More info';
                data_task_id = btnContact.getAttribute('data-task-id');
                data_ticket_details = btnContact.getAttribute('data-ticket-details');
            }


            // Taking over the popup
            document.getElementById('modal_remark_uniqueid_' + data_task_id).getElementsByClassName('modal-title')[0].textContent = '🐼 More info';
            let entity = tasks[i].getElementsByClassName('ticket-name-data')[0].textContent.split(' - ')[0].trim();
            let tgid = tasks[i].getElementsByClassName('ticket-name-data')[0].textContent.split(' - ')[1].trim();

            document.getElementById('modal_remark_uniqueid_' + data_task_id).getElementsByClassName('modal-body')[0].innerHTML +=
                '<div class="row xtra_entity"><div class=" col-md-5" data-translatable="">Entity:</div><div class=" col-md-7"><i>' + entity + '</i></div></div>' +
                '<div class="row xtra_tgid"><div class=" col-md-5" data-translatable="">Taskgroup ID:</div><div class=" col-md-7"><i>' + tgid + '</i></div></div>';
        }
    };
});

//Save Planning
function savePlanning(tasks) {
    var planning = [];

    //clear backup planning
    localStorage.removeItem('planning');

    console.log("saving task to local storage...");
    var today = new Date();
    var time = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " // " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    function fetchContactDetails(tgcode, ticketid) {
        return new Promise((resolve, reject) => {
            ml.get('/tasks/contactDetails/' + tgcode + '/' + ticketid + '/2?_=' + Date.now(), {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "nl-NL,nl;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            }, function (json) {
                let contact = '';
                if (json[Object.keys(json)[0]].length !== 0) {
                    contact = json[Object.keys(json)[0]][0].value;
                }
                resolve(contact);
            });
        });
    }

    async function fetchTasksData() {
        for (let i = 0; i < tasks.length; i++) {
            var item = {};
            let tgcode = tasks[i].getElementsByClassName('arrow-container')[0].getAttribute('data-task-id');

            item.savetime = time;
            item.customerNumber = tasks[i].getElementsByClassName('ticket-name-data')[0].textContent.split(' - ')[0].trim();
            item.date = tasks[i].getElementsByClassName('date')[0].lastChild.textContent.trim();
            item.time = tasks[i].getElementsByClassName('time')[0].textContent.trim();
            item.customerName = tasks[i].getElementsByClassName('ticket-name-data')[0].parentElement.parentElement.children[2].textContent.trim();
            item.address = tasks[i].getElementsByClassName('ticket-name-data')[0].parentElement.parentElement.children[3].textContent.trim();
            item.meetingtype = tasks[i].getElementsByClassName('date')[0].firstChild.textContent.trim();

            let ticketid = tasks[i].querySelector('a[data-target^="#modal_contactdetails_uniqueid_"]').getAttribute('data-ticket-details');
            let contact = await fetchContactDetails(tgcode, ticketid);
            item.contact = contact;

            planning.push(item);
        }

        localStorage.setItem('planning', JSON.stringify(planning));
        window.postMessage(JSON.parse(localStorage.getItem('planning')), '*');
    }

    fetchTasksData();
}
