<template>
  <div class="container">
    <div class="for-you-row">
        <NeteaseCloudMusic />
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
import NeteaseCloudMusic from "./services/NeteaseCloudMusic.vue";
import Spotify from "./services/Spotify.vue";

export default {
  name: "DailyTracksCard",
  components: {
    NeteaseCloudMusic,
    Spotify,
  },
};
</script>