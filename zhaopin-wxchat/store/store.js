// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  state:{
	  // 是否手机登录
	 login:false,
	 // 简历id
	 resumeId:0,
	 // 是否完善在线简历
	 flag:false,
	 // 在线简历id
	 onLineId:0,
	 // 是否订阅消息
	 requestSubscribeMessage:true,

  },
  mutations:{

  },
  actions:{

  },

})

// 4. 向外共享 Store 的实例对象
export default store
