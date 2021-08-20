<template>
  <div class="tab-content-category">
    <div class="grid-view">
      <div class="item" v-for="(item, index) in contentCategoryData" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" class="img">
          <div class="txt">{{item.title}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabContentCategory",
    props:{
        contentCategoryData:{
          type:Array,
          default (){
            return[]
          }
        }
      },
    components:{
    },
  }
</script>

<style scoped>
  .grid-view{
    padding: 5px 10px;
    display: flex;
    flex-wrap: wrap;
    /* 换行 */
    /* justify-content: space-around; */
    /* width: 275px; */
  }
  .item{
    margin-top: 15px;
    width: 77px;
    text-align: center;
    margin: 0 4px;
  }
  .item .img{
    width: 80%;
  }
  .txt{
    margin-top: 15px;
    font-size: 12px;
  }
</style>