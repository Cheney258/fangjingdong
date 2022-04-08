//引入mockjs模块
import Mock from "mockjs"
//引入JSON格式数据
// webpack 默认对外暴露图片、JSON格式数据
import banner from './banners'
import floor from './floors'

//mock数据:第一个参数:请求地址 ，第二个参数：请求数据
Mock.mock("/mock/banners",{code:200,data:banner})   //模拟首页的轮播图的数据
Mock.mock("/mock/floors",{code:200,data:floor})   //模拟首页的轮播图的数据