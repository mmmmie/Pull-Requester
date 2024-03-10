const formatData = (data) => {
    let files = data.files;
    // console.log(files);
    let fileData = files.filter(file => !file.filename.includes('test')).map(file => {
        return {
            filename: file.filename,
            status: file.status,
            patch: file.patch
        }
    });
    let diff_string = '';
    fileData.forEach(file => {
        diff_string += `Filename: ${file.filename}\nStatus: ${file.status}\nPatch: ${file.patch}\n\n`;
    });
    //console.log(diff_string);
    console.log("typeof fetchBranchDiff return is: " + typeof diff_string);
    return diff_string;
}

const fetchBranchDiff = async (owner, repo, base, head, token) => {
    try {

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        }
        const url = `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        const responseData = await response.json();
        console.log(responseData);
        return formatData(responseData);
    } catch (error) {
        console.error('Error fetching branch diff:', error.message);
        throw error;
    }
}

const vs_url = "https://api.vectorshift.ai/api/pipelines/run";
const headers = {
    "Public-Key": "be3L3F1W_Yogqab-EdiRYq0VBQPcAhTxw9waGP5SZEE",
    "Private-Key": "QBtTGoNgQz7DY5gKBBzX4D5xFoxCE8p17RNz_BELNew",
    "Content-Type": "application/json",
    'mode': 'no-cors'
};

async function generatePullRequest(owner, repo, base, head, token) {
    const diff = await fetchBranchDiff(owner, repo, base, head, token);

    const body = {
        inputs: JSON.stringify({diff: `"${diff}"`}),
        pipeline_name: "Pull Request Generator",
        username: "fetusslave",
    };

    const response = await fetch(vs_url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    const responseData = await response.json();
    return responseData.output_1;
}

function triggerUpdatePRDescription(data) {
    console.log("trying to trigger pr description update");

}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message.action === 'fetchBranchDiff') {
        const url = message.url;
        chrome.identity.launchWebAuthFlow({
            url: 'https://github.com/login/oauth/authorize?client_id=5f10afd2b8c4a92d251e&redirect_uri=https://koknoffpbjalhgkpjhjohdhcoenjlnjp.chromiumapp.org/&scope=repo',
            interactive: true
        }, function (redirect_url) {
            let code = redirect_url.split('code=')[1];
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
            }).then(data => data.access_token)
                .then(token => {
                    const github_url = message.url;
                    const owner = github_url.split('/')[3];
                    const repo = github_url.split('/')[4];
                    const base_head = github_url.split('/')[6];
                    const base = base_head.split('...')[0];
                    const head = base_head.split('...')[1];
                    console.log(github_url, owner, repo, base, head, token);
                    const data2 = {
                        owner: owner,
                        repo: repo,
                        base: base,
                        head: head,
                        token: token
                    };
                    return data2;
                }).then(data => {
                    generatePullRequest(data.owner, data.repo, data.base, data.head, data.token)
                        .then(res => {
                            console.log(res);
                            triggerUpdatePRDescription(res)
                        })
                        .catch(err => console.error(err));
            })
        })
        return true;
    }
    return false;
});
