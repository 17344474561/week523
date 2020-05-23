import axios from "axios"
import qs from "qs"


export default {
    namespaced: true,

    state: {
        islog:'',
    },

    mutations: {
        GET_LOG ( state , action ) {
        state.islog = action
        }
    },

    //异步
    actions: {
        //登录
        async  ACTION_LOG ( commit , val ) {
        await axios.post("http://49.235.147.95:3001/api/user/login", 
            qs.stringify( { username:val.name,password:val.password})
        )
            localStorage.setItem("token" , val.name )
            commit.commit('GET_LOG' , val.name )
        }
    },
}
