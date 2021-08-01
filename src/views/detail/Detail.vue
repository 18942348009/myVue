<template>
  <div id="decapitate">
    <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']" class="navbar" ref="detailNavBar"
                    :current-index="currentIndex" @detailItemClk="detailItemClk"></detail-nav-bar>
    <scroll  ref="scroll"  :probe-type="3" :pull-up-load="true" class="content"
    @scrollmethod="scrollmethod">
      <div>
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ref="base"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo" ></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo" ></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommendlist="recommendlist" ></detail-recommend-info>
      </div>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childcomps/DetailNavBar";
import {getGoodDetailById,Goods,Shop,GoodsParam,getRecommend} from "network/detail/detail"
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamInfo from "./childcomps/DetailParamInfo";
import DetailRecommendInfo from "./childcomps/DetailRecommendInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
import Scroll from "components/common/bsscroll/Scroll";

import {debounce} from "common/util"

export default {
  name: "Detail",
  data() {
    return{
      topImages: [],
      goods: {},
      shop:{},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendlist:[],
      themeTops: [],
      currentIndex: 0
    }
  },
  components : {
    Scroll,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar
  },
  created() {
    getGoodDetailById(this.$route.query.iid).then((res)=>{
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      //console.log(this.topImages.length)
      // 2.3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo

      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    this._getRecommend();

  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on('itemImageLoadDetail', () => {
      refresh()
    })
    this.$bus.$on('itemImageLoadGood', () => {
      refresh()
    })

  },
  updated() {
    this._getOffsetTops();
  },
  methods:{
    _getOffsetTops() {
      this.themeTops = []
      this.themeTops.push(this.$refs.base.$el.offsetTop)
      this.themeTops.push(this.$refs.param.$el.offsetTop)
      this.themeTops.push(this.$refs.comment.$el.offsetTop)
      this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      this.themeTops.push(Number.MAX_VALUE)
    },
    _getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendlist = res.data.list
      })
    },
    scrollmethod(pos)
    {
      this._listenScrollTheme(-pos.y);
    },
    _listenScrollTheme(position) {
      let length = this.themeTops.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.themeTops[i];
        if (position >= iPos && position < this.themeTops[i+1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break;
        }
      }
    },
    detailItemClk(idx)
    {
      this.$refs.scroll.scrollTo(0, -this.themeTops[idx], 100);
    }
  }
}
</script>

<style scoped>
#decapitate{
  position: relative;
  height: 100vh;
  z-index: 1;
  background-color: #fff;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;
}
.navbar{
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
