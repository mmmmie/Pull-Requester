// if the user set options yes_button to false, then don't show the button
chrome.storage.sync.get(
    {yes_button: true},
    (items) => {
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
                        chrome.runtime.sendMessage({message: 'start it', url: github_url});
                        console.log("Generating pull request...");
                    }
                }


                // :3 meow meow meow meow meow


                descriptionBox.value = "MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOWMEOW MEOW MEOW MEOW";

            }
        }
    });