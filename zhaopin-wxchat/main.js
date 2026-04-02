import App from './App'
// 1. 导入 store 的实例对象
import store from './store/store.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	 // 2. 将 store 挂载到 Vue 实例上
	  store,
})

app.$mount()
// #endif
import *as filters from "./utils/num.js"
Object.keys(filters).forEach(key=>{
	Vue.filter(key,filters[key])
})
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif