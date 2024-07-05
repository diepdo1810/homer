<template>
  <div class="container">
    <div class="sub-container">
      <button @click="hoverPerfect">
        <span>
          <span class="container1">
            <span class="primary"></span>
            <span class="complimentary"></span>
          </span>
        </span>
        <span>Perfect Day</span>
      </button>
    </div>
    <div class="firm" v-if="isPefectDay">
      <iframe
        width="100%"
        height="700px"
        src="https://goplayer.me/embed?url=https://vip.opstream17.com/20240302/1835_f7d8e89e/index.m3u8"
        title="Perfect Day"
      ></iframe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-container {
  display: grid;
  place-items: center;
  justify-content: center;
}

button {
  height: 48px;
  padding: 0;
  display: grid;
  border-radius: 8px;
  letter-spacing: 0.25px;
  cursor: pointer;
  position: relative;
  background: #c5e4ea;
  color: white;
  font-weight: 80;
  scale: 2;
  outline-color: hsl(75 100% 45%);
  outline-offset: 0.25rem;
}

button:is(:hover, :focus-visible) {
  --active: 1;
}

button:active {
  --pressed: 1;
}

button > span:nth-of-type(1) {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  position: absolute;
  inset: 0;
  scale: calc(1 - (var(--pressed, 0) * 0.05));
  transition: scale 0.1s;
}

button:is(:hover, :focus-visible) .container1 {
  width: 100%;
}

.container1 {
  --mask-image: url(https://assets.codepen.io/605876/chev-mask_1.png);
  --spread: 24px;
  --size: 28px;
  width: 58px;
  height: 100%;
  background: #137dc2;
  position: absolute;
  left: 0;
  transition: width 0.25s;
  border-radius: 6px;
  box-shadow: 0 10px 10px -5px hsl(0 0% 0% / 0.5);
  container1-type: inline-size;
}

.primary {
  content: "";
  position: absolute;
  inset: 0;
  background: hsl(0 0% 0% / 0.15);
  z-index: 2;
  mask: var(--mask-image) 50% 50% / var(--size) var(--size) no-repeat;
  container1-type: inline-size;
}

:where(.primary, .complimentary)::after {
  --distance: calc(100cqi + 100%);
  content: "";
  height: calc(var(--size) * 4);
  aspect-ratio: 1;
  position: absolute;
  left: 0%;
  top: 50%;
  translate: -50% -50%;
  background: radial-gradient(hsl(0 0% 0%), transparent);
  animation: fly-by calc((2 - var(--active, 0)) * 1s) infinite linear;
}

@keyframes fly-by {
  0% {
    translate: -100% -50%;
  }
  100% {
    translate: var(--distance) -50%;
  }
}

.complimentary {
  content: "";
  position: absolute;
  inset: 0;
  opacity: var(--active, 0);
  transition: opacity 0.25s;
  background: hsl(0 0% 0% / 0.15);
  mask:
    var(--mask-image) calc(50% - (var(--spread) * 1)) 50% / var(--size)
      var(--size) no-repeat,
    var(--mask-image) calc(50% - (var(--spread) * 2)) 50% / var(--size)
      var(--size) no-repeat,
    var(--mask-image) calc(50% - (var(--spread) * 3)) 50% / var(--size)
      var(--size) no-repeat,
    var(--mask-image) calc(50% + (var(--spread) * 1)) 50% / var(--size)
      var(--size) no-repeat,
    var(--mask-image) calc(50% + (var(--spread) * 2)) 50% / var(--size)
      var(--size) no-repeat,
    var(--mask-image) calc(50% + (var(--spread) * 3)) 50% / var(--size)
      var(--size) no-repeat;
}

button > span:nth-of-type(2) {
  padding: 0 1.1rem 0 calc(58px + 1.1rem);
  display: grid;
  place-items: center;
  height: 100%;
  color: #6786b7;
  font-weight: bold;
}
</style>

<script>
export default {
  name: "PerfectDay",
  data() {
    return {
      isPefectDay: false,
    };
  },
  methods: {
    hoverPerfect() {
      this.isPefectDay = !this.isPefectDay;
    },
  },
};
</script>
