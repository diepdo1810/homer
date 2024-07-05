<template>
  <div class="columns is-multiline layout-vertical">
    <div class="column is-4">
      <h2 class="group-title">
        <i class="fa-fw fa-solid fa-music"></i>
        PerfectDay
      </h2>
      <Spotify />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.for-you-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
</style>

<script>
import Spotify from "./services/Spotify.vue";

export default {
  name: "DailyTracksCard",
  components: {
    Spotify,
  },
};
</script>
