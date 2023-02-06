<script setup lang="ts">
import { onMounted, ref } from "vue";

import { RouterLink, RouterView } from "vue-router";

// 农历
const tabbarIndex = ref(0);

onMounted(() => {
    if(localStorage.use == undefined){
        localStorage.use = JSON.stringify([])
    }
})

</script>

<template>
    <div class="box">
        <div v-if="$route.meta.show">
            <van-tabbar v-model="tabbarIndex" class="tabar-top" active-color="#828180" :border="false" z-index="9999" route inactive-color="#ddd7cf">
                <van-tabbar-item icon="wap-home-o" class="tabar" to="/home">首页</van-tabbar-item>
                <van-tabbar-item icon="bulb-o" class="tabar" to="/explore">探索</van-tabbar-item>
                <van-tabbar-item icon="contact" class="tabar" to="/user">我的</van-tabbar-item>
            </van-tabbar>
        </div>

        <div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
                </keep-alive>
                <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
            </router-view>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.box{

    .tabar-top{
        border:1rem solid transparent;
        background: transparent;
    }

    .tabar {
    background-color:#bdbed0;
}
}

</style>
