<template>
  <FirstView class="travel-map"/>
</template>

<script>
import FirstView from "./components/FirstView.vue";

export default {
  name: 'App',

  components: {
    TravelMap,
  },
}
</script>

<style lang="scss" scoped>
.travel-map {
  height: 800px;
}
</style>

