<template>
    <div v-if="loading">
        <div class="for-you-row">
            <div v-for="track in tracks" :key="track.id" class="daily-recommend-card">
                <img :src="track.cover" alt="Cover" />
                <div class="container">
                    <div class="title-box">
                        <div class="title">
                            <span>{{ track.title }}</span>
                            <span>{{ track.artist }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button @click="playDailyTracksVn">
        play tracks
    </button>
</template>

<script>
export default {
    data() {
        return {
            tracks: [],
            url: '',
            loading: true,
        };
    },
    async mounted() {
        await this.loadDailyTracks();
        await this.playDailyTracksVn();
        console.log(this.tracks)
        console.log(this.url)
    },
    methods: {
        async loadDailyTracks() {
            const keywords = 'hkt';
            const url = `https://netease-cloud-music-api1.p.rapidapi.com/search?keywords=${keywords}&limit=1`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '823c4fa9d6msh8fcbfbe287db1adp1959c4jsn0ed30e4ff84b',
                    'X-RapidAPI-Host': 'netease-cloud-music-api1.p.rapidapi.com'
                }
            };

            const response = await fetch(url, options);
            this.tracks.push(await response.json());
        },
        async loadUrlTracks() {
            // download mp3:
            const url = 'https://netease-cloud-music-api1.p.rapidapi.com/song/url?id=431363022';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '823c4fa9d6msh8fcbfbe287db1adp1959c4jsn0ed30e4ff84b',
                    'X-RapidAPI-Host': 'netease-cloud-music-api1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                this.url = result.data[0].url;
            } catch (error) {
                console.error(error);
            }
        },
        playDailyTracksVn() {
            alert('playDailyTracksVn');
            // play mp3:
            const audio = new Audio();
            console.log(audio);
            audio.src = 'http://m701.music.126.net/20240702185402/a7a79c73856c12155a887a5c2bab3251/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/30562082361/9302/542b/3c2c/98ffac2bdda99021e3838773ac0c3a78.mp3';
            audio.play();
        }
    }
}
</script>