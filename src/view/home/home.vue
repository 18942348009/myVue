<template>
  <div>
    首页
    {{$store.state.students}}
    <h2>{{$store.state.message}}</h2>
    <h2>{{$store.state.color}}</h2>
    <button @click="modifyMessage()">修改消息</button>
    <button @click="addStu()">添加学生</button>
    <button @click="addAttr()">添加属性</button>
    <button @click="asynMeth()">异步提交</button>
    <h2>打招呼：{{$store.getters.hellofun('你好')}}</h2>
  </div>
</template>

<script>
import {mutationsType} from "../../store/mutations-type";

export default {
  name: "home",
  methods:{
    [mutationsType.modifyMessage]() {

      this.$store.commit(mutationsType.modifyMessage,'liuqing')
    },
    addStu(){
      let stu1 = {name:'zhangsan',age:'22'};
      this.$store.commit("addStudent",stu1)
    },
    addAttr()
    {
      this.$store.commit("addAttr")
    },
    asynMeth(){
      console.log("11111111")
      /*异步修改数据，并把结果回调*/
      this.$store.dispatch('asynMeth','测试异步提交').then((res)=>{
          console.log(res)
      }).catch((e)=>{
          console.log("异常:"+e)
      })
    }
  }
}
</script>

<style scoped>

</style>
