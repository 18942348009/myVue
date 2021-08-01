<template>
    <div ref="wrapper" >
      <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
    return {
        scroll:{}
    }
  },
  props:{
    scrollY:{
      type:Boolean,
      default(){
        return true
      }
    },
    probeType:{
      type:Number,
      default() {
        return 1;
      }
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
      //创建scroll对象
      //setTimeout(()=>{
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:true,
        pullUpLoad:this.pullUpLoad,
        hasVerticalScroll:true
      })

      //监听滚动事件
      if(this.probeType===2 || this.probeType === 3) {
        this.scroll.on('scroll', (pos) => {
          this.$emit("scrollmethod", pos)
        })
      }

      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        //touchEnd
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    //},2000)

  },
  methods:{
    scrollTo(x,y,time){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    refresh()
    {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp()
    {
      this.scroll && this.scroll.finishPullUp();
    }
  }
}


</script>

<style scoped>

</style>
