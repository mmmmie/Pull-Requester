// if the user set options yes_button to false, then don't show the button
chrome.storage.sync.get({yes_button: true}, (items) => {
    if (items.yes_button) {
        const descriptionBox = document.getElementById("pull_request_body")
        const github_url = window.location.pathname;

        if (descriptionBox) {
            const githubPRButton = document.querySelector('button.hx_create-pr-button');
            if (githubPRButton) {
                const generate_button = document.createElement('button');
                generate_button.className = "btn-primary btn BtnGroup-item flex-auto";
                generate_button.type = 'button';
                generate_button.textContent = 'Generate PR summary';
                generate_button.style.marginRight = '6px';
                githubPRButton.parentNode.insertBefore(generate_button, githubPRButton.previousSibling);
                generate_button.onclick = function () {
                    console.log("clicked");
                    doIt(github_url);
                }
            }


            // :3 meow meow meow meow meow


            descriptionBox.value = "MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOWMEOW MEOW MEOW MEOW";

        }
    }
});

function doIt(github_url) {
    console.log(github_url);
    chrome.identity.launchWebAuthFlow({
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