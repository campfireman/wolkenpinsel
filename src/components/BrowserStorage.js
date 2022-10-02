var browser = require("webextension-polyfill/dist/browser-polyfill.min");

module.exports = {
  setGcpStyleRules(gcpStyleRules) {
    let dictionary = Object.assign(
      {},
      ...gcpStyleRules.map((x) => {
        let copy = { ...x };
        let projectId = copy.projectId;
        delete copy.projectId;
        return { [projectId]: copy };
      })
    );
    browser.storage.sync.set({ gcpColorSettings: dictionary });
  },
  async getGcpStyleRules() {
    let gcpStyleRules = [];
    let data = await browser.storage.sync.get("gcpColorSettings");
    if (data.gcpColorSettings) {
      Object.entries(data.gcpColorSettings).forEach(([key, value]) => {
        let setting = value;
        setting.projectId = key;
        gcpStyleRules.push(setting);
      });
    }
    return gcpStyleRules;
  },
};
