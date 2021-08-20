<template>
  <div class="category-detail">
    <div class="item"  v-for="(item, index) in categoryDetailData" :key="index">
      <img :src="item.img" alt="">
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryDetail",
    components:{
    },
    props:{
        categoryDetailData:{
          type:Array,
          default (){
            return[]
          }
        }
      },
    data(){
      return {
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped>
  
</style>