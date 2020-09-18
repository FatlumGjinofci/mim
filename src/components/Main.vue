<template>
  <div class="text-center py-4">
    <h1 class="text-grey-900 text-2xl py-4">m3m3</h1>
    <form @submit.prevent="searchGifs">
      <input v-model="query" placeholder="Search meme word ;)" class="border border-gray-500 shadow-lg outline-none rounded-full mx-2 px-3 py-1" type="text" />
      <button class="border border-gray-500 rounded-full shadow-lg px-4 py-1 outline-none text-gray-500 bg-gray-300 hover:bg-gray-200 hover:text-gray-700" @click="searchGifs">Search</button>
    </form>


    <div class="flex flex-col pt-10">
        <div class="w-full lg:w-1/2 mx-auto" v-for="gif in gifs" :key="gif.id" @click="copySrc">
            <img class="p-2 rounded-lg shadow-2xl" :src="gif.images.original.url"/>
<!--            <div>{{ src }}</div>-->
        </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      src: "",
      query: "",
      gifs: null,
      trendingGifs: null,
      url: "",
    };
  },

  methods: {
      searchGifs() {
        this.url = `${process.env.VUE_APP_API}/search?api_key=${process.env.VUE_APP_GIPHY_KEY}&q=${this.query}&limit=${process.env.VUE_APP_LIMIT}`;

        fetch(this.url)
            .then(response => response.json())
            .then(data => this.gifs = data.data)
      },

      getTrendingGifs() {
        this.url = `${process.env.VUE_APP_API}/trending?api_key=${process.env.VUE_APP_GIPHY_KEY}`

        fetch(this.url)
              .then(response => response.json())
              .then(data => this.gifs = data.data);
      },
    copySrc: function(img){
      this.src = img.srcElement.src;

      // this.$clipboard(this.src);

      axios({url: this.src, method: 'GET', responseType: 'blob'})
        .then((response) => {
          let fileUrl = window.URL.createObjectURL(new Blob([response.data]))
          let fileLink = document.createElement('a')

          fileLink.href = fileUrl

          fileLink.setAttribute('download', 'img.gif')
          document.body.appendChild(fileLink)

          fileLink.click()
        })
    }
  },
  created() {
    this.getTrendingGifs();
  }
};
</script>

<style></style>
