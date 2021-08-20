<template>
  <div class="list-view">
      <div class="item" v-for="(item, index) in listData" :key="index">      
        <img :src="require('assets/img/profile/'+item.url+'')" alt="" class="img">        
        <div class="info">{{item.info}}</div>
      </div>
  </div>
</template>

<script>

  export default {
    name: "ListView",
    components: {
      
    },
    props:{
        listData:{
          type:Array,
          default (){
            return[]
          }
        }
      }
  }
</script>

<style scoped>
  .list-view{
    margin-top: 12px;
    background: white;
  }
  .item{
    position: relative;
    height: 44px;
  }
  .img{
    position: absolute;
    top: 50%;
    left: 16px;
    margin-top: -8px;
    /* background: pink; */
    height: 18px;
    width: 18px;
  }
  .info{
    margin-left:40px;
    padding-left: 5px;
    border-bottom: 1px solid #f2f2f2;
    height: 44px;
    line-height: 44px;
  }
</style>
