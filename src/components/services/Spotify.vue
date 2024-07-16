<template>
  <button class="custom-btn btn-12" @click="getRefreshToken">
    <span>Click!</span>
    <span>Read More</span>
  </button>
  <div class="content">
    <h3 class="group-title">Preview</h3>
    <div id="aplayer"></div>

    <h3 class="group-title">Full</h3>
    <div
      class="daily-meditate"
      v-for="(id, index) in ids"
      :key="id"
      v-show="currentIndex === index"
    >
      <iframe
        style="border-radius: 12px"
        :src="setSrc(id)"
        width="100%"
        height="152"
        title="Spotify Embed"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      >
      </iframe>
      <div class="text-center">
        <button @click="prev" :disable="currentIndex === 0">
          <img
            :src="
              currentIndex === 0
                ? 'assets/icons/previous.svg'
                : 'assets/icons/previous.svg'
            "
            alt="previous"
          />
        </button>
        <button @click="next" :disable="currentIndex === ids.length - 1">
          <img
            :src="
              currentIndex !== ids.length - 1
                ? 'assets/icons/next.svg'
                : 'assets/icons/next.svg'
            "
            alt="next"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily-meditate {
  display: flex;
  justify-content: space-between;
}
.text-center {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 1rem;
}
</style>

<script>
import { parse } from "yaml";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";

export default {
  name: "Spotify",
  data() {
    return {
      ids: [],
      currentIndex: 0,
      isLoading: false,
      clientId: "",
      clientSecret: "",
      endpoint: "",
      refreshToken: "",
      url: "",
    };
  },
  async created() {
    await this.getItems();
    await this.getShowDetails();
  },
  methods: {
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
    },
    getConfig(path = "assets/config.yml") {
      return fetch(path).then((response) => {
        if (response.status == 404 || response.redirected) {
          this.configNotFound = true;
          return {};
        }

        if (!response.ok) {
          throw Error(`${response.statusText}: ${response.body}`);
        }

        const that = this;
        return response
          .text()
          .then((body) => {
            return parse(body, { merge: true });
          })
          .then(function (config) {
            if (config.externalConfig) {
              return that.getConfig(config.externalConfig);
            }
            return config;
          });
      });
    },
    async getServiceApi(name = "Spotify") {
      return await this.getConfig().then((config) => {
        return config.api.find((item) => item.name === name);
      });
    },
    async getShowDetails() {
      const idWeb5ngay = localStorage.getItem("id_web5ngay") || "";
      const url = localStorage.getItem("url_spotify") || "";

      const payload = {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("access_token_spotify"),
        },
      };

      await fetch(`${url}/shows/${idWeb5ngay}`, payload)
        .then((response) => response.json())
        .then((data) => {
          new APlayer({
            container: document.getElementById("aplayer"),
            mini: false,
            autoplay: false,
            theme: "#FADFA3",
            loop: "all",
            order: "random",
            preload: "auto",
            volume: 0.7,
            listFolded: false,
            listMaxHeight: 90,
            lrcType: 3,
            audio: data.episodes.items.map((item) => ({
              name: item.name,
              artist: data.publisher,
              url: item.audio_preview_url,
              cover: item.images[1].url,
              theme: "#FADFA3",
            })),
          });

          const ids = data.episodes.items.map((item) => item.id);
          this.ids = ids;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async getItems() {
      const services = await this.getServiceApi();
      const config = services.items[0];

      this.clientId = config.clientId || "";
      this.clientSecret = config.clientSecret || "";
      this.endpoint = config.endpoint || "";
      this.refreshToken = config.refreshToken || "";

      localStorage.setItem("client_id_spotify", this.clientId);
      localStorage.setItem("client_secret_spotify", this.clientSecret);
      localStorage.setItem("endpoint_spotify", this.endpoint);
      localStorage.setItem("refresh_token_spotify", this.refreshToken);
      localStorage.setItem("url_spotify", services.url);
      localStorage.setItem("id_web5ngay", config.id);
    },
    async getRefreshToken() {
      const refreshToken = localStorage.getItem("refresh_token_spotify") || "";
      const url = this.endpoint + "/api/token" || "";

      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + btoa(`${this.clientId}:${this.clientSecret}`),
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      };

      const response = await fetch(url, payload)
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      if (response && response.access_token) {
        localStorage.setItem("access_token_spotify", response.access_token);
      } else {
        console.error("Failed to refresh token", response);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 20px;
}
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
/* 12 */
.btn-12{
  position: relative;
  right: 20px;
  bottom: 20px;
  border:none;
  box-shadow: none;
  width: 130px;
  height: 40px;
  line-height: 42px;
  -webkit-perspective: 230px;
  perspective: 230px;
}
.btn-12 span {
  background: rgb(0,172,238);
background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
  display: block;
  position: absolute;
  width: 130px;
  height: 40px;
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  border-radius: 5px;
  margin:0;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.btn-12 span:nth-child(1) {
  box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #0002,
   4px 4px 5px 0px #0001;
  -webkit-transform: rotateX(90deg);
  -moz-transform: rotateX(90deg);
  transform: rotateX(90deg);
  -webkit-transform-origin: 50% 50% -20px;
  -moz-transform-origin: 50% 50% -20px;
  transform-origin: 50% 50% -20px;
}
.btn-12 span:nth-child(2) {
  -webkit-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  transform: rotateX(0deg);
  -webkit-transform-origin: 50% 50% -20px;
  -moz-transform-origin: 50% 50% -20px;
  transform-origin: 50% 50% -20px;
}
.btn-12:hover span:nth-child(1) {
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  -webkit-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  transform: rotateX(0deg);
}
.btn-12:hover span:nth-child(2) {
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
 color: transparent;
  -webkit-transform: rotateX(-90deg);
  -moz-transform: rotateX(-90deg);
  transform: rotateX(-90deg);
}
</style>