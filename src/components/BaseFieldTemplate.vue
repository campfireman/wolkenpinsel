<template>
  <label
    >{{ label }}
    <slot />
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
  props: ["label", "validationErrors"],
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
