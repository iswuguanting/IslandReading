<script setup lang="ts">
import router from "@/router";
import { Dialog } from "vant";
import { ref } from "vue";

// 选择服务条款
const tupic = ref(false)


const clause = () => {
    tupic.value = !tupic.value
}

// 退出页面
const gotuout = () => {
    router.go(-1)
}

// 微博登入
const microBlog = () => {
    if( tupic.value == false ){
        Dialog({ message: '请先阅读并同意《服务条款》《隐私条款》' });
    }
}

// 微信登录
const WeChat = () => {
    if( tupic.value == false ){
        Dialog({ message: '请先阅读并同意《服务条款》《隐私条款》' });
    }
}

// 手机登录
const phone = () => {
    if( tupic.value == false ){
        Dialog({ message: '请先阅读并同意《服务条款》《隐私条款》' });
    }else{
        router.push('/userlogin')
    }
}
</script>

<template>
    <div class="bosingsc">

        <nav class="navsc" @click="gotuout">
            <van-icon name="cross" />
        </nav>

        <main class="contengs">
            <div class="contengs-nei">
                海阅读
            </div>

            <div class="Select-login">
                <div class="weibo" @click="microBlog">
                    <div>
                        <img src="@/assets/user/weibo.png" alt="">
                    </div>
                    <div>
                        微博登入
                    </div>
                </div>
                <div class="weibo" @click="WeChat">
                    <div>
                        <img src="@/assets/user/weixin.png" alt="">
                    </div>
                    <div>
                        微信登入
                    </div>
                </div>
                <div class="weibo" @click="phone">
                    <div>
                        <img src="@/assets/user/shouji.png" alt="">
                    </div>
                    <div>
                        账号登入
                    </div>
                </div>
            </div>
            
            <!-- 条款 -->
            <div class="tiao">
                <div class="layout">
                    <div class="boximg" @click="clause">
                           <img src="@/assets/user/weidui.png" v-if="(tupic==false)" alt="">
                           <img src="@/assets/user/dui.png"  v-if="(tupic==true)" alt="">
                    </div>
                    <div class="layout-name">
                        <div>
                            已经阅读并同意以下条款
                        </div>
                        <div>
                            《服务条款》《隐私协议》
                        </div>
                    </div>
                </div>
            </div>
        </main>


    </div>
</template>

<style lang="scss" scoped>
.bosingsc {
    width: 100vw;
    height: 100vh;
    background-color: #fff;

    .navsc {
        width: 100%;
        height: 50rem;
        display: flex;
        justify-content: end;
        position: fixed;
        padding: 0 20rem;
        align-items: center;
        font-size: 20rem;
        font-weight: 600;
    }

    .contengs {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .contengs-nei{
            width:100%;
            height:400rem;
            // background-color: aqua;
            Writing-mode:tb-rl;
            text-align: center;
            line-height: 400rem;
            font-size: 30rem;
        }

        .Select-login{
            width: 100%;
            padding: 50rem 0;
            // background-color: red;
            display: flex;
            justify-content: space-around;
            padding: 0 30rem;
            margin: 40rem 0;

            .weibo{
                width: 80rem;
                height: 100rem;
                // background-color: aqua;

                &>div:nth-child(1){
                    width:80rem;
                    height: 70rem;
                    // background-color: darkblue;
                    position: relative;

                    img{
                        width:50rem;
                        height: 50rem;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                    }
                }

                &>div:nth-child(2){
                    width:80rem;
                    height: 30rem;
                    // background-color: darkblue;
                    text-align: center;
                    font-size: 15rem;
                }
            }
        }

        .tiao{
            width: 100%;
            height: 100rem;
            // background-color: aqua;
            position: relative;
            
            .layout{
                position: absolute;
                width:175rem;
                height: 100rem;
                margin: 0 auto;
                left: 0;
                right: 0;
                // background-color: red;
                display: flex;

                .layout-name{
                    margin-left:10rem;
                    
                    &>div:nth-child(1){
                        color: #ddd;
                        text-align: center;
                    }

                    &>div:nth-child(2){
                        color: #aaa;
                    }
                }

                .boximg{
                    width:20rem;
                    height:20rem;
                }
            }
        }
    }
}
</style>
