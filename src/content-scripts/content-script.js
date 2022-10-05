import BrowserStorage from "@/components/BrowserStorage";

const GCP_NAVBAR_DEFAULT_COLOR = "#1a73e8";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");
const storage = new BrowserStorage(browser.storage.sync);
storage.getStyleRules().then((styleRules) => {
  listenForUrlChange(styleRules);
});

function getProjectId() {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("project")) {
    console.log("Url does not contain project query param!");
    return "";
  }
  return urlParams.get("project");
}

function listenForUrlChange(styleRules) {
  let previousUrl = "";
  const observer = new MutationObserver(() => {
    if (window.location.href !== previousUrl) {
      previousUrl = window.location.href;
      let projectId = getProjectId();
      changeBarColor(GCP_NAVBAR_DEFAULT_COLOR);
      styleRules.gcpStyleRules
        .filter((rule) => {
          let regex = new RegExp(`^${rule.pattern}$`);
          return regex.test(projectId);
        })
        .forEach((rule) => {
          changeBarColor(rule.styles[0].value);
        });
    }
  });
  const config = { subtree: true, childList: true };

  // start listening to changes
  observer.observe(document, config);
}

function changeBarColor(color) {
  const banner = document.getElementsByClassName("cfc-platform-bar-container");

  if (banner.length != 1) {
    console.log("Navigation bar identifier not unique!");
    console.log(banner);
    console.log(banner.length);
    throw "Navigation bar identifier not unique!";
  }

  console.log("Changing color of nav bar to " + color);
  banner[0].style.backgroundColor = color;
}
