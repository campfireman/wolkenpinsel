
const GCP_SETTINGS_KEY = "gcp-settings";
const gcpColorFormset = document.getElementById("gcp-colors");

function restoreInput() {
    for (project in loadGcpColorSettings()) {
        appendGcpColorFormsetRow(project, colorMap[project])
    }
}

function appendGcpColorFormsetRow(projectId, color) {
    let container = document.createElement("tr");

    let projectIdInput = document.createElement("input");
    projectIdInput.value = projectId;
    container.appendChild(wrapInTag("td", projectIdInput));

    let colorInput = document.createElement("input");
    colorInput.value = color;
    container.appendChild(wrapInTag("td", colorInput));

    gcpColorFormset.appendChild(container);
}

function wrapInTag(tag, child) {
    let wrapper = document.createElement(tag);
    wrapper.appendChild(child);
    return wrapper;
}

function appendEmptyGcpFormsetRow() {
    appendGcpColorFormsetRow("", "");
}

function getGcpColorFormsetData() {

}

function submit(e) {
    e.preventDefault();
    const colorMap = {
        "default": "#3367d6",
        "bachelor-thesis-332216": "green",
        "gcp-it-dr-dropstock2-dev-j7f": "green",
        "gcp-it-dr-dropstock2-stage-ka5": "orange",
        "gcp-it-dr-dropstock2-live-3nw": "red",
    };
    saveSettings(GCP_SETTINGS_KEY, colorMap);
    // saveSettings(GCP_SETTINGS_KEY, getGcpColorFormsetData());
}

function saveSettings(key, settings) {
    browser.storage.sync.set({
        [key]: settings
    });
}

function loadSettings(key) {
    return browser.storage.sync.get(key)
}

function loadGcpColorSettings() {
    return loadSettings(GCP_SETTINGS_KEY);
}

document.addEventListener("DOMContentLoaded", restoreInput);
document.getElementById("gcp-add-color").addEventListener("click", appendEmptyGcpFormsetRow);
document.querySelector("form").addEventListener("submit", submit);