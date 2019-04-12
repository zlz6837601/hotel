<template>
  <div id="app">
    <transition :name="transitionName">   
        <router-view></router-view>
    </transition>
  </div>
</template>

<style>
/* .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 500ms;
  position: absolute;
  height: auto;
} */
.slide-left-enter-active {
  opacity: 0;
  transition: all .5s ease;
}
.slide-left-leave-active {
  opacity: 0;
  transition: all .5s ease  ;
}
.slide-left-enter, 
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to{
 transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active {
  opacity: 0;
  transition: all .5s ease;
}
.slide-right-leave-active {
  opacity: 0;
  transition: all .5s ease  ;
}
.slide-right-enter, 
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to{
    transform: translateX(100%);
    opacity: 0;
}
</style>

<script>
import {} from '@/api/index.js';

export default {
  name: 'App',
  data(){
    return {
      transitionName:""
    }
  },
  watch:{
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else if(to.meta.index < from.meta.index){
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = ' ';
      }
    }
  },
  methods:{

  },
  mounted(){
  
  },
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.v-content {
  -webkit-overflow-scrolling: touch;
}
</style>
