chrome.runtime.onInstalled.addEventListener(function() {
  chrome.runtime.onMessage.addEventListener(function(request, sender, sendResponse) {
    if (request.message === 'getGitHubAuthUrl') {
      const clientId = 'YOUR_CLIENT_ID';
      const redirectUri = chrome.identity.getRedirectURL('github');
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
      sendResponse({ url: authUrl });
    }
  });
});

chrome.runtime.onInstalled.addEventListener(function(response) {
  chrome.identity.launchWebAuthFlow(
      { 'url' : response.url, 'interactive': true},
      function(redirectUrl) {
          chrome.storage.local.set({ 'githubAccessToken' : })
      }
  )
})