//Refactored code:
chrome.storage.sync.get({ popup_links: '' }, function (settings) {
    if (settings.popup_links !== '') {
        // Custom links
        console.log('Loading custom links');
        var lines = settings.popup_links.split('\n');
        var links = '<a action="_blank" href="settings/index.html">Settings</a><br><hr>';
        for (var i = 0; i < lines.length; i++) {
            if (lines[i][0] === '-') {
                links += '<hr>';
            } else if (lines[i] !== '' && lines[i].indexOf('$') !== -1) {
                var parts = lines[i].split('$');
                var name = parts[0];
                var url = parts[1];
                var id = '';

                switch (url) {
                    case 'https://cafe.prd.apps.telenet.be/afe/be/telenet/afe/':
                        id = 'a_cafe';
                        break;
                    case 'https://webclient.unit-t.eu/workorders/index':
                        id = 'a_sfx';
                        break;
                    case 'http://ants.inet.telenet.be/':
                        id = 'a_ants';
                        break;
                    case 'http://spot.inet.telenet.be/care/customer':
                        id = 'a_spot';
                        break;
                    case 'https://portalft.prd.apps.telenet.be/content/pmelder.php':
                        id = 'a_pm';
                        break;
                    case 'https://portalft.prd.apps.telenet.be/content/subpages/TechPmc/TConsole.php':
                        id = 'a_notifs';
                        break;
                }

                var classid = id !== '' ? ' class="' + id + '"' : '';

                links += '<a action="_blank"' + classid + ' href="' + url + '">' + name + '</a><br>';
            }
        }

        console.log('Done?');
        $('#links').html(links);
    }
});

$(document).ready(function () {
    $('body').on('click', 'a', function () {
        chrome.tabs.create({ url: $(this).attr('href') });
        return false;
    });

    var togglePlanning = document.getElementById("toggle-dagplanning");
    var toggleLogin = document.getElementById("toggle-login");

    // Retrieve the stored state and update the toggle switch
    chrome.storage.local.get({ blockScript: false }, function (settings) {
        togglePlanning.checked = settings.blockScript;
    });

    chrome.storage.local.get({ autoLogin: false }, function (settings) {
        toggleLogin.checked = settings.autoLogin;
    });

    togglePlanning.addEventListener("change", function () {
        var blockScript = togglePlanning.checked;

        // Store the state in extension storage
        chrome.storage.local.set({ blockScript: blockScript }, function () {
            // Notify the background script about the toggle change
            chrome.runtime.sendMessage({ blockScript: blockScript });
        });
    });

    toggleLogin.addEventListener("change", function () {
        var autoLogin = toggleLogin.checked;

        // Store the state in extension storage
        chrome.storage.local.set({ autoLogin: autoLogin });

        // Notify the background script about the toggle change
        chrome.runtime.sendMessage({ autoLogin: autoLogin });
    });
});


//old code:
/*chrome.storage.sync.get({
    popup_links: ''
}, function (settings) {
    if (settings.popup_links !== '') {
        //Custom links
        console.log('Loading custom links');
        var lines = settings.popup_links.split('\n');
        var links = '<a action="_blank" href="settings/index.html">Settings</a><br><hr>';
        for (var i = 0; i < lines.length; i++) {
            if (lines[i][0] == '-') {
                links += '<hr>';
            } else if ((lines[i] !== '') && (lines[i].indexOf('$') !== -1)) {
                var name = lines[i].split('$')[0];
                var url = lines[i].split('$')[1];
                var id = '';
                if (url.indexOf('https://cafe.prd.apps.telenet.be/afe/be/telenet/afe/') !== -1)
                    id = 'a_cafe';
                else if (url.indexOf('https://webclient.unit-t.eu/workorders/index') !== -1)
                    id = 'a_sfx';
                else if (url.indexOf('http://ants.inet.telenet.be/') !== -1)
                    id = 'a_ants';
                else if (url.indexOf('http://spot.inet.telenet.be/care/customer') !== -1)
                    id = 'a_spot';
                else if (url.indexOf('https://portalft.prd.apps.telenet.be/content/pmelder.php') !== -1)
                    id = 'a_pm';
                else if (url.indexOf('https://portalft.prd.apps.telenet.be/content/subpages/TechPmc/TConsole.php') !== -1)
                    id = 'a_notifs';

                var classid = '';
                if (id !== '')
                    classid = ' class="' + id + '"';

                links += '<a action="_blank"' + classid + ' href="' + url + '">' + name + '</a><br>';
            }
        }

        console.log('Done?');
        $('#links').html('');
        $('#links').html(links);
    }
});

$(document).ready(function () {
    $('body').on('click', 'a', function () {
        chrome.tabs.create({ url: $(this).attr('href') });
        return false;
    });
});

*/