<template>
    <div class="daily-meditate" v-for="(id, index) in ids" :key="id" v-show="currentIndex === index">
        <iframe style="border-radius:12px" 
          :src="setSrc(id)" 
          width="100%" height="152" title="Spotify Embed" allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
        </iframe>
        <div class="text-center">            
            <button @click="prev" :disable="currentIndex === 0">
                <img :src="currentIndex === 0 ? 'assets/icons/previous.svg' : 'assets/icons/previous.svg'" alt="previous" />
            </button>
            <button @click="next" :disable="currentIndex === ids.length - 1">
                <img :src="currentIndex !== ids.length - 1 ? 'assets/icons/next.svg' : 'assets/icons/next.svg' " alt="next" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.text-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}
</style>

<script>
import { show } from '../../api/Spotify/show';

export default {
    name: 'Spotify',
    data() {
        return {
            show: null,
            ids: [],
            currentIndex: 0,
        }
    },
    async created() {
        this.show = await show();
        if (this.show && this.show.items) {
            this.getIds();
        }
    },
    watch: {
        show() {
            this.getIds();
        }
    },
    methods: {
        getIds() {
            this.ids = this.show.items.map(item => item.id);
        },
        setSrc(id) {
            return `https://open.spotify.com/embed/episode/${id}?utm_source=generator&theme=0&t=0`;
        },
        next() {
            if (this.currentIndex < this.ids.length - 1) {
                this.currentIndex++;
            }
        },
        prev() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        }
    }
}
</script>