<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="home-page window-height window-width column justify-center items-center q-gutter-xl"
      >
        <q-btn
          @click="$router.push('/free')"
          label="Ag Grid Community"
          color="brown-10"
        />

        <q-btn
          @click="$router.push('/enterprise')"
          label="Ag Grid Enterprise"
          color="brown-8"
        />

        <q-btn
          @click="$router.push('/stimulsoft')"
          label="Stimulsoft Report"
          color="brown-7"
        />

        <q-btn
          @click="$router.push('/active')"
          label="Active Report"
          color="brown-5"
        />

        <q-btn
          @click="$router.push('/tableau')"
          label="Tableau"
          color="brown-4"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>
