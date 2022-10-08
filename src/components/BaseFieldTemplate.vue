<template>
  <div>
    <label
      ><div class="label">
        {{ label }}
        <a @click="openHelp"
          ><i class="fa-solid fa-circle-question help button"></i
        ></a>
      </div>
      <slot name="input" />
      <ul>
        <li v-for="(error, key) in validationErrors" :key="key" class="error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          {{ error }}
        </li>
      </ul>
    </label>
    <div v-if="helpVisible">
      <dialog open v-if="helpVisible" @keyup.esc="closeHelp">
        <article class="help-modal">
          <a aria-label="Close" class="close button" @click="closeHelp"></a>
          <h3>Help: {{ label }}</h3>
          <div>
            <slot name="help-text" />
          </div>
        </article>
      </dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "validationErrors"],
  data: () => {
    return {
      helpVisible: false,
    };
  },
  created() {
    window.addEventListener("keydown", this.closeHelpWithEsc);
  },
  methods: {
    openHelp() {
      if (!this.helpVisible) {
        this.helpVisible = true;
      }
    },
    closeHelp() {
      if (this.helpVisible) {
        this.helpVisible = false;
      }
    },
    closeHelpWithEsc(e) {
      if (e.key == "Escape") {
        this.closeHelp();
      }
    },
  },
};
</script>

<style scoped>
.label {
  line-height: 3;
  font-weight: 700;
}

.button {
  cursor: pointer;
}

.help-modal {
  width: 700px;
}

ul {
  list-style-type: none;
}

ul li {
  list-style-type: none;
}

.error {
  color: var(--red);
}
</style>
