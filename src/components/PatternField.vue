<template>
  <BaseFieldTemplate :label="label" :validationErrors="validationErrors">
    <template v-slot:input>
      <div class="regex-input">
        <div class="regex-prefix">/^</div>
        <input type="text" v-model="inputValue" />
        <div class="regex-postfix">$/</div>
      </div>
    </template>
    <template v-slot:help-text>
      <p>
        Enter the the
        <a
          href="https://support.google.com/googleapi/answer/7014113"
          target="_blank"
          >ID of the Google Project</a
        >
        you want to stylize.
      </p>
      <p>
        In order to be able to apply stylings to multiple projects, this fields
        supports <mark>Regular Expressions (Regex)</mark>. In particular, that
        is
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
          target="_blank"
          >JavaScript Regular Expressions</a
        >. The value you enter is automatically wrapped with <code>/^</code> and
        <code>$/</code> in order to make sure styles are only applied to fully
        matching project IDs. To test an expression you can use the Webtool
        <a :href="getRegexExampleUrl('.*live.*')" target="_blank">regex101</a>
        to see whether the expression applies to the desired project IDs.
      </p>
      <h4>Examples:</h4>
      <ul>
        <li>
          <code
            ><a
              :href="getRegexExampleUrl('my-dev-project-191923')"
              target="_blank"
              >my-dev-project-191923</a
            ></code
          >
          Project IDs that exactly match this string
        </li>
        <li>
          <code
            ><a :href="getRegexExampleUrl('.*live.*')" target="_blank"
              >.*live.*</a
            ></code
          >
          All project IDs that contain the word live
        </li>
      </ul>
    </template>
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
          errorMessage: "This is not valid RegEx.",
        },
      ],
    };
  },
  methods: {
    getRegexExampleUrl(regex) {
      return `https://regex101.com/?flavor=javascript&flags=gm&regex=^${encodeURIComponent(
        regex
      )}$&testString=my-dev-project-191923%0Amy-live-project-191923%0Amy-sample-random-project-191923%0Amy-scnd-live-project-191923`;
    },
  },
};
</script>

<style>
input {
  margin: 0 0.5rem 0 0.5rem !important;
}

.regex-input {
  display: inline-flex;
  align-items: center;
}

.regex-prefix,
.regex-postfix {
  font-size: 1rem;
  color: var(--grey);
}
</style>
