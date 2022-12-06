<script setup lang="ts">
import router from "@/router";
import { Toast } from "vant";
import { ref } from "vue";
import { useUser } from "@/stores/counter";

const user = useUser();
const navstf = ref(false)
const countName = ref<string>()
const countNumber = ref<number>()

const gotorouterruan = () => {
    router.go(-1)
}


// 切换登录注册
const loginSwitch = () => {
    navstf.value = !navstf.value
}

const LoginRegistration = () => {
    console.log(countName.value)
    // 注册
    if (navstf.value == false && countName.value !== undefined && countNumber.value !== undefined) {
        // 添加用户
        if (localStorage.use == undefined) {
            localStorage.use = JSON.stringify([{ id: countNumber.value, pasword: countName.value, datas: [], like: [] }])
            // 提示添加成功
            Toast('注册成功');
            countName.value = '';
            countNumber.value = NaN;
        } else {
            let use = JSON.parse(localStorage.use);
            let tr = 1
            console.log(use);

            use.filter((ele: Storage) => {
                if (ele.id == countNumber.value) {
                    tr = 2;
                }
            });
            if (tr == 1) {
                console.log(123);

                use.push({ id: countNumber.value, pasword: countName.value, datas: [], like: [] })
                localStorage.use = JSON.stringify(use);
                // 提示添加成功
                Toast('注册成功');
                countName.value = '';
                countNumber.value = NaN;
            }
            if( tr == 2){
                Toast('账号已存在');
            }
            tr = 1

        }

    }

    // 登录
    if (navstf.value == true) {
        let use = JSON.parse(localStorage.use);
        console.log(use);
        let atr = false;
        let ids = 0;
        use.filter((ele: Storage) => {
            if (ele.id == countNumber.value && ele.pasword == countName.value) {
                atr = true;
                ids = ele.id;
            }
        });
        console.log(atr);
        if (atr) {
            user.useric(ids);
            Toast('登录成功');
            
            router.push({
                path: "/user"
            })

            countName.value = '';
            countNumber.value = NaN;
        }

    }

}


</script>

<template>
    <div class="contengs">
        <form>
            <div class="contengs-box">
                <div class="navs" @click="gotorouterruan">
                    <van-icon name="down" class="down" />
                </div>
                <div class="navs-name">
                    <span v-if="navstf == true">加入岛读</span>
                    <span v-if="navstf == false">注册岛读</span>
                </div>
                <div class="loginendzhucher">
                    <div class="loginendzhucher-one">
                        <input class="ipt-on" placeholder="请输入账号" v-model="countNumber" type="number">
                    </div>
                    <div class="loginendzhucher-one">
                        <input class="ipt-on" autocomplete=" " placeholder="请输入密码" v-model="countName" type="password">
                    </div>
                </div>
                <div class="denlu" @click="LoginRegistration">
                    <div v-if="navstf == true">登入</div>
                    <div v-if="navstf == false">注册</div>
                </div>
                <div class="switch" @click="loginSwitch">
                    <div v-if="navstf == true">账号注册</div>
                    <div v-if="navstf == false">账号登入</div>
                </div>
            </div>
        </form>

    </div>
</template>

<style lang="scss" scoped>
.contengs {
    width: 100vw;
    height: 100vh;
    background-color: #fafafa;
    padding: 30rem;

    .contengs-box {
        width: 100%;
        height: 100%;
        // background-color: red;

        .navs {
            width: 100%;

            .down {
                transform: rotateZ(90deg);
                font-size: 20rem;
                font-weight: 600;
            }
        }

        .navs-name {
            margin: 50rem 0;
            font-weight: 600;
            font-size: 30rem;
        }

        .loginendzhucher {
            width: 100%;
            // height: 100rem;
            // background-color: aqua;

            .loginendzhucher-one {
                width: 100%;
                height: 40rem;
                margin-top: 30rem;
                // background-color: salmon;
                border-bottom: 1px solid #7d7d7d;
                position: relative;

                .ipt-on {
                    width: 200rem;
                    height: 30rem;
                    font-size: 20rem;
                }
            }

            .loginendzhucher-two {
                width: 100%;
                height: 50%;
                // background-color: salmon;
                border-bottom: 1px solid #7d7d7d;
            }
        }

        .denlu {
            width: 100%;
            height: 50rem;
            background-color: #c4a068;
            margin-top: 50rem;
            border-radius: 999rem;
            text-align: center;
            line-height: 50rem;
            font-size: 18rem;
            color: white;
        }

        .switch {
            width: 100%;
            margin-top: 30rem;
            color: #c4a068;
            font-size: 16rem;
            text-align: center;
        }
    }
}

input {
    background: none;
    outline: none;
    border: 0px;
}
</style>