<template>
  <div id="detail">
    
    <detail-nav-bar @titleClick="titleClick" ref="DetailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 属性topImage 传入值：top-image -->
      
       <!-- <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">{{item}}</li>
      </ul>  -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info class="DetailBaseInfo" :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommend" class="goods-list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from '../../components/common/scroll/Scroll';
  import GoodsList from '../../components/content/goods/GoodsList';
  import BackTop from '../../components/content/backTop/BackTop';
  
  import {debounce} from '../../assets/common/utils'
  import {itemListenerMixin, backTopMixin} from '../../assets/common/mixin'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'

  import {mapActions} from 'vuex'

  // import Toast from '../../components/common/toast/Toast';

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      BackTop,
      // Toast,
      GoodsList,
    },
    mixins:[itemListenerMixin, backTopMixin],
    //混入，解决大量代码重复问题
    data() {
      return {
        iid: null,
        // res:null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        commentInfo: {},
        recommend: [],
        // itemImgListener: null,
        themeTopYs:[],
        currentIndex: 0,
        // message:'',
        // show:false,
      }
    },
    created(){
      // console.log(this.$route.params.iid);
      // 保存存入的iid
      this.iid = this.$route.params.iid
      // console.log(this.iid);

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        // this.res = res
        // 1.获取顶部轮播数据
        this.topImages = res.result.itemInfo.topImages
        // console.log(this.topImages);

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        
        //3.获取商家信息
        this.shop = new Shop(data.shopInfo)

        //4.获取商品信息
        this.detailInfo = data.detailInfo;

        //5.取出参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        
        //6.取出参数的信息      
        if(data.rate.cRate !==0){
          this.commentInfo = data.rate.list[0];
        }

        getRecommend().then(res => {
          // console.log(res);
          this.recommend = res.data.list
          
        })
        
        // this.$nextTick(() => {
        //   //根据最新的数据，对应的DOM是已经被渲染出来
        //   //但是图片依然是没有被加载完（目前获取到的offsetTop是不包含图片的）
        //   // 一般offsetTop值不对的时候都是应为图片的问题
        //   setTimeout(() => {
        //     this.$refs.scroll.refresh();
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push((this.$refs.param.$el.offsetTop) - 44);
        //     this.themeTopYs.push((this.$refs.comment.$el.offsetTop) - 44);
        //     this.themeTopYs.push((this.$refs.recommend.$el.offsetTop) - 44);
        //     console.log(this.themeTopYs)
        //   },200);
          
        // })
        //防抖，给getthemeTopY赋值
        // this.getThemeTopY = debounce( ()=>{
          
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push((this.$refs.param.$el.offsetTop) - 44);
        //   this.themeTopYs.push((this.$refs.comment.$el.offsetTop) - 44);
        //   this.themeTopYs.push((this.$refs.recommend.$el.offsetTop) - 44);
        //   console.log(this.themeTopYs)
        // },100)
      })

      
    },
    mounted(){
       //3.监听item中图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 500);
      //this.itemImgListener = () =>{
         // refresh()
      // }
      // this.$bus.$on('itemImgLoad', this.itemImgListener )
      
      
    },
    methods:{
      // ...mapActions(['addCart']),
      ...mapActions({
        add: 'addCart'
      }),

      imageLoad(){
        // this.getThemeTopY()
        this.$refs.scroll.refresh();
        this.themeTopYs.push(0);
        this.themeTopYs.push((this.$refs.param.$el.offsetTop) - 44);
        this.themeTopYs.push((this.$refs.comment.$el.offsetTop) - 44);
        this.themeTopYs.push((this.$refs.recommend.$el.offsetTop) - 44);
        //在数组最后插入一个最大值
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs)
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],0); 
        
      },
      contentScroll(position){
        // console.log(position);
        // 获取y值
        const positionY = -position.y
        // 2.positionY和主题中的值进行对比
        for(let i in this.themeTopYs){
          // console.log(i);//str
          i = parseInt(i);
          // console.log(i);//str
          // console.log(this.themeTopYs[i]);
          // console.log(i)
          if(this.currentIndex!== i){
            // if((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i == (this.themeTopYs.length - 1) && positionY >= this.themeTopYs[i] )){
              if(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]){
              // console.log(i);
              this.currentIndex = i;
              // console.log(this.currentIndex);
              this.$refs.DetailNavBar.currentIndex = this.currentIndex
            } 
            
          }
          
        }
        this.listenShowBack(position)
      },
      addToCart(){
        // console.log('------');
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0],
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加到购物车中(1.Promise,mapActions)
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart',product)//传到mutations
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })//传到actions
        this.add(product).then(res => {
          console.log(res);
          // this.message = res;
          // this.show = true
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },1000);

          this.$toast.show(res, 2000);
        })
        //3.添加购物车成功

      }
    },
    deactivated(){
      //取消全局事件的监听
      // this.$bus.$off('itemImgLoad', this.itemImgListener)
      
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: white;
  }
  
  .content{
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
  ul{
    width: 100%;
  }
</style>
