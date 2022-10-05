<template>
  <label
    >Navbar Color
    <input
      :style="{
        border: '5px solid ' + inputValue,
      }"
      type="text"
      v-model="inputValue"
    />
    <ul v-if="isInvalid()">
      <li v-for="(error, key) in validationErrors" :key="key" class="error">
        <span class="material-symbols-outlined">warning</span>
        {{ error }}
      </li>
    </ul>
  </label>
</template>

<script>
export default {
  name: "gcpNavbarColorField",
  props: ["value"],
  data: () => {
    return {
      validationErrors: {},
      hasValidated: false,
    };
  },
  methods: {
    validate(input) {
      this.hasValidated = true;
      if (CSS.supports("color", input)) {
        if ("invalidColor" in this.validationErrors) {
          this.$delete(this.validationErrors, "invalidColor");
        }
      } else {
        this.$set(
          this.validationErrors,
          "invalidColor",
          "This color is not supported by CSS3."
        );
      }
      this.$emit("validate", "gcpNavbarColor", this.validationErrors);
    },
    isInvalid() {
      return Object.keys(this.validationErrors).length > 0;
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.validate(value);
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style scoped>
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
