//const github_url = chrome.runtime.getURL('pr_page.html');

function openOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

function sendDiffMessage() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log("querying tabs");
        console.log(tabs);
        if (tabs.length > 0) {
            console.log(tabs[0].url);
            message(tabs[0].url);
        } else {
            console.log("no tabs");
        }
    })
}

function message(url) {
    chrome.runtime.sendMessage({action: 'fetchBranchDiff', url: url}, (response) => {
        console.log(response);
        // document.getElementById('diff').innerText = response;
    });
}



//document.querySelector('#pr-button').addEventListener('click', openOptions);

console.log(document.getElementById('#pr-button'));

document.getElementById('#pr-button').addEventListener('click', () => {
    console.log("clicked");
    sendDiffMessage();
});
