chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log("fklsdjlfkjakldfjalkjflkd:" + message.url);
        if (message.message === 'start it') {
            console.log(message.url);
            let authorizing = chrome.identity.launchWebAuthFlow({
                url: 'https://github.com/login/oauth/authorize?client_id=5f10afd2b8c4a92d251e&redirect_uri=https://koknoffpbjalhgkpjhjohdhcoenjlnjp.chromiumapp.org/&scope=repo',
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
                    const github_url = message.url;
                    console.log('github_url: ' + github_url);
                    const owner = github_url.split('/')[3];
                    const repo = github_url.split('/')[4];
                    const base_head = github_url.split('/')[6];
                    console.log(base_head)
                    const base = base_head.split('...')[0];
                    const head = base_head.split('...')[1];
                    const token = data.access_token;
                    console.log(owner, repo, base, head, token);
                    ///////////////////////////////// generate
                    // console.log('Owner: ' + owner);
                    // console.log('Repo: ' + repo);
                    // console.log('Base: ' + base);
                    // console.log('Head: ' + head);
                    // console.log('Token: ' + token);
                    /*generatePullRequest(owner, repo, base, head, token)
                        .then(res => console.log(res))
                        .catch(err => console.error(err));*/

                })
                    .catch(error => console.error('Error:', error));
            });
        }
        return true;
    }
)
;

