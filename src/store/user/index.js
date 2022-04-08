// 登录与注册模块
import { reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"

const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}

const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        // 把仓库中相关数据清空
        state.token = '',
        state.userInfo = {},
        // 本地存储的token清空
        removeToken()
    }
}

const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result)
        if(result.code == 200){
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录【token业务】
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        // console.log(result)
        // 服务器下发的token，用户唯一标识符uuid
        // 将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            // 用户登录成功且获取到token
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'OK'
        }else{
            return Promise.reject(new Error('Faile!'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }){
        let result = await reqUserInfo()
        if(result.code == 200){
            // 提交用户信息
            commit('GETUSERINFO',result.data)
            return 'OK'
        }else{
            return Promise.reject(new Error('Faile!!!'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        //只向服务器发一次请求，通知服务器清除token
        let result = await reqLogout()
        // actions里面不能操作state,需要提交到mutations中进行操作
        if(result.code == 200){
            commit('CLEAR')
            return 'OK'
        }else{
            return Promise.reject(new Error('Faile!'))
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}