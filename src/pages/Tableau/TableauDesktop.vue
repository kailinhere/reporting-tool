<template>
  <tableau></tableau>
</template>

<script>
import { defineComponent } from 'vue';
import Tableau from 'src/components/Tableau/TableauDesktop.vue';

export default defineComponent({
  components: {
    Tableau,
  },
});
</script>
