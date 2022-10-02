<template>
  <div>
    <form>
      <table>
        <tbody>
          <tr v-for="(setting, index) in gcpColorSettings" :key="index">
            <td>
              <label
                >Project ID
                <input
                  type="text"
                  v-model="setting.projectId"
                  @input="setUnsaved"
                />
              </label>
            </td>
            <td>
              <label
                >Navigation bar color
                <input
                  :style="{
                    border: '5px solid ' + setting.navbarColor,
                  }"
                  type="text"
                  v-model="setting.navbarColor"
                  @input="setUnsaved"
                />
              </label>
            </td>
            <td>
              <a class="" @click="deleteRow(index)"
                ><span class="material-symbols-outlined delete">delete</span></a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="add" @click="addRandomRow">
        <span>Add project</span>
      </button>
      <button
        type="submit"
        class="save-button"
        :class="{ unsaved: unsaved, shake: shake }"
        @click="save"
      >
        <span v-if="unsaved">Save</span>
        <span v-else>Saved</span>
      </button>
    </form>
  </div>
</template>

<script>
import RandomGenerator from "./RandomGenerator";
var browser = require("webextension-polyfill/dist/browser-polyfill.min");

export default {
  name: "GcpNavbarFormset",
  data() {
    return {
      gcpColorSettings: [],
      unsaved: false,
      shake: false,
    };
  },
  mounted() {
    this.loadSettings();
    this.setUnsavedChangesConfirmation();
  },
  methods: {
    addRandomRow() {
      this.addColorSetting(
        RandomGenerator.getRandomProjectName(),
        RandomGenerator.getRandomColor()
      );
    },
    addColorSetting(projectId, navbarColor) {
      this.gcpColorSettings.push({
        projectId: projectId,
        navbarColor: navbarColor,
      });
      this.setUnsaved();
    },
    deleteRow(index) {
      this.gcpColorSettings.splice(index, 1);
      this.setUnsaved();
    },
    save(e) {
      e.preventDefault();
      if (this.unsaved) {
        let dictionary = Object.assign(
          {},
          ...this.gcpColorSettings.map((x) => {
            let copy = { ...x };
            let projectId = copy.projectId;
            delete copy.projectId;
            return { [projectId]: copy };
          })
        );
        browser.storage.sync.set({ gcpColorSettings: dictionary });
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
    loadSettings() {
      browser.storage.sync.get("gcpColorSettings").then((data) => {
        if (data.gcpColorSettings) {
          Object.entries(data.gcpColorSettings).forEach(([key, value]) => {
            let setting = value;
            setting.projectId = key;
            this.gcpColorSettings.push(setting);
          });
          this.setSaved();
        }
      });
    },
    setUnsavedChangesConfirmation() {
      window.onbeforeunload = () => (this.unsaved ? true : null);
    },
  },
};
</script>

<style scoped>
tr {
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
}

.delete {
  color: var(--red);
  cursor: pointer;
}

.save-button {
  background-color: var(--grey);
  outline-color: var(--grey);
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
