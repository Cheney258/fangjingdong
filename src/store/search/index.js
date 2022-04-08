import { reqGetSearchInfo } from "@/api"
//search 模块的小仓库
const state = {
    searchList:{},
}
const actions = {
    async getSearchList({commit},params={}){
        // 该函数调用获取服务器数据时，至少传递一个空对象
        // params形参：是用户派发actions【dispatch】时，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIT',result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIT(state,searchList){
        state.searchList = searchList
    }
}
// 计算属性：在项目中，作用：简化数据
const getters = {
    goodsList(state){
        // 一般情况服务器成功过返回的数据是数组，
        // 假如服务器返回数据失败，设置该数据默认为空数组，否者会报undefined
        // 计算新的属性的属性值至少是一个空数组
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        // 有问题
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        // 有问题
        return state.searchList.attrsList || []
    },
}

export default {
    state,
    actions,
    mutations,
    getters

}