<script>
import Field from "../BaseField.vue";

export default {
  name: "gcpNavbarColorField",
  mixins: [Field],
  data: () => {
    return {
      label: "Navbar Color",
      fieldKey: "navbarColor",
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
