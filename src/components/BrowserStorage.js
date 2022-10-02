class BrowserStorage {
  STORAGE_EXTENSION_KEY = "wolkenpinsel";
  STORAGE_TEMPLATE_100 = {
    formatVersion: "1.0.0",
    gcpStyleRules: [],
  };
  STORAGE_TEMPLATE = this.STORAGE_TEMPLATE_100;

  constructor(storage) {
    this.storage = storage;
    this.migrate();
  }

  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  async migrate010() {
    let data = await this.storage.get("gcpColorSettings");
    if (data.gcpColorSettings) {
      let newSettings = this.deepCopy(this.STORAGE_TEMPLATE_100);
      for (const [key, value] of Object.entries(data.gcpColorSettings)) {
        newSettings.gcpStyleRules.push({
          projectIdPattern: key,
          styles: [{ name: "gcpNavbarColor", value: value.navbarColor }],
        });
      }
      this.storage.set({ [this.STORAGE_EXTENSION_KEY]: newSettings });
      await this.storage.remove("gcpColorSettings");
    }
  }

  migrate() {
    this.migrate010();
  }

  setStyleRules(styleRules) {
    this.storage.set({ [this.STORAGE_EXTENSION_KEY]: styleRules });
  }

  async getStyleRules() {
    let data = await this.storage.get(this.STORAGE_EXTENSION_KEY);
    if (data[this.STORAGE_EXTENSION_KEY]) {
      return data[this.STORAGE_EXTENSION_KEY];
    }
    return this.deepCopy(this.STORAGE_TEMPLATE);
  }
}

module.exports = BrowserStorage;
