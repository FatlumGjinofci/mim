<template>
  <div class="py-4">
      <p class="uppercase text-xl font-bold text-gray-900">Trending Gifs</p>
      <hooper :settings="hooperSettings"  class="h-auto outline-none py-6" pagination="no">
        <slide v-for="(gif, indx) in newGifs" :key="indx" :index="indx">
            <!-- {{ slide }} -->
            <img class="p-2 rounded-lg shadow-2xl" :src="gif.images.original.url" @click="copySrc"/>
        </slide>

        <hooper-navigation class="outline-none" slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
import axios from 'axios';
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
    components: {
        Hooper, 
        Slide,
        HooperNavigation
    },
    props: {
        gifs: Array
    },
    computed: {
        newGifs() {
            return this.gifs;
        }
    },

    data() {
        return {
            hooperSettings: {
                itemsToShow: 6,
                breakpoints: {
                    280: {
                        itemsToShow: 1
                    },
                    320: {
                        itemsToShow: 1
                    },
                    360: {
                        itemsToShow: 1
                    },
                    375: {
                        itemsToShow: 1
                    },
                    400: {
                        itemsToShow: 1
                    },
                    411: {
                        itemsToShow: 1
                    },
                    414: {
                        itemsToShow: 1
                    },
                    540: {
                        itemsToShow: 1
                    },
                    768: {
                        itemsToShow: 3
                    }
                }
            }
        }
    },
    methods: {
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
    }
}
</script>

<style>

</style>