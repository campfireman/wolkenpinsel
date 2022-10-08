<template>
  <BaseFieldTemplate :label="label" :validationErrors="validationErrors">
    <template v-slot:input>
      <input
        :style="{
          border: '5px solid ' + inputValue,
        }"
        type="text"
        v-model="inputValue"
      />
    </template>
    <template v-slot:help-text>
      <p>
        Enter a
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#syntax"
          target="_blank"
          >CSS3-compatible color</a
        >
        to colorize the background of the
        <a href="https://console.cloud.google.com/" target="_blank"
          >Google Cloud Console</a
        >.
      </p>
      <h4>Examples:</h4>
      <ul>
        <li>
          <code
            ><a :href="getColorExampleUrl('red')" target="_blank">red</a></code
          >
          A color specified by a named color
        </li>
        <li>
          <code
            ><a :href="getColorExampleUrl('#039be5')" target="_blank"
              >#039be5</a
            ></code
          >
          A color specified by hexadecimal color-code
        </li>
        <li>
          <code
            ><a :href="getColorExampleUrl('rgb(255,0,255)')" target="_blank"
              >rgb(255,0,255)</a
            ></code
          >
          A color specified using the RGB color model
        </li>
      </ul>
    </template>
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
          errorMessage: "This color is not supported by CSS3.",
        },
      ],
    };
  },
  methods: {
    getColorExampleUrl(color) {
      return `https://colorpeek.com/#${color}`;
    },
  },
};
</script>
