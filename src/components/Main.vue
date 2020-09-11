<template>
  <div class="text-center py-4">
    <h1 class="text-grey-900 text-2xl py-4">m3m3</h1>
    <form @submit.prevent="getGifs">
      <input v-model="searchGif" placeholder="Search meme word ;)" class="border border-gray-500 shadow-lg outline-none rounded-full mx-2 px-3 py-1" type="text" />
      <button class="border border-gray-500 rounded-full shadow-lg px-4 py-1 outline-none text-gray-500 bg-gray-300 hover:bg-gray-200 hover:text-gray-700" @click="getGifs">Search</button>
    </form>


    <div class="flex flex-col pt-10">
        <div class="w-full lg:w-1/2 mx-auto" v-for="gif in gifs" :key="gif.id" @click="copyLink()" >
            <img class="p-2 rounded-lg shadow-2xl" :src="gif"/>
        </div>
    </div>
    <div class="flex flex-col pt-10">
      <div class="w-full lg:w-1/2 mx-auto" v-for="gif in gifs" :key="gif.id" @click="copyLink()" >
        <img class="p-2 rounded-lg shadow-2xl" :src="gif"/>
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
        url: ""
    };
  },

  created() {
    // this.getRandomGifs()
  },

  methods: {
      getGifs() {
          let url = `${process.env.VUE_APP_API}/search?&api_key=${process.env.VUE_APP_GIPHY_KEY}&q=${this.searchGif}&limit=${process.env.VUE_APP_LIMIT}`;
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
      getRandomGifs() {
        // gifs/random?api_key=Ou5M8sZ88o3dTxjP60xJkN84Ig4QJyKb&tag=&rating=g
        let url = `${process.env.VUE_APP_API}/trending?api_key=${process.env.VUE_APP_GIPHY_KEY}&limit=${process.env.VUE_APP_LIMIT}&rating=g`;

        axios.get(url).then(response => {
          // console.log(response.data.data.images)
          response.data.data.map(gif => {
            this.gifs = gif.images.original.url
            console.log(this.gifs);
          })
        })
      }
  },
};
</script>

<style></style>
