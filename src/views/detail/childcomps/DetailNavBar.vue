<template>
   <nav-bar>
     <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg">
      <div slot="center" class="title">
        <span v-for="(item,index) in titles" :key="index" class="detail-item"
              @click="detailItemClk(index)"   :class="{'itemActive': index===currentIndex}">
          {{item}}
        </span>
      </div>
   </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  props:{
    titles:{
      type:Array,
      default:()=>{
        return []
      }
    },
    currentIndex:{
      type:Number,
      default:()=>{
        return 0
      }
    }
  },

  methods:{
    backClick(){
      this.$router.back();
    },
    detailItemClk(idx){
      this.$emit("detailItemClk",idx)
    }
  },
  components: {NavBar}
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: var(--color-tint);
}
.detail-item{
  flex: 1;
}
.back {
  margin-top: 12px;
}
.itemActive{
  color: var(--color-high-text);
}
</style>
