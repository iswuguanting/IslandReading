<script setup lang="ts">
import { ref } from "vue";
import { username } from '@/utils/user'
import { useUser } from "@/stores/counter";
import router from "@/router";


interface userssnam {
    img: string
    name: string
    path: string
    nas:string
}

const user = ref<userssnam[]>(username);

const userst = useUser();

user.value.forEach((item) => {
    item.img = new URL(`/src/assets/user/${item.img}`, import.meta.url).href
});

const pushLocalStorage = () => {
    router.push({
        path: "/myuser"
    })
}

const MyUsers = (nas: string,path:string) => {
    console.log(nas);
    console.log(path)
    console.log(userst.usertrue)
    // 点击主页
    if(nas == 'zhuye'){
        if(userst.usertrue == false){
            router.push({
                path: "/myuser"
            })
        }else{
            router.push({
                path: "/thisuser"
            })
        }
    }

    if( nas == 'shezhi' ){
        router.push({
            path: "/setups"
        })
    }

    if(nas == 'rili'){
        router.push({
            path: "/navtime"
        })
    }
}

</script>

<template>
    <div class="bosing">
        <nav class="navs">
            <!-- 我的的头部日月 -->
            <div class="navs-top">
                <div class="navs-le">

                    <img src="@/assets/user/moon.png" alt="">
                    <!-- <img src="@/assets/user/sun.png" alt=""> -->

                </div>
                <div class="navs-ri">
                    <img src="@/assets/user/xinfen.png" alt="">
                </div>
            </div>
        </nav>
        <!-- 用户名 -->
        <main class="contengs">
            <div class="contengs-user-name">
                <div class="user-name" v-if="(userst.usertrue == true)">
                    <div>{{userst.userID}}</div>
                    <div>获得0喜欢，已经加入4天</div>
                </div>
                <div class="user-name" v-if="(userst.usertrue == false)" @click="pushLocalStorage">
                    <div>登入</div>
                </div>
                <div class="user-img">
                    <img src="@/assets/user.png" alt="">
                </div>
            </div>
        </main>
        <!-- 阅读打卡 -->
        <div class="yuedu" v-if="(userst.usertrue == true)">
            <div class="yuedu-name">
                阅读打卡
            </div>
        </div>
        <!-- 我的主页阅读日历 -->
        <div class="user-conten">

            <div class="conten-myzhuye" v-for="(item, index) in user" :key="index" @click="MyUsers(item.nas,item.path)">
                <div class="myzhuye-img">
                    <img :src="item.img" alt="">
                </div>
                <div class="myzhuye-name">
                    {{ item.name }}
                </div>
            </div>

        </div>
    </div>

</template>

<style lang="scss" scoped>
.bosing {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #d7dddd 0%, #bdbed0 100%);
    padding: 15rem 20rem 0;

    .navs {
        height: 50rem;
        // background-color: red;

        .navs-top {
            width: 100%;
            height: 100%;
            // background-color: aqua;
            display: flex;
            justify-content: space-between;

            .navs-le {
                width: 30rem;
                height: 30rem;
                // background-color: blue;
                position: relative;
                border-radius: 50%;
                border: 1px solid #9d9e94;

                img {
                    width: 50%;
                    height: 50%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }

            .navs-ri {
                width: 30rem;
                height: 30rem;
                // background-color: blue;
                position: relative;
                border-radius: 50%;
                border: 1px solid #9d9e94;

                img {
                    width: 50%;
                    height: 50%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
        }
    }

    .contengs {

        .contengs-user-name {
            width: 100%;
            height: 80rem;
            // background-color: red;
            display: flex;
            justify-content: space-between;

            .user-name {
                width: 230rem;
                // background-color: darkorange;
                margin: auto 0;

                &>div:nth-child(1) {
                    font-size: 22rem;
                    line-height: 35rem;
                }

                &>div:nth-child(2) {
                    font-size: 14rem;
                    line-height: 14rem;
                    color: #bfc1b6;
                }
            }
        }

        .user-img {
            width: 80rem;
            height: 80rem;
            // background-color: darkorange;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }

    .yuedu {

        width: 100%;
        // height: 50rem;
        display: flex;

        .yuedu-name {
            display: block;
            padding: 10rem;
            border-radius: 999rem;
            background-color: #c4a068;
            color: white;
        }

    }

    .user-conten {
        width: 100%;
        border-radius: 20rem;
        padding: 20rem 0;
        background-color: white;
        margin: 20rem 0;

        .conten-myzhuye {
            width: 100%;
            height: 50rem;
            // background-color: white;
            padding: 10rem;
            display: flex;

            .myzhuye-img {
                margin-left: 20rem;
                width: 30rem;
                height: 30rem;
                // background-color: darkorange;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .myzhuye-name {
                margin-left: 20rem;
                font-size: 18rem;
                display: flex;
                align-items: center;
                font-weight: 600;
            }
        }
    }
}
</style>