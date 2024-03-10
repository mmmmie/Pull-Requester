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
                ).then(data => {
                    const url = request.url;
                    const owner = url.split('/')[1];
                    const repo = url.split('/')[2];
                    const base_head = url.split('/')[4];
                    const base = base_head.split('...')[0];
                    const head = base_head.split('...')[1];
                    const token = data.access_token;
                    ///////////////////////////////// generate
                    // console.log('Owner: ' + owner);
                    // console.log('Repo: ' + repo);
                    // console.log('Base: ' + base);
                    // console.log('Head: ' + head);
                    // console.log('Token: ' + token);
                    generatePullRequest(owner, repo, base, head, token)
                        .then(res => console.log(res));
                })
                    .catch(error => console.error('Error:', error));
            });
        }
    }
)
;

