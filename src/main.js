// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import Vuego from './vuego'
import  FastClick  from  'fastclick'
FastClick.prototype.focus = function(targetElement) {  
  var length,deviceIsIOS=deviceIsIOS||{};

  if (deviceIsIOS&& targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month')
   {
         length = targetElement.value.length;    targetElement.focus();    targetElement.setSelectionRange(length, length);  
  } else {    targetElement.focus();}};

FastClick.attach(document.body);
// import Mint from 'mint-ui'
// Vue.use(Mint);
Vue.use(Vuego);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


