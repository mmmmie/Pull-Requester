//const github_url = chrome.runtime.getURL('pr_page.html');

function openOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

function startIt() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log("querying tabs");
        console.log(tabs);
        if (tabs.length > 0) {
            console.log(tabs[0].url);
            chrome.runtime.sendMessage('koknoffpbjalhgkpjhjohdhcoenjlnjp', {message: 'start it', url: tabs[0].url})
        } else {
            console.log("no tabs");
        }
    })
}

document.querySelector('#go-to-options').addEventListener('click', openOptions);

document.getElementById('#authenticateButton').addEventListener('click', startIt);