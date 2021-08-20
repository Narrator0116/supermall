<template>
  <scroll id="side-menu">
    <div class="side-list">
      <div class="item"  v-for="(item, index) in sideListData" :key="index" :class="{active: index===currentIndex}" @click="itemClick(index)">{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll';

  export default {
    name: "SideList",
    components:{
      Scroll
    },
    props:{
        sideListData:{
          type:Array,
          default (){
            return[]
          }
        }
      },
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('selectItem',index)
      }
    }
  }
</script>

<style scoped>
  #side-menu{
    background-color: #f6f6f6;
    overflow: hidden;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }
  .side-list{
    background-color: #f2f2f2;
    width: 100px;
  }
  .item{
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .item.active{
    font-weight: 700;
    background: white;
    color:var(--color-high-text);
    border-left: 3px solid var(--color-high-text);
  }
</style>