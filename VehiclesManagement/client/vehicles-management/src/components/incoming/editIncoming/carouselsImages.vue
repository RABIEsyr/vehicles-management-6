<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="(ind, i) in parseInt(imagesNumber + 1) "
      :key="i"
    >
      <v-sheet
       width="100%"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            <v-img :src="url + '/profile-image/' + messageId + '/' +senderId + '/' + i  + '.jpg'" alt="deleted"/>
            <v-img :src="'http://localhost:3000' + '/profile-image/' + messageId + '/' +senderId + '/' + i  + '.jpg'" alt="deleted"/>
            <!-- <v-img :src="'http://localhost:3000' + '/profile-image/' + messageId + '/' +senderId + '/' + i  + '.jpg'" alt="deleted"/> -->
            <!-- <img src="http://localhost:3000/profile-image/640afa6585909c13846b95fb/640afa4c85909c13846b95f8/0.jpg" alt=""> -->
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

</template>

<script>
import config from '../../../config/config'
var url = config.apiUrl;

export default {
    props: [
        'imagesNumber',
        'messageId',
        'senderId'
    ],
    date() {
        return {
            url: null
        }
    },
    mounted() {this.url = url},
    updated() {
        console.log('url', this.url)
    }

}
</script>

<style>

</style>