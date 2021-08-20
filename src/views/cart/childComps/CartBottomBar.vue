<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/common/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        // return '￥' + this.$store.state.cartList.filter(item => {
          return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        // return this.$store.state.cartList.filter(item => item.checked).length
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){ 
        if(this.cartList.length ===0) return false
          //使用filter
          //return !(this.cartList.filter(item => !item.checked).length)
          //使用find
          return !this.cartList.find(item => !item.checked)
        
        // 使用遍历 
        // for(let item of this.cartList) {
        //   if(!item.checked){
        //     return false
        //   }
        // }
        // return true    
      },
      
    },
    methods:{
      checkClick() {
        // console.log('checkClick');
        if(this.isSelectAll){//全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {//部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
        // this.cartList.forEach(item => item.checked = !this.isSelectAll)//简写，但会出现问题
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品', 2000);
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    line-height: 40px;
  }
  .check-content {  
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 100px;
    background-color: red;
    color: white;
    text-align: center;
  }
</style>
