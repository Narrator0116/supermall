<template>
  <swiper>
    <swiper-item class="swiper-item" v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt=""  @load="imageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js'

  export default {
    name: "DetailSwiper",
    props:{
      topImages:{
        type: Array,
        defult() {
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        // console.log('-----');
      }
    }
  }
</script>

<style scoped>
  .swiper-item{
    height: 50vh;
    overflow: hidden;
  }
</style>
