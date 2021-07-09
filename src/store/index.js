import Vue from "vue"
import Vuex from 'vuex'
import {mutationsType} from './mutations-type'

Vue.use(Vuex);

/*修改state原有的属性vuex可以做到响应式改变数据，如果属性式state里面没有的，这时候添加，如果需要做到响应式就可以用Vue.set*/
const  state = {
    students:[
      {name:'test01',age:10},
      {name:'test02',age:25},
      {name:'test03',age:18}
    ],
    message:'测试',
    msg:'测试异步方法'
}

const  store = new Vuex.Store({
  state,
  /*这个里面主要是修改state里面数据的。在修改的地方需要commit,只针对同步修改有效
   如果式移步修改，需要在action里面commit*/
  mutations:{
    /*方法名取在mutations-type.js里面定义的常量*/
    [mutationsType.modifyMessage](state,param){
      console.log(param)
      this.state.message = param
    },
    addStudent(state,stu)
    {
      console.log(stu)
      this.state.students.push(stu);
    },
    addAttr()
    {
      console.log("**************")
      /*Vue.set方法可以做到响应*/
      Vue.set(this.state.students,3,{name:'lisi',age:25})
      Vue.set(this.state,'color','red')

      //响应式删除一个属性
      Vue.delete(this.state,'message')
    },
    asynMeth(state,msg)
    {
      this.state.msg = msg ;
      console.log(msg)
    }
  },
  /*相当于vue里面的计算属性computed*/
  getters:{
     [mutationsType.fullname](state)
     {
       return function (msg){
         return msg
       }
     },
     [mutationsType.hellofun](state,getters)
     {
       return function (msg){
         let fullname = mutationsType.fullname;
         return getters.fullname('liuqing')+msg
       }
     }
  },
  actions: {
    asynMeth(context,msg)
    {
        //将处理结果异步返回出去
      return  new Promise((resolve, reject)=>{
        console.log("22222222:"+msg)
        context.commit('asynMeth',msg);
        resolve("异步测试成功");
      })
    }
  }

})

export  default  store
