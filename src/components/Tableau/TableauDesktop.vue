<template>
  <div
    class="tableauPlaceholder"
    ref="vizContainer"
    id="viz1710896379825"
    style="position: relative"
  >
    <noscript>
      <a href="#">
        <img
          alt="Improve Profits in the South"
          src="https://public.tableau.com/static/images/2F/2F4JS74G3/1.png"
          style="border: none"
        />
      </a>
    </noscript>
    <object class="tableauViz" style="display: none">
      <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
      <param name="embed_code_version" value="3" />
      <param
        name="path"
        value="views&#47;Book1_17108961851460&#47;ImproveProfitsintheSouth?:language=en-US&amp;:embed=true&amp;:sid="
      />
      <param name="toolbar" value="yes" />
      <param
        name="static_image"
        value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Bo&#47;Book1_17108961851460&#47;ImproveProfitsintheSouth&#47;1.png"
      />
      <param name="animate_transition" value="yes" />
      <param name="display_static_image" value="yes" />
      <param name="display_spinner" value="yes" />
      <param name="display_overlay" value="yes" />
      <param name="display_count" value="yes" />
      <param name="language" value="en-US" />
    </object>
    <div ref="vizElement" class="tableauViz" style="display: none"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    this.$nextTick(() => {
      const divElement = this.$refs.vizContainer;
      const vizElement = divElement.querySelector('object');

      vizElement.style.width = '1016px';
      vizElement.style.height = '991px';

      const scriptElement = document.createElement('script');
      scriptElement.src =
        'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode.insertBefore(scriptElement, vizElement);
    });
  },
});
</script>
