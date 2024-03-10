const url = "https://api.vectorshift.ai/api/pipelines/run";
const headers = {
    "Public-Key": "be3L3F1W_Yogqab-EdiRYq0VBQPcAhTxw9waGP5SZEE",
    "Private-Key": "QBtTGoNgQz7DY5gKBBzX4D5xFoxCE8p17RNz_BELNew",
    "Content-Type": "application/json"
};

async function generatePullRequest(owner, repo, base, head, token) {
    const diff = await fetchBranchDiff(owner, repo, base, head, token);

    const body = {
        inputs: JSON.stringify({diff: `"${diff}"`}),
        pipeline_name: "Pull Request Generator",
        username: "fetusslave",
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    const responseData = await response.json();
    return responseData.output_1;
}

// const main = async () => {
//     const owner = 'mmmmie';
//     const repo = 'ScholarPurrgramme';
//     const base = 'd26b50456e2057d338bed443458aaba0eb19e075';
//     const head = '074182432ff0e549d5adc30d444926f9d8f987a0';
//     const TOKEN = "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";
//
//     const data = await generatePullRequest(owner, repo, base, head, TOKEN);
//     console.log(data);
// }
//
// main();

