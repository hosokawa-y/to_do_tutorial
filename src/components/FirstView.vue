<template>
  <div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {SetupContext} from "@vue/runtime-core";


export default defineComponent({
  name: 'TravelMap',
  components: {
  },
  setup: (props, {attrs, slots, emit, expose}: SetupContext) => {
    return {
    }
  }
})
</script>

<style lang="scss">
.google_map_loader {
  //position: relative;
  max-width: 100%;
  //min-height: 200px;
  aspect-ratio: 1.777;
  //width: 100px;
  //height: 100px;
}

</style>
