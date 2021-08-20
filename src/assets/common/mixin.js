//混入文件
import {debounce} from './utils';
import BackTop from '../../components/content/backTop/BackTop';
export const itemListenerMixin = {
  data() {
    return {
        itemImgListener: null
    }
  },
  // components:{
    
  // },methods:{

  // },
  mounted() {
     //3.监听item中图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 500);
      //this.itemImgListener = () =>{
         // refresh()
      // }
      // this.$bus.$on('itemImgLoad', this.itemImgListener )
      // console.log('我混入啦');
  }
}

export const backTopMixin = {
  

  components:{
    
    BackTop
  },

  data() {
    return {
      isShowBackTop: false,

    }
  },
  methods:{
    backClick(){
      //   //返回顶部
      //   // console.log('点击点击点击')
      //   //父访问子
        // this.$refs.scroll.scroll.scrollTo(0,0,500);
        this.$refs.scroll.scrollTo(0,0,500);
      },
      listenShowBack(position){
          this.isShowBackTop = (-position.y) > 1000
        },  
  }
}