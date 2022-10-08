<template>
  <BaseFieldTemplate :validationErrors="validationErrors" :label="label">
    <input type="text" v-model="inputValue" />
  </BaseFieldTemplate>
</template>

<script>
import BaseField from "./BaseField.vue";
import BaseFieldTemplate from "./BaseFieldTemplate.vue";

export default {
  mixins: [BaseField],
  components: { BaseFieldTemplate },
  data: () => {
    return {
      label: "Project ID",
      validators: [
        {
          test: (input) => {
            try {
              new RegExp(`^${input}$`);
              return true;
            } catch (e) {
              return false;
            }
          },
          errorKey: "patternNotARegex",
          errorMessage: "This is not valid RegEx.",
        },
      ],
    };
  },
};
</script>
