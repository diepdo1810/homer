<template>
    <button :class="class" @click="togglePlay">
        <img :src="isPlaying ? 'assets/icons/pause.svg' : 'assets/icons/play.svg' " :alt="isPlaying ? 'Pause tracks' : 'Play tracks' ">
    </button>
</template>

<script>
import { search, getSongUrl } from '../../api/NeteaseCloudMusic/others';

export default {
    name: "NeteaseCloudMusic",
    props: {
        class: {
            type: String,
            default: 'play-button'
        }
    },
    data() {
        return {
            tracks: [],
            urls: [],
            ids: [],
            loading: true,
            isPlaying: false,
            audio: null
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
        }
    },
    methods: {
        async loadDailyTracks() {
            const response = await search({ keywords: 'HKT', limit: 1 });
            this.tracks = response.result.songs;
        },
        async loadUrlTracks() {
            const tracks = this.tracks;
            const ids = tracks.map(track => track.id);
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
        }
    }
}
</script>