<!-- <style lang="scss" scoped>
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

<template>
  <div class="daily-recommend-card">
    <img :src="coverUrl" loading="lazy" alt="" />
    <div class="container">
      <div class="title-box">
        <div class="title">
          <span>Every</span>
          <span>Day</span>
        </div>
      </div>
    </div>
    <button class="play-button" @click="togglePlay">
      <img
        :src="isPlaying ? 'assets/icons/pause.svg' : 'assets/icons/play.svg'"
        :alt="isPlaying ? 'Pause tracks' : 'Play tracks'"
      />
    </button>
  </div>
</template>

<script>
import { search, getSongUrl } from "../../api/NeteaseCloudMusic/others";

const defaultCovers = [
  "https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg",
  "https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg",
  "https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg",
];

export default {
  name: "NeteaseCloudMusic",
  props: {
    class: {
      type: String,
      default: "play-button",
    },
  },
  computed: {
    coverUrl() {
      // random cover:
      return (
        defaultCovers[Math.floor(Math.random() * defaultCovers.length)] +
        "?param=1024y1024"
      );
    },
  },
  data() {
    return {
      tracks: [],
      urls: [],
      ids: [],
      loading: true,
      isPlaying: false,
      audio: null,
    };
  },
  async mounted() {
    await this.loadDailyTracks();
    await this.loadUrlTracks();
  },
  watch: {
    isPlaying(newVal) {
      if (newVal) {
        this.playDailyTracksVn();
      } else {
        this.stopDailyTracksVn();
      }
    },
  },
  methods: {
    async loadDailyTracks() {
      const response = await search({ keywords: "HKT", limit: 1 });
      this.tracks = response.result.songs;
    },
    async loadUrlTracks() {
      const tracks = this.tracks;
      const ids = tracks.map((track) => track.id);
      this.ids.push(ids);
      // download mp3:
      for (const id of ids) {
        const response = await getSongUrl(id);
        this.urls.push(response.data[0].url);
      }
    },
    playDailyTracksVn() {
      // start playing the tracks:
      if (!this.audio) {
        this.audio = new Audio();
      }
      if (this.urls.length > 0) {
        this.audio.src = this.urls[0];
        this.audio.play();
      }
    },
    stopDailyTracksVn() {
      // stop playing the tracks:
      if (this.audio) {
        this.audio.pause();
      }
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
    },
  },
};
</script> -->
