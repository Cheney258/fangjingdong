<template>
    <div class="type-nav">
        
            <div class="container">
                <!-- 事件委托 | 事件委派 -->
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <!-- 三级联动 -->
                    <transition name="sort">
                        <div class="sort" v-show="show">
                        <!-- 利用事件委派 + 编程式导航实现路由跳转和传递参数 -->
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item bo" 
                            v-for="(c1,index) in categoryList" 
                            :key="c1.categoryId" 
                            :class="{cur:currentIndex==index}"
                        >
                            <h3 @mouseenter="changeIndex(index)" >
                                <a 
                                    :data-categoryName="c1.categoryName" 
                                    :data-category1Id="c1.categoryId"
                                >{{c1.categoryName}}</a>
                            </h3>
                            <!-- 二级、三级分类 -->
                            <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId" >
                                    <dl class="fore">
                                        <dt>
                                            <a 
                                                :data-categoryName="c2.categoryName"
                                                :data-category2Id="c2.categoryId"
                                            >{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId" >
                                                <a 
                                                    :data-categoryName="c3.categoryName"
                                                    :data-category3Id="c3.categoryId"
                                                >{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                    </transition>
                </div>
                
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>

            </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
// 引入方式：把lodash全部功能引入
// import _ from 'lodash'

// 最好的引入方式是：按需映引入
import throttle from 'lodash/throttle'

export default {
    name: 'TypeNav',
    data() {
        return {
            //存储用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show:true,
        };
    },
    //组件挂载完毕，可以向服务器发请求
    mounted(){
        // 如果不是在home组件下挂载，默认不展示，设置show=flase
        if(this.$route.path!='/home'){
            this.show = false
        }
    },
    computed:{
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实即为总仓库的数据
            categoryList:state=>state.home.categoryList
        })
    },
    methods:{
        // 鼠标进入修改响应数据currentIndex属性
        // changeIndex(index){
        //     // index:鼠标移上一个一级分类元素的索引值
        //     this.currentIndex = index
        // },

        // ==================================================
        //节流操作
        // throttle回调函数别用箭头函数，可能出现上下文this指向问题
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },50),
        // 一级分类鼠标移出事件回调
        leaveShow(){
            this.currentIndex = -1
            if(this.$route.path!='/home'){
                this.show = false
            }
            
        },
        //进行路由的跳转
        goSearch(event){
            // 最好的方式：编程式导航 + 事件委派
            // 利用事件委派存在的问题：1.如何确定点击的是 a 标签 2.如何获取参数
            // this.$router.push('/search')

            // 第一个问题：在 a 标签节点中加上自定义属性data-categoryName,其余节点是没有的
            // 获取到触发事件的当前节点，需要带有data-categoryName属性的节点【一定是a标签】
            // 节点有一个dataset属性，可以获取节点的自定义属性值
            let element = event.target
            // console.log(element)
            let {categoryname,category1id,category2id,category3id} = element.dataset
            // console.log(element.dataset)
            //如果标签身上有categoryname 则一定是a标签
            if(categoryname){
                // 整理路由跳转的参数l
                let location = {name:'search'}
                let query = {categoryName:categoryname}
                // 判断是几级分类
                // 一级目录
                if(category1id){
                    query.category1id = category1id
                    // 二级目录
                }else if(category2id){
                    query.category2id = category2id
                    // 三级目录
                }else{
                    query.category3id = category3id
                }
                // 判断：如果路由跳转时，带有params参数，合并传过去
                if(this.$route.params){
                    location.params = this.$route.params
                    // console.log(location,query)
                    location.query = query
                    // 路由跳转
                    this.$router.push(location)
                    // console.log(location)
                }
                
            }

        },
        // 当鼠标移入的时候，让商品分类列表进行展示
        enterShow(){
            if(this.$route.path!='/home'){
                this.show = true
            }
        }
    }

};
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }

                    .cur{
                        background: skyblue;
                    }
                }
            }
            //过渡动画样式
            // 过渡动画开始状态（进入）
            .sort-enter{
                height: 0px;
            }
            // 过渡动画结束状态（进入）
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画事件，速率
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style>