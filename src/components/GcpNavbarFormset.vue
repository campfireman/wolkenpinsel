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
const COLORS = {
  GREEN: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--green"),
  LIGHT_GREEN: () =>
    getComputedStyle(document.documentElement).getPropertyValue(
      "--light-green"
    ),
  LIME: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--lime"),
  YELLOW: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--yellow"),
  AMBER: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--amber"),
  ORANGE: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--orange"),
  DEEP_ORANGE: () =>
    getComputedStyle(document.documentElement).getPropertyValue(
      "--deep-orange"
    ),
  RED: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--red"),
  PINK: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--pink"),
  PURPLE: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--purple"),
  DEEP_PURPLE: () =>
    getComputedStyle(document.documentElement).getPropertyValue(
      "--deep-purple"
    ),
  INDIGO: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--indigo"),
  BLUE: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--blue"),
  LIGHT_BLUE: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--light-blue"),
  CYAN: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--cyan"),
  TEAL: () =>
    getComputedStyle(document.documentElement).getPropertyValue("--teal"),
};

const ADJECTIVES = [
  "abundant",
  "accurate",
  "addicted",
  "adorable",
  "adventurous",
  "afraid",
  "aggressive",
  "alcoholic",
  "alert",
  "aloof",
  "ambitious",
  "ancient",
  "angry",
  "animated",
  "annoying",
  "anxious",
  "arrogant",
  "ashamed",
  "attractive",
  "auspicious",
  "awesome",
  "awful",
  "abactinal",
  "abandoned",
  "abashed",
  "abatable",
  "abatic",
  "abaxial",
  "abbatial",
  "abbreviated",
  "abducent",
  "abducting",
  "aberrant",
  "abeyant",
  "abhorrent",
  "abiding",
  "abient",
  "bad",
  "bashful",
  "beautiful",
  "belligerent",
  "beneficial",
  "best",
  "big",
  "bitter",
  "bizarre",
  "black",
  "blue",
  "boring",
  "brainy",
  "bright",
  "broad",
  "broken",
  "busy",
  "barren",
  "barricaded",
  "barytic",
  "basal",
  "basaltic",
  "baseborn",
  "based",
  "baseless",
  "basic",
  "bathyal",
  "battleful",
  "battlemented",
  "batty",
  "batwing",
  "bias",
  "calm",
  "capable",
  "careful",
  "careless",
  "caring",
  "cautious",
  "charming",
  "cheap",
  "cheerful",
  "chubby",
  "clean",
  "clever",
  "clumsy",
  "cold",
  "colorful",
  "comfortable",
  "concerned",
  "confused",
  "crowded",
  "cruel",
  "curious",
  "curly",
  "cute",
  "damaged",
  "dangerous",
  "dark",
  "deep",
  "defective",
  "delicate",
  "delicious",
  "depressed",
  "determined",
  "different",
  "dirty",
  "disgusting",
  "dry",
  "dusty",
  "daft",
  "daily",
  "dainty",
  "damn",
  "damning",
  "damp",
  "dampish",
  "darkling",
  "darned",
  "dauntless",
  "daylong",
  "early",
  "educated",
  "efficient",
  "elderly",
  "elegant",
  "embarrassed",
  "empty",
  "encouraging",
  "enthusiastic",
  "excellent",
  "exciting",
  "expensive",
  "fabulous",
  "fair",
  "faithful",
  "famous",
  "fancy",
  "fantastic",
  "fast",
  "fearful",
  "fearless",
  "fertile",
  "filthy",
  "foolish",
  "forgetful",
  "friendly",
  "funny",
  "gentle",
  "glamorous",
  "glorious",
  "gorgeous",
  "graceful",
  "grateful",
  "great",
  "greedy",
  "green",
  "handsome",
  "happy",
  "harsh",
  "healthy",
  "heavy",
  "helpful",
  "hilarious",
  "historical",
  "horrible",
  "hot",
  "huge",
  "humorous",
  "hungry",
  "ignorant",
  "illegal",
  "imaginary",
  "impolite",
  "important",
  "impossible",
  "innocent",
  "intelligent",
  "interesting",
  "jealous",
  "jolly",
  "juicy",
  "juvenile",
  "kind",
  "large",
  "legal",
  "light",
  "literate",
  "little",
  "lively",
  "lonely",
  "loud",
  "lovely",
  "lucky",
  "macho",
  "magical",
  "magnificent",
  "massive",
  "mature",
  "mean",
  "messy",
  "modern",
  "narrow",
  "nasty",
  "naughty",
  "nervous",
  "new",
  "noisy",
  "nutritious",
  "obedient",
  "obese",
  "obnoxious",
  "old",
  "overconfident",
  "peaceful",
  "pink",
  "polite",
  "poor",
  "powerful",
  "precious",
  "pretty",
  "proud",
  "quick",
  "quiet",
  "rapid",
  "rare",
  "red",
  "remarkable",
  "responsible",
  "rich",
  "romantic",
  "royal",
  "rude",
  "scintillating",
  "secretive",
  "selfish",
  "serious",
  "sharp",
  "shiny",
  "shocking",
  "short",
  "shy",
  "silly",
  "sincere",
  "skinny",
  "slim",
  "slow",
  "small",
  "soft",
  "spicy",
  "spiritual",
  "splendid",
  "strong",
  "successful",
  "sweet",
  "talented",
  "tall",
  "tense",
  "terrible",
  "terrific",
  "thick",
  "thin",
  "tiny",
  "tactful",
  "tailor-made",
  "take-charge",
  "tangible",
  "tasteful",
  "tasty",
  "teachable",
  "teeming",
  "tempean",
  "temperate",
  "tenable",
  "tenacious",
  "tender",
  "tender-hearted",
  "terrific",
  "testimonial",
  "thankful",
  "thankworthy",
  "therapeutic",
  "thorough",
  "thoughtful",
  "ugly",
  "unique",
  "untidy",
  "upset",
  "victorious",
  "violent",
  "vulgar",
  "warm",
  "weak",
  "wealthy",
  "wide",
  "wise",
  "witty",
  "wonderful",
  "worried",
  "young",
  "youthful",
  "zealous",
];

