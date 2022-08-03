const colorMap = {
  "default": "blue",
  "bachelor-thesis-332216": "green",
  "gcp-it-dr-dropstock2-dev-j7f": "green",
  "gcp-it-dr-dropstock2-stage-ka5": "orange",
  "gcp-it-dr-dropstock2-live-3nw": "red",
};

function listenForUrlChange() {
  let previousUrl = '';
  const observer = new MutationObserver(function(mutations) {
    if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        changeBarColor();
      }
  });
  const config = {subtree: true, childList: true};

  // start listening to changes
  observer.observe(document, config);
}


function changeBarColor() {
  const banner = document.getElementsByClassName("cfc-platform-bar-container");
  const urlParams = new URLSearchParams(window.location.search);

  if (banner.length != 1) {
  console.log('Navigation bar identifier not unique!')
  console.log(banner);
  console.log(banner.length);
    throw "Navigation bar identifier not unique!";
  }

  if (!urlParams.has("project")) {
  console.log('Url does not contain project query param!')
    throw "Url does not contain project query param!";
  }

  const projectId = urlParams.get("project");

  const barColor = colorMap.hasOwnProperty(projectId)
    ? colorMap[projectId]
    : colorMap["default"];

  console.log("Changing color of nav bar to " + barColor);
  banner[0].style.backgroundColor = barColor;
}

changeBarColor();
listenForUrlChange();
