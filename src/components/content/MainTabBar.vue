<template>
    <tab-bar>
      <tab-bar-item  active-color="deeppink">
        <img slot="slotimg-active" src="~assets/img/toolbar/home_active.svg"/>
        <img slot="slotimg" src="~assets/img/toolbar/home.svg"/>
        <div slot="slottext">
          首页
        </div>
      </tab-bar-item>
      <tab-bar-item path="/category" active-color="deeppink">
        <img slot="slotimg-active" src="~assets/img/toolbar/category_active.svg"/>
        <img slot="slotimg" src="~assets/img/toolbar/category.svg"/>
        <div slot="slottext">
          分类
        </div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart" active-color="deeppink">
        <img slot="slotimg-active" src="~assets/img/toolbar/shopcart_active.svg"/>
        <img slot="slotimg" src="~assets/img/toolbar/shopcart.svg"/>
        <div slot="slottext">
          购物车
        </div>
      </tab-bar-item>
      <tab-bar-item path="/profile" active-color="deeppink">
        <img slot="slotimg-active" src="~assets/img/toolbar/profile_active.svg"/>
        <img slot="slotimg" src="~assets/img/toolbar/profile.svg"/>
        <div slot="slottext">
          我的
        </div>
      </tab-bar-item>
    </tab-bar>
</template>


<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }

}
</script>

<style scoped>

</style>
