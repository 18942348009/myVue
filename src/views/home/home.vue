<template>
  <div id="home" >
    <nav-bar class="home-nav"><div slot="center">小小购物</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" class="tab-control" ref="tabcontrol1"
                 v-show="isTabFixed"></tab-control>

    <scroll  ref="scroll" class="content" :probe-type="3"
             @scrollmethod="scrollmethod"
             :pull-up-load="true"
             @pullingUp="loadMore">
       <div>
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick" ref="tabcontrol"></tab-control>

        <good-list :goods="getGoodsList"></good-list>
       </div>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow" class="back-top"></back-top>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
import HomeSwiper from 'views/home/childComps/HomeSwiper'

import {queryDataOfHome,getGoodListOfHome} from "network/home/home";

import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";
import TabControl from "components/content/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/bsscroll/Scroll";
import BackTop from "components/common/backtop/BackTop";
import {debounce} from "common/util"


export default {
  name: "Home",
  components: {
    BackTop,
    Scroll,
    GoodList,
    TabControl,
    FeatureView,
    RecommendView,
    NavBar,
    HomeSwiper
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goodList:{
         pop:{
            page:0,
            list:[]
         },
        new:{
          page:0,
          list:[]
        },
        sell:{
          page:0,
          list:[]
        }
      },
      currentType:"pop",
      isShow:false,
      isTabFixed:false,
      tabControlPos:0
    }
  },
  created() {
    // 1.请求多个数据
    queryDataOfHome().then(res => {
      if(res.data) {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }
    })

    this.queryGoodsList(this.currentType)
  },
  methods:{
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol.currentIndex = index;
      this.queryGoodsList(this.currentType);
    },
    queryGoodsList(currentType)
    {
      this.goodList[currentType].page++;
      getGoodListOfHome(this.goodList[currentType].page,currentType).then(res =>{
        res && res.data && res.data.list && this.goodList[currentType].list.push(...res.data.list)
        this.finishPullUp();
      })
    },
    backTop()
    {
      this.$refs && this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 500);//回到顶部
    },
    scrollmethod(pos)
    {
       this.isShow = (-pos.y)>800
      this.isTabFixed=(-pos.y)>this.tabControlPos;

    },
    refresh() {
      if(this.$refs && this.$refs.scroll) {
        this.$refs.scroll.refresh();
      }
    },
    finishPullUp()
    {
      this.$refs.scroll.finishPullUp()
    },
    loadMore()
    {
        console.log("加载更多了")
        this.queryGoodsList(this.currentType);
    }
  },
  computed:{
    getGoodsList() {
      return this.goodList[this.currentType].list;//获取当前类别数据
    }
  },
  mounted() {
    //实时监听图片是否有被加载，图片里面用了load事件
    /*this.$bus.$on('itemImageLoad', () => {
      setTimeout(()=>{
        this.refresh();
      },'50')
    })*/
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

  },
  updated() {
    this.tabControlPos = this.$refs.tabcontrol.$el.offsetTop
  }
}
</script>
<style scoped>
#home{
  position: relative;
  height: 100vh;
  background-color: #fff;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: relative;
  top: 44px;
  z-index: 2;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>

