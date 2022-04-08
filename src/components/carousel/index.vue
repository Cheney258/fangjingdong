<template>
    <div class="swiper-container" ref="floorSwiper">
        <div class="swiper-wrapper">
        <!-- 轮播图 -->
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: "Carousel",
    props:['list'],
    watch: {
        
        // 没有immediate:true,，watch监听不到数据，因为数据没有发生变化（数据父组件传递来的，父组件给的时候就是一个对象，对象里该有的数据都是没有变化的）
        list:{
            // 立即监听：无论数据开始是否有变化，上来立即监听
            immediate:true,
            handler(){
                // 只能监听到数据已经有了，但v-for动态渲染结构是否完成不能确定，一次还需要nextTick
                this.$nextTick(()=>{
                    var mySwiper = new Swiper(
                        this.$refs.floorSwiper,
                        {
                        loop:true,
                        // 如果需要分页器（底部小圆点）
                        pagination:{
                            el:'.swiper-pagination',
                            // 点击小球的时候也切换图片、
                            clickable:true
                        },
                        // 前进后退按钮
                        navigation: {
                            nextEl:'.swiper-button-next',
                            prevEl:'.swiper-button-prev'
                        },
                    })
                })
            }
        }
    }
};
</script>

<style lang="less" scoped>
</style>