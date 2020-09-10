<template>
  <div>
    <h1>MiM</h1>
    <form @submit.prevent="getGifs">
      <input v-model="searchGif" type="text" />
      <button class="button" @keyup.enter="getGifs">Search</button>
    </form>

    <div class="">
      <img v-for="gif in gifs" :src="gif" :key="gif.id" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchGif: "",
      gifs: [],
    };
  },

  methods: {
    getGifs() {
      let apiKey = "dc6zaTOxFJmzC";
      let searchEndPoint = "https://api.giphy.com/v1/gifs/search?";
      let limit = 5;

      let url = `${searchEndPoint}&api_key=${apiKey}&q=${this.searchGif}&limit=${limit}`;

      axios
        .get(url)
        .then((response) => {
          this.buildGifs(response);
        })

        .catch((error) => console.log(error));
    },

    buildGifs(json) {
      this.gifs = json.data.data
        .map((gif) => gif.id)
        .map((gifId) => {
          return `https://media.giphy.com/media/${gifId}/giphy.gif`;
        });
    },
  },
};
</script>

<style></style>
