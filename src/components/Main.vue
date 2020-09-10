<template>
  <div class="text-center py-4">
    <h1 class="text-grey-900 text-2xl py-4">MiMe</h1>
    <form @submit.prevent="getGifs">
      <input v-model="searchGif" placeholder="Search meme word ;)" class="border border-gray-500 shadow-lg outline-none rounded-full mx-2 px-3 py-1" type="text" />
      <button class="border border-gray-500 rounded-full shadow-lg px-4 py-1 outline-none text-gray-500" @keyup.enter="getGifs">Search</button>
    </form>


    <div class="flex flex-col pt-10">
        <div class="w-full lg:w-1/2 mx-auto" v-for="gif in gifs" :key="gif.id">
            <img class="p-2 rounded-lg shadow-2xl" :src="gif" />
        </div>
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