const NOUNS = [
  "adult",
  "age",
  "amount",
  "area",
  "back",
  "bed",
  "blood",
  "body",
  "book",
  "box",
  "boy",
  "bulb",
  "bunch",
  "business",
  "camera",
  "chicken",
  "child",
  "chocolates",
  "city",
  "clothes",
  "colony",
  "colors",
  "company",
  "computer",
  "continent",
  "council",
  "country",
  "course",
  "cycle",
  "dates",
  "day",
  "death",
  "desk",
  "door",
  "egg",
  "face",
  "fact",
  "factory",
  "family",
  "farm",
  "farmer",
  "father",
  "fish",
  "floor",
  "flowers",
  "food",
  "fridge",
  "future",
  "game",
  "garden",
  "gas",
  "glass",
  "group",
  "health",
  "hill",
  "hospital",
  "idea",
  "image",
  "industry",
  "island",
  "jewelry",
  "job",
  "kitchen",
  "land",
  "law",
  "leaves",
  "leg",
  "letter",
  "life",
  "magazine",
  "market",
  "metal",
  "mirror",
  "mobile",
  "money",
  "morning",
  "mother",
  "mountain",
  "movie",
  "name",
  "nest",
  "news",
  "ocean",
  "oil",
  "painter",
  "park",
  "party",
  "pen",
  "pen",
  "pencil",
  "person",
  "picture",
  "pillow",
  "place",
  "plant",
  "pond",
  "rain",
  "rate",
  "result",
  "ring",
  "road",
  "rock",
  "rocket",
  "room",
  "rope",
  "rule",
  "sale",
  "school",
  "shape",
  "shapes",
  "ship",
  "shop",
  "sister",
  "site",
  "skin",
  "snacks",
  "son",
  "song",
  "sort",
  "sound",
  "soup",
  "sports",
  "state",
  "stone",
  "street",
  "system",
  "taxi",
  "tea",
  "teacher",
  "team",
  "toy",
  "tractor",
  "trade",
  "train",
  "video",
  "view",
  "water",
  "waterfall",
  "week",
  "women",
  "wood",
  "word",
  "year",
];

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
    chrome.storage.sync.get("gcpColorSettings", (data) => {
      if (data.gcpColorSettings) {
        Object.entries(data.gcpColorSettings).forEach(([key, value]) => {
          let setting = value;
          setting.projectId = key;
          this.gcpColorSettings.push(setting);
        });
        this.unsaved = false;
      }
    });
    window.onbeforeunload = () => (this.unsaved ? true : null);
  },
  methods: {
    getRandomListItem(list) {
      return list[Math.floor(Math.random() * list.length)];
    },
    getRandomProjectName() {
      return `${this.getRandomListItem(ADJECTIVES)}-${this.getRandomListItem(
        NOUNS
      )}`;
    },
    getRandomColor() {
      return COLORS[this.getRandomListItem(Object.keys(COLORS))]().trim();
    },
    addRandomRow() {
      this.addColorSetting(this.getRandomProjectName(), this.getRandomColor());
    },
    addColorSetting(projectId, navbarColor) {
      this.gcpColorSettings.push({
        projectId: projectId,
        navbarColor: navbarColor,
      });
      this.unsaved = true;
    },
    deleteRow(index) {
      this.gcpColorSettings.splice(index, 1);
      this.unsaved = true;
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
        chrome.storage.sync.set({ gcpColorSettings: dictionary });
        this.unsaved = false;
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
