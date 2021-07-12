<template>
    <div class="tab-control">
      <div class="tabcontrolitem" v-for="(title,index) in titles" :key="index"
           @click="tabcontrolitemClk(index)"
           :class="{itemActive: currentIndex === index}">
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    tabcontrolitemClk(index){
      this.currentIndex = index;
      this.$emit("tabClick",index)
    }
  }
}
</script>

<style scoped>
 .tab-control{
   display: flex;
   font-size: 15px;
   width: 100%;
   text-align: center;
   line-height: 40px;
   height: 40px;
   background-color: #fff;
 }
 .tabcontrolitem{
   flex: 1;
 }
 .tabcontrolitem span {
   padding: 5px;
 }
 .itemActive{
   color: var(--color-high-text);
 }
 .itemActive span {
   border-bottom: 3px solid var(--color-tint);
 }
</style>
