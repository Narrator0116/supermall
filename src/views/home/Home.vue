<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type = "3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="LoadMore" >
        <!-- @pullingUp="LoadMore" -->
      <div ref="aaaaa"></div>
      <home-swiper :banners= "banners" ref="swiper" @swiperImageLoad="swiperImageLoad" />
        <recommend-view :recommends= "recommends" />
        <feature-view />
        <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件不能直接监听事件 -->
    <!-- 可以添加一个.native修饰符来监听事件 -->
    <!-- vue3删除了.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import NavBar from '../../components/common/navbar/NavBar';
  import TabControl from '../../components/content/tabControl/TabControl';
  import GoodsList from '../../components/content/goods/GoodsList';
  import Scroll from '../../components/common/scroll/Scroll';
  // import BackTop from '../../components/content/backTop/BackTop';

  import {getHomeGoods, getHomeMultidata} from "../../network/home";
  import {itemListenerMixin, backTopMixin} from '../../assets/common/mixin'
  import {debounce} from '../../assets/common/utils'
  //{没有default导出的需要添加这个大括号}
  export default {
    name: "Home",
    components:{
      HomeSwiper,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      RecommendView,
      Scroll,
      // BackTop
    },
    mixins:[itemListenerMixin],
    mixins:[backTopMixin],
    //混入，解决大量代码重复问题
    data(){
      return {
        // result: null,
        banners:[],
        recommends:[],
        goods: {
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0,
        // itemImgListener: null
      }
    },
    created(){
      // //发送网络请求，请求多个数据
      // getHomeMultidata().then(res =>{
      //   console.log(res)
      //   // this.result = res;
      //   this.banners = res.data.banner;
      //   this.recommends = res.data.recommend;
      // })
      this.getHomeMultidata()
      //请求商品数据
      // getHomeGoods('pop', 1).then(res =>{
      //   console.log(res)
      // })
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
    },
    mounted(){
      // console.log('我混没混入');
      // this.$refs.swiper ref绑定在组件中，那么通过this.$refs.refname能获取指定的这个组件对象
      // this.$refs.aaaaa ref绑定在在普通的元素中，那么通过this.$refs.refname能获取指定的这个元素对象

      //3.监听item中图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 500);
      // 
      //对监听事件的保存
      //this.itemImgListener = () =>{
      //   // console.log('----------');
      //   this.$refs.scroll.refresh()
      //   refresh()
      // }
      // this.$bus.$on('itemImgLoad',this.itemImgListener)

      
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      //事件监听相关方法
      //防抖
      // debounce(func, delay){
      //   let timer = null 
      //   return function (...args) {
      //     if(timer) clearTimeout(timer)
      //     timer =  setTimeout(() => {
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },
      tabClick(index){
        // console.log(index);
        switch(index){
          case 0: 
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;

        this.$refs.tabControl2.currentIndex = index;
      },
      // backClick(){
      //   //返回顶部
      //   // console.log('点击点击点击')
      //   //父访问子
      //   // this.$refs.scroll.scroll.scrollTo(0,0,500);
      //   this.$refs.scroll.scrollTo(0,0,500);
      // },
      contentScroll(position){
        // console.log(position)
        //判断返回顶部的图标出现与否
        // this.isShowBackTop = (-position.y) > 1000
        this.listenShowBack(position)
        //决定tabControl是否吸顶(position:fixed)
        // console.log(this.tabOffsetTop )
        this.isTabFixed = (-position.y) > this.tabOffsetTop 

      },
      // listenShowBack(position){
      //   this.isShowBackTop = (-position.y) > 1000
      // },
      LoadMore(){
        //上拉加载更多
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
        // console.log(this.$refs);
        // this.$ref.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        //获取tabControl的offset
        // console.log(this.$refs.tabControl2.offsetTop);//underfine
        //所有的组件都有一个属性$el ：用于获取组件中的元素
        // console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      //网络请求相关方法
      getHomeMultidata() {
        //发送网络请求，请求多个数据
        getHomeMultidata().then(res =>{
          // console.log(res)
          // this.result = res;
          this.banners = res.data.banner;
          this.recommends = res.data.recommend;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res =>{
          // console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // console.log(this.goods['pop'].list);
          this.$refs.scroll.finishPullUp()

        })
      },


    },
    activated(){
      // console.log('actived');
      //返回上次记录的点
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated(){
      // console.log('deactived');
      // console.log(this.saveY);
      // 记录离开的状态和位置
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      // this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
/* scoped在当前的作用域使用 */
  #home{
    /* padding-top:44px ; */
    height: 100vh;
    position: relative;

  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 在浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:9;  */
  }

  /* .tab-control { */
    /* 实现吸顶效果 有兼容性问题*/
    /* scroll组件使吸顶效果失效了 */
    /* position:sticky; */
    /* top:44px;
     z-index: 8;
    background-color: white; */
    
  /* } */
  /* .content {
    height: 300px;
    background-color: red;
    overflow: hidden;
  } */
  /* 俩种方案确定content定位与高度 */
  /* 方案1 */
  .content{
    /* height: 300px; */
    overflow:hidden;
    position: absolute;
    top: 44px;
    bottom:49px;
    left: 0;
    right: 0;
  }
  /* 方案2 */
  /* .content {
    margin-top:44px ;
    height: calc(100% - 93px);
    overflow:hidden;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>

