import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const  home = ()=>import("../views/home/home");
const  category = ()=>import("../views/category/category");
const  shopcart = ()=>import("../views/shopcart/shopcart");
const  profile = ()=>import("../views/profile/profile");

/*解决重复点击路由报错问题*/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    name: "首页",
    path:"/home",
    component:home,
    meta:{
      title:"首页"
    }
  },
  {
    path:"/category",
    component:category,
    meta:{
      title:"分类"
    }
  },
  {
    path:"/shopcart",
    component:shopcart,
    meta:{
      title:"购物车"
    }
  },
  {
    path:"/profile",
    component:profile,
    meta:{
      title:"我的"
    }
  }
]

const router = new Router({
  mode:'history',
  linkActiveClass:'active',
  routes: routes
})

/*路由全局导航守卫（路由跳转前），也可以在单个路由i吗守卫，也可以在组件里面守卫
调用这个方法一定要执行一下next方法，不然会有问题。*/
router.beforeEach((to,from,next)=>{
  //console.log(to);
  window.document.title = to.meta.title;
  next();
})

export default router
