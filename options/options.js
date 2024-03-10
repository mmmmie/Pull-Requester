const saveOptions = () => {
    const yes_button = !document.getElementById('yes_button').checked;
    chrome.storage.sync.set({
        yes_button: yes_button
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        console.log('chrome.storage.sync is:', chrome.storage.sync.get('yes_button'));
        setTimeout(() => {
            status.textContent = '';
        }, 1500);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    console.log("FUCK YOU GOOGLE")
    // console.log('chrome.storage.sync.get: ' + chrome.storage.sync.get(yes_button))
    console.log('chrome.storage.sync.get dict: ' + chrome.storage.sync.get({yes_button: true}))
    chrome.storage.sync.get(
        {yes_button: true},
        (items) => {
            document.getElementById('yes_button').checked = !items.yes_button;
            console.log('chrome.storage.sync is:', chrome.storage.sync.get('yes_button'));
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('yes_button').addEventListener('click', saveOptions);