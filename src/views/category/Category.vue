<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <side-list :side-list-data="sideListData" @selectItem="selectItem"></side-list>
      <scroll class="tab-content">
          <tab-content-category class="tab-content-category" :content-category-data="contentCategoryData"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"  @tabClick="tabClick"></tab-control>
          <goods-list :goods="categoryDetailData"></goods-list>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import SideList from './childComps/SideList'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabControl from '../../components/content/tabControl/TabControl'
  import CategoryDetail from './childComps/CategoryDetail'
  import GoodsList from '../../components/content/goods/GoodsList';
  import Scroll from '../../components/common/scroll/Scroll';

  import {getCategory, getSubcategory, getCategoryDetail} from "../../network/category"

  export default {
    name: "Category",
    components:{
      NavBar,
      SideList,
      TabContentCategory,
      TabControl,
      CategoryDetail,
      GoodsList,
      Scroll
    },
    data(){
      return {
        sideListData:[],
        contentCategoryData:[],
        goods: {
          'pop':{list: []},
          'new':{list: []},
          'sell':{list: []},
        },
        currentType: 'pop'
      }
    },
    created(){
      this.getCategory();
    },
    computed:{
      categoryDetailData(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      //网络请求相关方法
      getCategory() {
        //发送网络请求，请求多个数据
        getCategory().then(res =>{
          // console.log(res)
          // this.result = res;
          // console.log(res.data.category.list)
          this.sideListData = res.data.category.list;
          this.getSubcategory(0);
        })
      },
      getSubcategory(index) {
        //发送网络请求，请求多个数据
        let maitKey = this.sideListData[index].maitKey;
        getSubcategory(maitKey).then(res =>{
          // console.log(res)
          // this.result = res;
          // console.log(res);
          this.contentCategoryData = res.data.list;
          // console.log(res.data.list);
          // console.log(this.contentCategoryData);
          // console.log(this.sideListData[0].miniWallkey);
          this.getCategoryDetail('pop',index);
          this.getCategoryDetail('new',index);
          this.getCategoryDetail('sell',index);
          
        })
      },
      getCategoryDetail(type,index) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.sideListData[index].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      // console.log(res);
          // this.categoryDetailData = res
          this.goods[type].list = res
          // this.goods[type].list.push(...res)
        })
      },
      selectItem(index){
        this.getSubcategory(index);
      },
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
        // getCategoryDetail()
      }
    }
    
  }
</script>

<style scoped>
  .category{
    height: 100vh;
    /* overflow: hidden; */
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    /* overflow: hidden; */
    /* z-index: 10; */
    
  }
  .content{
     position: absolute;
    /* left: 0; */
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  .tab-content{
    overflow: hidden;
    /* flex: 1; */
    height: 100%;
    width: 275px;
  }
</style>