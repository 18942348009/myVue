<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <grid-view :recommendlist="recommendlist" :cols="2">
      <good-list-items v-for="(item,index) in recommendlist"  :key="index" :goodsItem="item"></good-list-items>
    </grid-view>
  </div>
</template>

<script>
  import GoodListItems from "components/content/goods/GoodListItems";
  import GridView from "components/common/gridView/GridView";
	export default {
		name: "DetailRecommendInfo",
    components: {
		  GridView,
      GoodListItems
    },
    props: {
      recommendlist: {
		    type: Array
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
    background-color: #f2f5f8;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
