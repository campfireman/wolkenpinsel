<template>
  <BaseFieldTemplate :validationErrors="validationErrors" :label="label">
    <input
      :style="{
        border: '5px solid ' + inputValue,
      }"
      type="text"
      v-model="inputValue"
    />
  </BaseFieldTemplate>
</template>

<script>
import BaseField from "../BaseField.vue";
import BaseFieldTemplate from "../BaseFieldTemplate.vue";

export default {
  name: "gcpNavbarColorField",
  mixins: [BaseField],
  components: { BaseFieldTemplate },
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
