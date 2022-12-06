<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUser } from '@/stores/counter';
import router from "@/router";

interface us {
    id: number
    pasword: string
    datas: string[]
    like: string[]
}

const defineStor = useUser()
const actic = ref(1);

// 想法
const xiangfa = ref(0);
// 文章
const wenzhang = ref(0);
// 评论
const pinglun = ref(0);

// locstorege的用户的数据
let uses = ref()

// 拿到数据的locstorege
let locstorege = ref(JSON.parse(localStorage.use));

const xian = () => {
    actic.value = 1;

}

const wen = () => {
    actic.value = 2;

}
const zhai = () => {
    actic.value = 3;

}

const gotodetails = (ids:string) => {
    router.push({
        path: "/details",
        query: {
            id: ids
        }
    })
}



onMounted(() => {
    console.log(locstorege.value);
    
    locstorege.value.forEach((element: us) => {
        if (element.id == defineStor.userID) {
            uses.value = element.datas
            wenzhang.value = element.datas.length
        }
    });
    console.log(uses.value)
})
</script>

<template>
    <div class="contengss">
        <!-- 筛选 -->
        <div class="shaixuan">
            <div @click="xian" :class="{'active':actic==1}">想法 {{ xiangfa }}</div>
            <div @click="wen" :class="{ 'active': actic == 2 }">文章 {{ wenzhang }}</div>
            <div @click="zhai" :class="{ 'active': actic == 3 }">摘录 {{ pinglun }}</div>
        </div>
        <!-- 想法 -->
        <div v-show="(actic == 1)" class="shaixuan-one">
            <div v-if="(xiangfa==0)" class="shaixuan-zero">这是一个惜字如金的人</div>
            <!-- <div class="shaixuan-dazero">
                <div>
                    <div class="dazero">
                        <div>ll</div>
                        <div>gg</div>
                    </div>
                </div>
            </div> -->
        </div>
        <!-- 文章 -->
        <div v-show="(actic == 2)" class="shaixuan-one">
            <div v-if="(wenzhang == 0)" class="shaixuan-zero">这是一个热爱读书的人</div>
            <div class="shaixuan-dazero">
                <div v-for="item in uses" :key="item.id" @click="gotodetails(item.id)">
                    <div class="dazero">
                        <div>{{ item.title }}</div>
                        <div>{{ item.provenance }}</div>
                    </div>
                </div>
               
            </div>
        </div>
        <!-- 评论 -->
        <div v-show="(actic == 3)" class="shaixuan-one">
            <div v-if="(pinglun == 0)" class="shaixuan-zero">他的摘录空空如也</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.contengss {
    width: 100vw;
    // height: 100vh;
    padding: 0 30rem;
    margin-top: 30rem;

    .shaixuan {
        width: 100%;
        height: 50rem;
        // background-color: red;
        display: flex;
        line-height: 50rem;
        font-size: 16rem;

        div {
            font-weight: bold;
            color: #aaa;
        }

        .active {
            color: #000;
        }

        &>div:nth-child(2) {
            margin: 0 0 0 20rem;

        }

        &>div:nth-child(3) {
            margin: 0 0 0 20rem;
        }
    }

    .shaixuan-one {

        .shaixuan-zero {
            width: 100%;
            margin-top: 150rem;
            text-align: center;
            font-size: 20rem;
            color: #ccc;
        }

        .shaixuan-dazero {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            &>div:nth-child(2n-1) {
                width: 50%;
                height: 200rem;
                // background-color: #f5f5f5;
                margin-top: 20rem;
                padding-right: 10rem;

                .dazero {
                    width: 100%;
                    height: 100%;
                    background-color: white;
                    padding: 15rem;
                    display: flex;

                    &>div:nth-child(2) {
                        width: 100%;
                        writing-mode: vertical-rl;
                        font-size: 20rem;
                        // 字体贴右边
                        text-align: right;
                        color: #000;
                        // 字体间距
                        letter-spacing: 5rem;
                        line-height: 30rem;
                        // 第二列字体上移
                    }

                    &>div:nth-child(1) {
                        writing-mode: vertical-rl;
                        // 字体贴下面
                        height: 100%;
                        text-align: bottom;
                        color: #ccc;
                        letter-spacing: 5rem;
                    }
                }
            }

            &>div:nth-child(2n) {
                width: 50%;
                height: 200rem;
                // background-color: #f5f5f5;
                margin-top: 20rem;
                padding-left: 10rem;

                .dazero {
                    width: 100%;
                    height: 100%;
                    background-color: white;
                    padding: 15rem;
                    display: flex;

                    &>div:nth-child(2) {
                        width: 100%;
                        writing-mode: vertical-rl;
                        font-size: 20rem;
                        // 字体贴右边
                        text-align: right;
                        color: #000;
                        // 字体间距
                        letter-spacing: 5rem;
                        line-height: 30rem;
                        // 第二列字体上移
                    }

                    &>div:nth-child(1) {
                        writing-mode: vertical-rl;
                        // 字体贴下面
                        height: 100%;
                        text-align: bottom;
                        color: #ccc;
                        letter-spacing: 5rem;
                    }
                }
            }
        }
    }
}
</style>