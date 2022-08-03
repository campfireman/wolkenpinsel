
const colorMap = {
  "default": "blue",
  "bachelor-thesis-332216": "green",
  "gcp-it-dr-dropstock2-dev-j7f": "green",
  "gcp-it-dr-dropstock2-stage-ka5": "orange",
  "gcp-it-dr-dropstock2-live-3nw": "red",
};
const gcpColorFormset = document.getElementById("gcp-colors");

function restoreInput() {
    for (project in colorMap) {
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

function submit() {

}

document.addEventListener("DOMContentLoaded", restoreInput);
document.getElementById("gcp-add-color").addEventListener("click", appendEmptyGcpFormsetRow);
document.querySelector("form").addEventListener("submit", submit);