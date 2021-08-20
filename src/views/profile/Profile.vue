<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">个人中心</div>
    </nav-bar>
    <user-info></user-info>
    <section class="account">
      <div class="account_item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="info">我的余额</div>
      </div>
      <div class="account_item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="info">我的优惠</div>
      </div>
      <div class="account_item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="info">我的积分</div>
      </div>
    </section>
    <list-view :list-data ="orderList"></list-view>
    <list-view :list-data ="serviceList"></list-view>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'


  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    data(){
      return {
		    orderList: [
          {url:'message.png', info: '我的消息'},
          {url:'mall.png', info: '积分商城'},
          {url:'VIP.png', info: '会员卡'},
        ],
        serviceList: [
          {url:'cart.png', info: '我的购物车'},
          {url:'app.png', info: '下载购物APP'},
        ]
      }
    },
  }
</script>

<style scoped>
  .profile {
    background-color: #f2f2f2;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
  }
  .account{
    display: flex;
    font-size: 13px;
  }
  .account_item{
    margin-right: 1px;
    padding: 18px;
    text-align: center;
    width: 100%;
    height: 83px;
    background: white;
  }
  .number{
    margin-bottom: 6px;
  }
  .balance{
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
</style>
