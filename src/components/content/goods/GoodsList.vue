<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key = "index" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    
  }
</script>

<style scoped>
    .goods {
    display: flex;
    flex-wrap: wrap;
    /* 换行 */
    justify-content: space-around;
    /* 均等分 */

    padding: 2px;
  }
</style>