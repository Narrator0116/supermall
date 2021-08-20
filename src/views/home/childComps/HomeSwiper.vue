<template>
  <swiper>
      <swiper-item v-for="(item, index) in banners.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
  </swiper>
</template>

<script>
// import Swiper from '../../../components/common/swiper/Swiper';
  // import SwiperItem from '../../../components/common/swiper/SwiperItem';
  import {Swiper, SwiperItem} from "../../../components/common/swiper";

  export default {
    name: "HomeSwiper",
    props:{
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        isLoad: false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods: {
        imageLoad() {
          if(!this.isLoad){
            setTimeout(() => {
              this.$emit('swiperImageLoad')
            },200);
            // console.log('-------');
            this.isLoad = true
          }
          
        }
    }
  }
</script>

<style scoped>

</style>