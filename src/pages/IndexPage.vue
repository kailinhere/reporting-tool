<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="home-page window-height window-width column justify-center items-center q-gutter-xl"
      >
        <q-btn
          @click="$router.push('/free')"
          label="Ag Grid Community"
          color="blue-grey-7"
        />

        <q-btn
          @click="$router.push('/enterprise')"
          label="Ag Grid Enterprise"
          color="blue-grey-5"
        />

        <q-btn
          @click="$router.push('/stimulsoft')"
          label="Stimulsoft Report"
          color="blue-grey-5"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
