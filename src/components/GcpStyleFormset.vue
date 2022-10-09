<template>
  <div>
    <form>
      <table>
        <tbody>
          <tr v-for="(rule, i) in styleRules.gcpStyleRules" :key="rule.id">
            <td>
              <PatternField
                v-model="rule.pattern"
                :ref="storeFields"
                @input="setUnsaved"
              />
            </td>
            <td>
              <component
                v-for="style in rule.styles"
                :key="style.name"
                :ref="storeFields"
                v-bind:is="style.name + 'Field'"
                v-model="style.value"
                @input="setUnsaved"
              />
            </td>
            <td>
              <a class="" @click="deleteGcpStyleRule(i)"
                ><i class="fa-solid fa-trash-can delete"
              /></a>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="add" @click="addRandomGcpStyleRule">
        <span>Add project</span>
      </button>
      <button
        type="submit"
        class="save-button"
        :class="{ unsaved: isUnsaved(), shake: shake, disabled: isInvalid() }"
        @click="save"
      >
        <span v-if="isInvalid()"
          >Invalid <i class="fa-solid fa-triangle-exclamation" />
        </span>
        <span v-else-if="unsaved">Save</span>
        <span v-else>Saved</span>
      </button>
    </form>
  </div>
</template>

<script>
import BrowserStorage from "./BrowserStorage";
import PatternField from "./PatternField.vue";
import RandomGenerator from "./RandomGenerator";
import StyleRule from "./StyleRule";
import gcpNavbarColorField from "./styles/GcpNavbarColorField.vue";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");
const storage = new BrowserStorage(browser.storage.sync);

export default {
  name: "GcpStyleFormset",
  components: {
    gcpNavbarColorField,
    PatternField,
  },
  data() {
    return {
      styleRules: {},
      fields: [],
      unsaved: false,
      shake: false,
      disabled: false,
    };
  },
  mounted() {
    this.loadSettings();
    this.setUnsavedChangesConfirmation();
  },
  methods: {
    addRandomGcpStyleRule() {
      this.addGcpStyleRule(
        RandomGenerator.getRandomProjectName(),
        RandomGenerator.getRandomColor()
      );
    },
    addGcpStyleRule(projectId, navbarColor) {
      this.styleRules.gcpStyleRules.push(
        StyleRule.createDefaultGcp(projectId, navbarColor)
      );
      this.setUnsaved();
    },
    deleteGcpStyleRule(index) {
      this.styleRules.gcpStyleRules.splice(index, 1);
      this.setUnsaved();
    },
    save(e) {
      e.preventDefault();
      if (this.unsaved && this.isValid()) {
        storage.setStyleRules(this.styleRules);
        this.setSaved();
      } else {
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 1500);
      }
    },
    setUnsaved() {
      this.unsaved = true;
    },
    setSaved() {
      this.unsaved = false;
    },
    async loadSettings() {
      this.styleRules = await storage.getStyleRules();
      this.setSaved();
    },
    setUnsavedChangesConfirmation() {
      window.onbeforeunload = () => (this.unsaved ? true : null);
    },
    isValid() {
      return (
        this.fields.filter((field) => {
          return (
            field != null &&
            !field._isDestroyed &&
            field.validationErrors.length != 0
          );
        }).length == 0
      );
    },
    isInvalid() {
      return !this.isValid();
    },
    storeFields(element) {
      this.fields.push(element);
    },
    isUnsaved() {
      return this.isValid() && this.unsaved;
    },
  },
};
</script>

<style scoped>
tr {
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.delete {
  font-size: 1.2rem;
  color: var(--red);
  cursor: pointer;
}

.save-button {
  background-color: var(--grey);
  outline-color: var(--grey);
}

.disabled {
  background-color: var(--red) !important;
  outline-color: var(--red) !important;
  border: none;
}

.unsaved {
  background-color: var(--green);
  outline-color: var(--green);
  z-index: 0;
  position: relative;
}

.unsaved:before {
  content: "";
  background: linear-gradient(
    45deg,
    var(--green),
    var(--light-green),
    var(--lime),
    var(--yellow),
    var(--amber),
    var(--orange),
    var(--deep-orange),
    var(--red),
    var(--pink),
    var(--purple),
    var(--deep-purple),
    var(--indigo),
    var(--blue),
    var(--light-blue),
    var(--cyan),
    var(--teal),
    var(--green)
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  /* opacity: 0; */
  transition: opacity 0.3s ease-in-out;
}

.unsaved:active:after {
  background: transparent;
}

.unsaved:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: #111; */
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
