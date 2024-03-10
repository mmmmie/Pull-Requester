/*import { Octokit } from "@octokit/rest";

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
    return diff_string;
};


async function fetchBranchDiff(owner, repo, base, head, token) {
    try {
        const octokit = new Octokit({
            auth: token // Access the token from environment variable
        });
        const response = await octokit.request('GET /repos/{owner}/{repo}/compare/{base}...{head}', {
            owner: owner,
            repo: repo,
            base: base,
            head: head
        });
        return formatData(response.data);
    } catch (error) {
        console.error('Error fetching branch diff:', error.message);
        throw error;
    }
}*/


// testing
// const owner = 'mmmmie';
// const repo = 'ScholarPurrgramme';
// const base = 'd26b50456e2057d338bed443458aaba0eb19e075';
// const head = '074182432ff0e549d5adc30d444926f9d8f987a0';
// const TOKEN = "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";

//fetchBranchDiff(owner, repo, base, head, TOKEN).then(diff => console.log(diff));

//module.exports = fetchBranchDiff;

// console.log(typeof data);