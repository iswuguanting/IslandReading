<script setup lang="ts">
import { ref } from "vue";
import { navtime } from "@/utils/user";
import { useUser } from "@/stores/counter";
import router from "@/router";

const navs = ref(navtime);

const user = useUser();

const userSign = () => {
    if(user.usertrue == false){
        router.push({
            path: "/myuser"
        })
    }else{
        user.userout()
        router.push({
            path: "/myuser"
        })
    }
}

const gotorouterno = () =>{
    router.go(-1)
}
</script>

<template>
    <div class="contengs">
        <nav class="nav-set">
            <div @click="gotorouterno"><van-icon name="down" class="down" /></div>
            <div>设置</div>
        </nav>
        <main class="main-set">
            <div class="main-ever">
                <div class="pattern">
                    <div class="night" v-for="(item,index) in navs" :key="index">
                        <div>{{item.name}}</div>
                        <div><van-icon name="arrow" /></div>
                    </div>
                </div>
                <div class="tuichu" @click="userSign">
                    <div v-if="user.usertrue == true">退出登录</div>
                    <div v-if="user.usertrue == false">点击登入</div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.contengs {
    width: 100vw;
    height: 100vh;
    background-color: #ddd;

    .nav-set {
        width: 100vw;
        height: 50rem;
        // background-color: red;
        padding: 0 20rem;
        position: fixed;
        display: flex;

        &>div:nth-child(1) {
            position: absolute;
            transform: rotateZ(90deg);
            font-size: 20rem;
            font-weight: 600;
            line-height: 50rem;
        }

        &>div:nth-child(2) {
            width: 100%;
            line-height: 50rem;
            font-size: 16rem;
            font-weight: 600;
            text-align: center;
        }
    }

    .main-set {
        width: 100vw;
        height: 100vh;
        background-color: white;
        padding: 0 20rem;

        .main-ever{
            width: 100%;
            height: 100%;
            // background-color: red;
            padding: 60rem 0;

            .pattern{
                width: 100%;

                .night{
                    width: 100%;
                    height: 50rem;
                    background-color: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #ddd;
                    padding: 0 20rem;

                    &>div:nth-child(1){
                        font-size: 16rem;
                        font-weight: 600;
                    }

                    &>div:nth-child(2){
                        font-size: 16rem;
                        font-weight: 600;
                    }
                }
            }

            .tuichu{
                position: fixed;
                bottom: 30rem;
                left: -20rem;
                width: 100vw;
                height: 50rem;
                background-color: #fff;
                line-height: 50rem;
                text-align: center;
                font-size: 20rem;
                color: #aaa;
                border-top: 1px solid #ddd;

            }
        }
    }
}

.contengs::-webkit-scrollbar {
    display: none;
}
</style>