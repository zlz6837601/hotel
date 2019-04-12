import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home.vue'
import hotelList from '@/view/hotelList.vue'
import hotelDetail from '@/view/hotelDetail.vue'
import bookingInfo from '@/view/bookingInfo.vue'
import historyList from '@/view/historyList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{index:0},
      component: home,
    },
    {
      path:'/hotelList',
      name:'hotelList',
      meta:{index:1},
      component:hotelList,
    },
    {
      path:'/hotelDetail',
      name:'hotelDetail',
      meta:{index:2},
      component:hotelDetail,
    },
    {
      path:'/bookingInfo',
      name:'bookingInfo',
      meta:{index:3},
      component:bookingInfo,
    },
    {
      path:'/historyList',
      name:'historyList',
      meta:{index:0},
      component:historyList,
    },
  ]
})
