<template>
    <NeteaseCloudMusic />
    <div class="for-you-row">
        <div class="daily-recommend-card" @click="goToDailyTracks">
            <img :src="coverUrl" loading="lazy" alt="" />
                <div class="container">
                <div class="title-box">
                    <div class="title">
                    <span>Every</span>
                    <span>Day</span>
                    </div>
                </div>
            </div>
            <button class="play-button" @click.stop="playDailyTracksVn">
                <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 5 5" enable-background="new 0 0 100 100" xml:space="preserve"><g><path d="M3.849 2.5c0 -0.042 -0.024 -0.079 -0.058 -0.098L1.327 0.98a0.112 0.112 0 0 0 -0.064 -0.02 0.112 0.112 0 0 0 -0.112 0.112c0 0.004 0.001 0.008 0.001 0.013h-0.001v2.857h0.001a0.112 0.112 0 0 0 0.111 0.1 0.11 0.11 0 0 0 0.056 -0.015l0.001 0.002L3.794 2.599l-0.001 -0.002A0.112 0.112 0 0 0 3.849 2.5"/></g></svg> 
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.for-you-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}
.daily-recommend-card {
  border-radius: 1rem;
  height: 198px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: move 38s infinite;
  animation-direction: alternate;
  z-index: -1;
}

.container {
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.28));
  height: 198px;
  display: flex;
  align-items: center;
  border-radius: 0.94rem;
}

.title-box {
  height: 148px;
  width: 148px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  user-select: none;
  .title {
    height: 100%;
    width: 100%;
    font-weight: 600;
    font-size: 30px;
    line-height: 48px;
    opacity: 0.96;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    place-items: center;
  }
}

.play-button {
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  position: absolute;
  right: 1.6rem;
  bottom: 1.4rem;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 44px;
  transition: 0.2s;
  cursor: default;

  .svg-icon {
    margin-left: 4px;
    height: 16px;
    width: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.44);
  }
  &:active {
    transform: scale(0.94);
  }
}

@keyframes move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>

<script>
import NeteaseCloudMusic from "./services/NeteaseCloudMusic.vue";

const defaultCovers = [
  'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg',
  'https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg',
  'https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg',
];

export default {
  name: "DailyTracksCard",
  components: {
    NeteaseCloudMusic,
  },
  props: {
    coverUrl: String,
  },
  methods: {
    goToDailyTracks() {
      this.$router.push({ name: "DailyTracks" });
    },
    playDailyTracksVn() {
      this.$store.dispatch("playDailyTracksVn");
    },
  },
};
</script>