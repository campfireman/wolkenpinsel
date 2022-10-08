<template>
  <label
    >{{ label }}
    <input type="text" v-model="inputValue" />
    <ul>
      <li v-for="(error, key) in validationErrors" :key="key" class="error">
        <span class="material-symbols-outlined">warning</span>
        {{ error }}
      </li>
    </ul>
  </label>
</template>

<script>
export default {
  props: ["value"],
  data: () => {
    return {
      label: "Field",
      validators: [],
      validationErrors: [],
    };
  },
  methods: {
    validate(input) {
      this.validationErrors = [];
      this.validators.forEach((validator) => {
        if (validator.test(input)) {
          if (validator.errorKey in this.validationErrors) {
            this.$delete(this.validationErrors, validator.errorKey);
          }
        } else {
          this.validationErrors.push(validator.errorMessage);
        }
      });
    },
    isInvalid() {
      return Object.keys(this.validationErrors).length != 0;
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
