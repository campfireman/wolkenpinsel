import "@fortawesome/fontawesome-free/css/all.min.css";
import "@picocss/pico/css/pico.classless.min.css";
import "@picocss/pico/css/pico.min.css";

import Vue from "vue";
import App from "./App.vue";

Vue.directive("click-outside", {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      let isRendered = () => {
        return (
          "rendered" in el.attributes &&
          el.attributes.getNamedItem("rendered").value == "true"
        );
      };

      // here I check that click was outside the el and his children
      if (isRendered() && !(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function (el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});
