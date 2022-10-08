<script>
import Field from "./BaseField.vue";

export default {
  mixins: [Field],
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
