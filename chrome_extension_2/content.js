const descriptionBox = document.getElementById("pull_request_body")
const github_url = window.location.pathname;

if (descriptionBox) {
    const githubPRButton = document.querySelector('button.hx_create-pr-button');
    if (githubPRButton) {
        const generate_button = document.createElement('button');
        generate_button.className = "btn-primary btn BtnGroup-item flex-auto";
        generate_button.id = "#pr-button"
        generate_button.type = 'button';
        generate_button.textContent = 'Generate PR summary';
        generate_button.style.marginRight = '6px';
        githubPRButton.parentNode.insertBefore(generate_button, githubPRButton.previousSibling);
        generate_button.onclick = function () {
            console.log("clicked");

        }
    }
}

function updatePRDescription(data) {
    console.log("trying to update pr description");
    descriptionBox.value = data;
}


chrome.runtime.sendMessage({action: "fetchBranchDiff", url: github_url}, response => {
    console.log(response);
    updatePRDescription(response.data);
});

