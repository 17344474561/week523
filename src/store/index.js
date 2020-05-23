import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import qs from "qs"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islog:'',
    tableData:[],
  },
  mutations: {
    GET_DATA ( state , action ) {
      state.tableData = action
    },

    GET_LOG ( state , action ) {
      state.islog = action
    }
  },
  actions: {
    //登录
    async  ACTION_LOG ( commit , val ) {
      const res = await axios.post("http://49.235.147.95:3001/api/user/login", 
        qs.stringify( { username:val.name,password:val.password})
      )
          localStorage.setItem("token" , res.data.data.token )
          commit.commit('GET_LOG' , res.data.data.token )
    },
    //获取初始数据
    async ACTION_DATA ({ commit }) {
      const res = await axios.get("http://49.235.147.95:3001/api/supplier/list")

          commit('GET_DATA' , res.data.data)
    },
    //添加
    async ACTION_ADD ( stores , datas ) {
      await axios.post("http://49.235.147.95:3001/api/supplier/add" , 
        qs.stringify(datas)
      )
          stores.dispatch('ACTION_DATA')
    },
    //修改
    async ACTION_UPDATA ( stores , data ) {
      await axios.post("http://49.235.147.95:3001/api/supplier/update" , 
        qs.stringify(data)
      )
          stores.dispatch('ACTION_DATA')
    },
    //删除
    async ACTION_DEL ( stores , del ) {
      await axios.post("http://49.235.147.95:3001/api/supplier/delete" , 
        qs.stringify({ id: del.supplierId })
      )
          stores.dispatch('ACTION_DATA')
    }
  },
  modules: {
  }
})
