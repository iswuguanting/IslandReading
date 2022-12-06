<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import UserLike from "@/components/User/UserLike.vue";
import router from "@/router";
import _ from "lodash"
import { useUser } from '@/stores/counter';


const gotorout = () => {
    router.go(-1)
}

// 拿到pinia的数据
const defineStors = useUser()


// 样式的渲染
const onsco = ref()
const scor = ref()

let onscro = (e) => {
    console.log(e);
    console.log(e.srcElement.scrollTop);
    if (e.srcElement.scrollTop > 150) {
        onsco.value = true
    }else{
        onsco.value = false
    }

    if (e.srcElement.scrollTop > 300) {
        scor.value = true
    }else{
        scor.value = false
    }

}

onMounted(() => {
    onscro = _.throttle(onscro, 500)
    window.addEventListener('scroll', onscro)
})

onUnmounted(() => {
    window.removeEventListener('scroll', onscro)

})

</script>

<template>
    <div class="contengs" @scroll="onscro" ref="content">
        <nav class="navs" :class="{'active':onsco == true}">
            <div class="navs-le" @click="gotorout">
                <van-icon name="down" class="down" />
            </div>
            <div class="nasc" v-if="scor">{{defineStors.userID}}</div>
            <div class="navs-ri">编辑</div>
        </nav>
        <div class="poot"></div>
        <main class="mains">
            <!-- 头像 -->
            <div class="main-box">
                <div class="main-us">{{defineStors.userID}}</div>
                <div class="main-img">
                    <img src="@/assets/yonhutwo.png" alt="">
                </div>
            </div>
            <!-- 打卡 -->
            <div class="describe">
                <div>写了 0 字 · 获得 0 喜欢</div>
                <div>读了 7 篇文章 · 累计打卡1天</div>
            </div>
        </main>
        <UserLike />
    </div>
</template>

<style lang="scss" scoped>
// #eaeef6
// #d1eef0
.contengs {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(210deg, #eaeef6, #d1eef0);
    overflow: auto;

    .active {
        background-color: rgb(255, 255, 255, 0.8);
    }

    .navs {
        display: flex;
        justify-content: space-between;
        width: 100vw;
        height: 50rem;
        padding: 0 20rem;
        position: fixed;
        z-index: 999;


        .navs-le {
            .down {
                transform: rotateZ(90deg);
                line-height: 50rem;
                font-size: 20rem;
                font-weight: 600;
            }
        }

        .nasc{
            width: 100%;
            position: absolute;
            text-align: center;
            line-height: 50rem;
            font-size: 16rem;
            font-weight: 600;
        }

        .navs-ri {
            line-height: 50rem;
            font-size: 18rem;
            font-weight: 600;
        }
    }

    .poot {
        width: 100%;
        height: 50rem;
    }

    .mains {
        width: 100%;
        padding: 0 30rem;

        .main-box {
            width: 100%;
            height: 100rem;
            margin: 30rem 0;
            // background-color: #fff;
            display: flex;
            justify-content: space-between;

            .main-us {
                width: 60%;
                height: 100%;
                // background-color: aqua;
                line-height: 100rem;
                font-size: 20rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .main-img {
                width: 30%;
                height: 100%;
                // background-color: aqua;
                position: relative;

                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70rem;
                    height: 70rem;
                    border-radius: 50%;
                }
            }
        }

        .describe {
            width: 100%;
            color: #bdc6cb;

            &>div {
                margin: 5rem 0;
            }
        }
    }
}

.contengs::-webkit-scrollbar {
    display: none;
}
</style>