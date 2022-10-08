import StyleRule from "./StyleRule";
import StyleRuleStorage from "./StyleRuleStorage";

class BrowserStorage {
  STORAGE_EXTENSION_KEY = "wolkenpinsel";
  storage;

  constructor(storage) {
    this.storage = storage;
    this.migrate();
  }

  async migrate010() {
    let data = await this.storage.get("gcpColorSettings");
    if (data.gcpColorSettings) {
      let newSettings = new StyleRuleStorage();
      for (const [key, value] of Object.entries(data.gcpColorSettings)) {
        newSettings.gcpStyleRules.push(
          StyleRule.createDefaultGcp(key, value.navbarColor)
        );
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
    return new StyleRuleStorage();
  }
}

export default BrowserStorage;
