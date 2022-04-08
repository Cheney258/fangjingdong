//home 模块的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"

const state = {
    //state中数据默认起始值别瞎写，服务器返回的是数组就写成数组，服务器返回的是对象就写成对象
    categoryList:[],
    // 首页轮播图数据
    bannerList:[],
    // floor轮播图数据
    floorList:[]
}
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor轮播图的数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            // 提交mutations
            commit('GETFLOORLIST',result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
// 计算属性
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters

}