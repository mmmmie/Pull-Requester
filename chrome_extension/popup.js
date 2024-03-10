document.getElementById('authenticateButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({message: 'start it'});
});