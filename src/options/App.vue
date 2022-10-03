<template>
  <main>
    <article>
      <header>GCP colors</header>
      <GcpStyleFormset />
    </article>
  </main>
</template>

<script>
import GcpStyleFormset from "@/components/GcpStyleFormset.vue";

export default {
  name: "App",
  components: { GcpStyleFormset },
};
</script>

<style>
:root {
  --green: #43a047;
  --light-green: #7cb342;
  --lime: #c0ca33;
  --yellow: #fdd835;
  --amber: #ffb300;
  --orange: #fb8c00;
  --deep-orange: #f4511e;
  --red: #e53935;
  --pink: #d81b60;
  --purple: #8e24aa;
  --deep-purple: #5e35b1;
  --indigo: #3949ab;
  --blue: #1e88e5;
  --light-blue: #039be5;
  --cyan: #00acc1;
  --teal: #00897b;
  --grey: #757575;
  --blue-grey: #546e7a;
}

header {
  font-size: 2em;
}

.material-symbols-outlined {
  display: inline-flex;
  vertical-align: top;
}
</style>
