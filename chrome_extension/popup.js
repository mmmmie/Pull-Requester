const github_url = window.location.pathname;

document.querySelector('#go-to-options').addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.getElementById('authenticateButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({message: 'start it', url: github_url});
});