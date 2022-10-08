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
        if (!validator.test(input)) {
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
