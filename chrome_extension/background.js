chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.message === 'start it') {
            let authorizing = chrome.identity.launchWebAuthFlow({
                url: 'https://github.com/login/oauth/authorize?client_id=5f10afd2b8c4a92d251e&redirect_uri=https://fhpiacpaacbpilfefnajnbdfpindbbpf.chromiumapp.org/&scope=repo',
                interactive: true
            }, function (redirect_url) {
                console.log(redirect_url);
                let code = redirect_url.split('code=')[1];
                console.log(code);

                fetch('https://github.com/login/oauth/access_token?client_id=5f10afd2b8c4a92d251e&client_secret=a88514c938127668965ecb88ee36d97a437c21bd&code=' + code, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    }
                ) // Parse the JSON response
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => console.error('Error:', error));
            });
        }
    }
)
;