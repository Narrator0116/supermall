import {
  ADD_COUNTER,
  ADD_TO_CART
}from './mutation-types'

export default {
  //mutations的唯一目的用来修改state的状态
  //mtations中的每个方法尽可能完成的事情比较单一一点
  // addCart(state, payload){
  //   // let oldProduct = null;
  //   // for(let item in state.cartList){
  //   //   if(item.iid === payload.iid){
  //   //     oldProduct = item;
  //   //   }
  //   // }
  //   // if(oldProduct){
  //   //   oldProduct.count +=1
  //   // }else{
  //   //   payload.count =1
  //   //   state.cartList.push(payload)
  //   // }

  //   // let product = state.cartList.find(function(item) {
  //   //   return item.iid === payload.iid
  //   // })
  //   //查找之前的数组中是否有该商品
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   if(oldProduct){
  //       oldProduct.count +=1
  //     }else{
  //       payload.count =1
  //       state.cartList.push(payload)
  //     }
  //   console.log(state.cartList)
  // }

  [ADD_COUNTER](state,payload){
    payload.count++
    // console.log(state.cartList)
  },
  [ADD_TO_CART](state, payload){
    payload.checked = true
    state.cartList.push(payload)
    // console.log(state.cartList)
  }
}