document.getElementById('authoriseButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'getGitHubAuthUrl'}, function(response) {
        chrome.identity.launchWebAuthFlow(
            {'url': response.url, 'interactive': true},
            function(redirectUrl) {
                const code = new URLSearchParams(new URL(redirectUrl).search).get('code');
                chrome.runtime.sendMessage({ message: 'handleGitHubCallback', code: code});
            }
        );
    });
});