<template>
  <div class="back-top">
    <img src="../../../assets/img/common/top.png" alt=""> 
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods:{
      // backClick(){
      //   // console.log('点击回到了顶部')
      //   this.$emit('backClick')//向父组件发送一个事件
      // }
    }
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 5px;
    bottom: 50px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>