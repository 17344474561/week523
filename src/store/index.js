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
    ACTION_LOG ( commit , val ) {
      axios.post("http://49.235.147.95:3001/api/user/login", 
        qs.stringify( { username:val.name,password:val.password})
      )
        .then(res => {
          if(res.data.code === 200){
              commit.commit('GET_LOG' , res.data.data.token)
          } 
     
        })
    },
    //获取初始数据
    ACTION_DATA ({ commit }) {
      axios.get("http://49.235.147.95:3001/api/supplier/list")
        .then(res => {
          if(res.data.code === 200){
              commit('GET_DATA' , res.data.data)
          } 
        })
    },
    //添加
    ACTION_ADD ( stores , datas ) {
      axios.post("http://49.235.147.95:3001/api/supplier/add" , 
        qs.stringify(datas)
      )
        .then(res => {
          if(res.data.code === 200){
            stores.dispatch('ACTION_DATA')
          } 
        })
    },
    //修改
    ACTION_UPDATA ( stores , data ) {
      axios.post("http://49.235.147.95:3001/api/supplier/update" , 
        qs.stringify(data)
      )
        .then(res => {
          if(res.data.code === 200){
            stores.dispatch('ACTION_DATA')
          } 
        })
    },
    //删除
    ACTION_DEL ( stores , del ) {
      axios.post("http://49.235.147.95:3001/api/supplier/delete" , 
        qs.stringify({ id: del.supplierId })
      )
        .then(res => {
          if(res.data.code === 200){
            stores.dispatch('ACTION_DATA')
          } 
        })
    }

  },
  modules: {
  }
})
