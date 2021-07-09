<template>
      <div class = "toolbaritem" @click = "itemclk">
        <div v-if="isActive">
          <slot name = "slotimg-active"></slot>
        </div>
        <div v-else >
          <slot name="slotimg"></slot>
        </div>
        <div :style="activeStyle">
          <slot name = "slottext"></slot>
        </div>
      </div>
</template>

<script>
export default {
  name: "toolbaritem",
  props:{
    path:{
      type:String,
      default:'/home'
    },
    activeColor: {
      type:String,
      default:'red'
    }
  },
  data(){
    return {activevalue : false}
  },
  methods:{
    itemclk(){
      this.$router.push(this.path)
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle()
    {
      return this.isActive?{color:this.activeColor}:{}
    }
  }
}
</script>

<style scoped>
@import "../assets/css/toolbar/toolbaritem.css";
</style>
