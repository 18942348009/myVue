<template>
  <div id="app">
    <router-view></router-view>
    <toolbar>
      <toolbaritem  active-color="deeppink">
        <img slot="slotimg-active" src="./assets/img/toolbar/home_active.svg"/>
        <img slot="slotimg" src="./assets/img/toolbar/home.svg"/>
        <div slot="slottext">
          首页
        </div>
      </toolbaritem>
      <toolbaritem path="/category" active-color="deeppink">
        <img slot="slotimg-active" src="./assets/img/toolbar/category_active.svg"/>
        <img slot="slotimg" src="./assets/img/toolbar/category.svg"/>
        <div slot="slottext">
          分类
        </div>
      </toolbaritem>
      <toolbaritem path="/shopcart" active-color="deeppink">
        <img slot="slotimg-active" src="./assets/img/toolbar/shopcart_active.svg"/>
        <img slot="slotimg" src="./assets/img/toolbar/shopcart.svg"/>
        <div slot="slottext">
          购物车
        </div>
      </toolbaritem>
      <toolbaritem path="/profile" active-color="deeppink">
        <img slot="slotimg-active" src="./assets/img/toolbar/profile_active.svg"/>
        <img slot="slotimg" src="./assets/img/toolbar/profile.svg"/>
        <div slot="slottext">
          我的
        </div>
      </toolbaritem>
    </toolbar>
  </div>
</template>

<script>
import toolbar from "./components/toolbar";
import toolbaritem from "./components/toolbaritem";
import axios from 'axios'
export default {
  name: 'App',
  components: {
    toolbar,
    toolbaritem
  }
}

axios({
  url:'http://123.207.32.32:8000/home/multidata'
}).then(res=>{
  console.log(res)
})
</script>

<style>
@import "./assets/css/base.css";
</style>
