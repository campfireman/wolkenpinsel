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
    <ul>
      <li v-for="(error, key) in validationErrors" :key="key" class="error">
        <span class="material-symbols-outlined">warning</span>
        {{ error }}
      </li>
    </ul>
  </label>
</template>

<script>
import Field from "../BaseField.vue";

export default {
  name: "gcpNavbarColorField",
  mixins: [Field],
  data: () => {
    return {
      label: "Navbar Color",
      validators: [
        {
          test: (input) => {
            return CSS.supports("color", input);
          },
          errorKey: "colorNotACss3Color",
          errorMessage: "This color is not supported by CSS3.",
        },
      ],
    };
  },
};
</script>
