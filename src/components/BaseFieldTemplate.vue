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
    <dialog open v-if="helpVisible" @keyup.esc="closeHelp">
      <article
        class="help-modal"
        ref="helpModal"
        :rendered="helpRendered"
        v-click-outside="closeHelp"
      >
        <a aria-label="Close" class="close button" @click="closeHelp"></a>
        <h3>Help: {{ label }}</h3>
        <div>
          <slot name="help-text" />
        </div>
      </article>
    </dialog>
  </div>
</template>

<script>
export default {
  props: ["label", "validationErrors"],
  data: () => {
    return {
      helpVisible: false,
      helpRendered: false,
    };
  },
  created() {
    window.addEventListener("keydown", this.closeHelpWithEsc);
  },
  methods: {
    openHelp() {
      if (!this.helpVisible) {
        this.helpVisible = true;
        setTimeout(() => {
          this.helpRendered = true;
        }, 20);
      }
    },
    closeHelp() {
      if (this.helpVisible) {
        this.helpVisible = false;
        this.helpRendered = false;
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
