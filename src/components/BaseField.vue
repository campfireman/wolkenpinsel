<template>
  <label
    >{{ label }}
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
  props: ["value", "prefix"],
  data: () => {
    return {
      label: "Field",
      fieldKey: "",
      validators: [],
      validationErrors: {},
    };
  },
  methods: {
    validate(input) {
      console.log(
        `before validation: ${JSON.stringify(this.validationErrors)}`
      );
      this.validators.forEach((validator) => {
        if (validator.test(input)) {
          if (validator.errorKey in this.validationErrors) {
            this.$delete(this.validationErrors, validator.errorKey);
          }
        } else {
          this.$set(
            this.validationErrors,
            validator.errorKey,
            validator.errorMessage
          );
        }
      });
      this.$emit("validate", this.prefix, this.fieldKey, this.validationErrors);
      console.log(
        `after  validation: ${JSON.stringify(this.validationErrors)}`
      );
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
