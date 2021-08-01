<template>
  <div class="goodListItem">
    <img :src="getImg" alt="" @load="imageLoad" @click="goDetail(goodsItem.iid)">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItems",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{

    //防止t图片没加载导致滚动计算不到正确到高度
    imageLoad()
    {
      let path = this.$route.path;
      if ("/home" == path || "/" == path) {
        this.$bus.$emit('itemImageLoad')   //通过事件总线调用
      }else if ("/detail" == path)
      {
        this.$bus.$emit('itemImageLoadDetail')
      }
    },
    goDetail(iid)
    {
      this.$router.push({
        path:"/detail",
        query: {
          iid:iid
        }
      })
    }
  },
  computed: {
    getImg() {

      if(this.goodsItem.img)
      {
        return  this.goodsItem.img;
      }
      else if(this.goodsItem.image )
      {
        return this.goodsItem.image;
      }else if(this.goodsItem.show.img)
      {
        return this.goodsItem.show.img
      }
      else {
        return ""
      }

    }
  }
}
</script>

<style scoped>
 .goodListItem{
   padding-bottom: 40px;
   position: relative;
   width: 48%;
 }
 .goodListItem img {
   width: 100%;
   height: 20vh;
   border-radius: 5px;
 }

 .goods-info {
   font-size: 12px;
   position: absolute;
   bottom: 5px;
   left: 0;
   right: 0;
   overflow: hidden;
   text-align: center;
 }

 .goods-info p {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   margin-bottom: 3px;
 }

 .goods-info .price {
   color: var(--color-high-text);
   margin-right: 20px;
 }

 .goods-info .collect {
   position: relative;
 }

 .goods-info .collect::before {
   content: '';
   position: absolute;
   left: -15px;
   top: -1px;
   width: 14px;
   height: 14px;
   background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
 }
</style>
