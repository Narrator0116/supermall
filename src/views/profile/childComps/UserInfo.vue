<template>
  <div class="user-info">
    <div class="user-info-content clear-fix">
      <div class="user-icon left">
        <img src="../../../assets/img/profile/user.png" alt="">
      </div>
      <div class="info-box left">
        <div class="login-register">登录/注册</div>
        <div class="phone">
          <img src="../../../assets/img/profile/phone.png" alt="">       
          <span class="txt">暂无绑定手机号</span>
          </div>
      </div>
      <div class="enter right">
          >
      </div>
    </div>
    
  </div>
  
</template>

<script>

  export default {
    name: "UserInfo",
    components: {
    }
  }
</script>

<style scoped>
  .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;             
  }
  .user-info{
    height: 90px;
    background-color: var(--color-tint);
    color: white;
  }
  .user-info-content{
    height: 90px;
    padding: 15px;
  }
  .info-box{
    margin:  10px 0 0 10px;
  }
  .phone{
    font-size: 13px;
    margin-top: 5px;
  }
  .phone .txt{
    line-height: 18px;
    float: right;
  }
  .user-icon{
    height: 60px;
    width: 60px;
    /* background-color: white; */
  }
  .enter{
    line-height: 60px;
  }
</style>
