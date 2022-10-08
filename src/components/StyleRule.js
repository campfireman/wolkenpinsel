import Style from "./Style";

const uuid = require("uuid");

class StyleRule {
  id = "";
  pattern = "";
  styles = [];

  constructor(pattern, styles) {
    this.id = this.createId();
    this.pattern = pattern;
    this.styles = styles;
  }

  createId() {
    return uuid.v4();
  }

  static createDefaultGcp(pattern, gcpNavbarColorValue) {
    return new StyleRule(pattern, [
      new Style("gcpNavbarColor", gcpNavbarColorValue),
    ]);
  }
}

export default StyleRule;
