let banner = document.getElementsByClassName("cfc-platform-bar-container");
const colorMap = {
  "bachelor-thesis-332216": "green",
  "gcp-it-dr-dropstock2-dev-j7f": "green",
  "gcp-it-dr-dropstock2-stage-ka5": "orange",
  "gcp-it-dr-dropstock2-live-3nw": "red",
};
const urlParams = new URLSearchParams(window.location.search);

function changeBarColor() {
  if (banner.length != 1) {
    throw "Navigation bar identifier not unique!";
  }

  if (!urlParams.has("project")) {
    throw "Url does not contain project query param!";
  }

  const projectId = urlParams.get("project");

  if (!colorMap.hasOwnProperty(projectId)) {
    console.log(`No color defined for project with ID: ${projectId}`)
    exit(0);
  }

  banner = banner[0]
  console.log("Changing color of nav bar")
  banner.style.backgroundColor = colorMap[projectId];
}

changeBarColor();
