<template>
  <div id="home" >
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" class="tab-control"></tab-control>
    <good-list :goods="getGoodsList"></good-list>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li>11</li>
    <li>11</li>
    <li>11</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>33</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
    <li>44</li>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper'

import {queryDataOfHome,getGoodListOfHome} from "../../network/home/home";

import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "../../components/content/TabControl";
import GoodList from "../../components/content/goods/GoodList";


export default {
  name: "Home",
  components: {
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
        news:{
          page:0,
          list:[]
        },
        sell:{
          page:0,
          list:[]
        }
      },
      currentType:"pop"
    }
  },
  created() {
    // 1.请求多个数据
    queryDataOfHome().then(res => {
      console.log(res)
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })

    this.queryGoodsList("1",this.currentType)
  },
  methods:{
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "news";
          break;
        case 2:
          this.currentType = "sell";
          break
      }
    },
    queryGoodsList(page,currentType)
    {
      getGoodListOfHome(page,currentType).then(res =>{
         this.goodList[currentType].list.push(...res.data.list)
      })
    }
  },
  computed:{
    getGoodsList() {
      console.log(this.goodList[this.currentType].list)
      return this.goodList[this.currentType].list
    }
  }
}
</script>
<style scoped>
#home{
  height: 100vh;
  position: relative;
  padding-top: 44px;
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
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>

