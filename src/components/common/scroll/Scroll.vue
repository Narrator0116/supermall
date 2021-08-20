<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
  
</template>

<script>
  import BScroll from 'better-scroll'
  

  export default {
    name: "Scroll",
    props: {
      probeType:{
        type: Number,
        default:0,
      },
      pullUpLoad:{
        type: Boolean,
        default:false,
      }
    },
    data(){
      return {
        scroll: null,
      }
    },
    created(){
      // console.log('可以滑动啦');
    },
    mounted(){
      //1.创建BScroll对象      
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,//dom的渲染
        click:true,//使包含的按钮作用
        probeType: this.probeType,
        pullUpLoad:this.pullUpLoad,
        observeImage: true //每100ms自动调用refresh刷新
      })
      //2.实时监听滚动
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })
      // console.log(this.scroll);

      // this.scroll.refresh()

      // 3.监听上拉事件
      if(this.pullUpLoad) {//if判断是为了增加性能，减少运行次数
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
          // console.log("上拉加载更多");
          // this.$emit('pullingUp').finishPullUp//只能加载一次
          // this.$emit('pullingUp').finishPullUp()//能加载多次
        })
      }
      
    },
    
    methods: {
      // this.scroll.scrollTo(x,y,time);定位到(x,y)用多少时间，time可省略
      // this.scroll.scrollTo(0,0);
      scrollTo(x,y,time = 300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        // console.log('finishPullUp被调用');
       this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll? this.scroll.y : 0
      }
    }
    
  }
</script>

<style scoped>
</style>