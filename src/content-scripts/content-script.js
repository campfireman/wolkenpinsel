function loadSettings(key, callback) {
  return chrome.storage.sync.get(key, callback);
}

function loadGcpColorSettings(callback) {
  return loadSettings("gcpColorSettings", callback);
}
loadGcpColorSettings((settings) => listenForUrlChange(settings));

function listenForUrlChange(settings) {
  let previousUrl = "";
  const observer = new MutationObserver(function () {
    if (window.location.href !== previousUrl) {
      previousUrl = window.location.href;
      changeBarColor(settings.gcpColorSettings);
    }
  });
  const config = { subtree: true, childList: true };

  // start listening to changes
  observer.observe(document, config);
}

function changeBarColor(colorMap) {
  const banner = document.getElementsByClassName("cfc-platform-bar-container");
  const urlParams = new URLSearchParams(window.location.search);

  if (banner.length != 1) {
    console.log("Navigation bar identifier not unique!");
    console.log(banner);
    console.log(banner.length);
    throw "Navigation bar identifier not unique!";
  }

  if (!urlParams.has("project")) {
    console.log("Url does not contain project query param!");
    throw "Url does not contain project query param!";
  }

  const projectId = urlParams.get("project");

  if (Object.prototype.hasOwnProperty.call(colorMap, projectId)) {
    const navbarColor = colorMap[projectId].navbarColor;

    console.log("Changing color of nav bar to " + navbarColor);
    banner[0].style.backgroundColor = navbarColor;
  } else if (Object.prototype.hasOwnProperty.call(colorMap, "default")) {
    banner[0].style.backgroundColor = colorMap.default.navbarColor;
  } else {
    banner[0].style.backgroundColor = "#3367d6";
  }
}
