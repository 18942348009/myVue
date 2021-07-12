<template>
  <div class="goodList">
    <good-list-items v-for="(item,index) in goods"  :key="item.iid" :goodsItem="item"></good-list-items>
  </div>
</template>

<script>
import GoodListItems from "./GoodListItems";
export default {
  name: "GoodList",
  components: {GoodListItems},
  props:{
    goods:{
      type:Array,
      default()
      {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goodList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
    padding-right: 2px;
  }
</style>
