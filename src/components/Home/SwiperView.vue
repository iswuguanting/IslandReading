<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { getTimestamp, getWeek } from "@/utils/times";
import { request, api } from "@/apis/axios";
import type { LessonsType } from "@/TypeValidation";
import { useCounterThetim } from '@/stores/counter'
import type { SwipeInstance } from 'vant';
// 农历
import { getLunar } from "chinese-lunar-calendar";
import router from "@/router";
// import { ref } from "@vue/reactivity";

// HTMLElement | undefined |
const swipe = ref<SwipeInstance>()

const thetims = useCounterThetim()

const a = getTimestamp(new Date().getTime());
const b = getTimestamp(new Date().getTime() - 1000 * 60 * 60 * 24 * 8);
const tommro = getTimestamp(new Date().getTime() + 1000 * 60 * 60 * 24 * 1);
console.log(tommro,a);

// 农历
const c = getLunar(
    a.times.slice(0, 4),
    a.times.slice(4, 6),
    a.times.slice(6, 9)
);
const ds = getWeek(a.times);
let d = a.times.slice(6, 9);
console.log(a.times, b.times, c, d, ds);

// 请求数据
let dataArr = ref<LessonsType[]>([]);
// 轮播图索引判断
let swi = ref(false);
// 日期
let dates = ref("");
// 周几
let day = ref("");
// 农历
let nonday = ref<object>({});
// 轮播图动画时长
let duration = ref(0);

// 明日的日期月和日
let tommroDate = ref("");
let tommroDay = ref("");

// 明天的倒计时时分秒
let tommroHour = ref<string>();
let tommroMinute = ref<string>();
let tommroSecond = ref<string>();


tommroDate.value = tommro.times.slice(4, 6);
tommroDay.value = tommro.times.slice(6, 9);
console.log(tommro.times, 2525)
request(api + "/lessons", {
    form: b.times,
    to: a.times,
}).then((res) => {
    // console.log(res.data);
    // const {data} = res
    dataArr.value = res.data.map((v: LessonsType) => {
        if (v.date_by_day > b.times && v.date_by_day <= a.times) {
            return {
                ...v,
                // 全局匹配吧\n替换成<br/>
                // article: v.article.replace(/\n/g, '<br/>')
                // article: v.article.replace('\n','<br/>')
                article: (v.article as string).split('\n')
            };
        }
    })
    dataArr.value = dataArr.value.filter((v) => v !== undefined)
    thetims.swip(dataArr.value.length - 1)

    // 添加喜欢和想法的总量
    // https://apis.netstart.cn/daodu/lessons/6335baac8d555800061883d8/activity_stats
    dataArr.value.forEach((v, i) => {
        // console.log(v.id, i);
        request(api + `/lessons/${v.id}/activity_stats`, {})
            .then((res) => {
                // console.log(res.data, 3333);
                dataArr.value[i].comment_count = res.data.comment_count;
                dataArr.value[i].favourite_count = res.data.favourite_count;
                // console.log(dataArr.value, 111111111111);

            })
    });



});

// 轮播图索引
const onChange = (index: number) => {
    // Toast("当前 Swipe 索引：" + index)
    thetims.swip(index)
    // 索引触发
    dataArr.value.forEach((element: LessonsType, ind: Number) => {
        if (ind == index) {
            console.log(element)

            let data = JSON.parse(JSON.stringify(element))

            console.log(`${data.date_by_day}`);
            dates.value = `${data.date_by_day}`.slice(6, 9);
            day.value = getWeek(`${data.date_by_day}`);

            // 农历
            nonday.value = getLunar(
                `${data.date_by_day}`.slice(0, 4),
                `${data.date_by_day}`.slice(4, 6),
                `${data.date_by_day}`.slice(6, 9)
            );

            console.log(dates.value, day.value, nonday.value);

            let time = {
                dates: dates.value,
                day: day.value,
                nonday: nonday.value
            }
            thetims.increment(time)
        }

    });



    // 这个是间距的
    if (dataArr.value.length === index) {
        swi.value = true
    } else {
        swi.value = false
    }
    // console.log(tommro);
    
    // 单独给最后一页一个索引触发
    if (swi.value == true) {
        console.log('到底了')
        console.log(tommro);
        dates.value = tommro.times.slice(6, 9);
        day.value = getWeek(tommro.times);
        nonday.value = getLunar(
            tommro.times.slice(0, 4),
            tommro.times.slice(4, 6),
            tommro.times.slice(6, 9)
        );
        console.log(nonday.value)
        // 传值给父组件
        console.log(dates.value);
        console.log(day.value);
        console.log(JSON.parse(JSON.stringify(nonday.value)));

        let thetim = {
            dates: dates.value,
            day: day.value,
            nonday: JSON.parse(JSON.stringify(nonday.value))
        }
        // 添加数据到pinia
        thetims.increment(thetim)
        console.log(thetims.time);
    }

};

// 跳转到详细页面
const gotuDetailsView = (id: string, name: number, title: number) => {
    console.log(id);
    router.push({
        path: "/details",
        query: {
            id: id,
            num1: name,
            title: title
        }
    })
}

onMounted(() => {
    console.log("mounted");
    console.log(dataArr, 2222222)
    console.log(dataArr.value.length);
    // 获取ref="swipe"

    console.log(swipe.value);
    setTimeout(() => {
        duration.value = 0
        swipe.value?.swipeTo(thetims.swiperTogo);
        setTimeout(() => {
            duration.value = 500
        }, 500);
    }, 500)

    // 倒计时
    setInterval(() => {
        let now = new Date().getTime();
       
        // 获取第二天的时间00:00:00的时间戳
        let tommro = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000;

        // console Month.log(tommro);
        
        let leftTime = tommro - now;
        // console.log(leftTime);
        
        let h = '0', m = '0', s = '0';
        if (leftTime >= 0) {
            h = Math.floor(leftTime / 1000 / 60 / 60 % 24) + '';
            m = Math.floor(leftTime / 1000 / 60 % 60) + "";
            s = Math.floor(leftTime / 1000 % 60) + '';
        }
        tommroHour.value = parseInt(h) < 10 ? '0' + h : h;
        tommroMinute.value = parseInt(m) < 10 ? '0' + m : m;
        tommroSecond.value = parseInt(s) < 10 ? '0' + s : s;
    }, 1000);




    // this.$refs.swipe.swipeTo(index);

});
</script>

<template>
    <div class="main-swiper">
        <van-swipe :loop="false" :duration="duration" ref="swipe" :show-indicators="false" class="aa" :width="300"
            @change="onChange">
            <van-swipe-item v-for="item in dataArr" :key="item.id"
                @click="gotuDetailsView(item.id, item.favourite_count, item.comment_count)">
                <div class="swiper-dat1 animate__animated animate__fadeInUp" :class="{ 'marginri': swi }">
                    <div class="swip-da2">
                        <!-- 头部文字 -->
                        <div class="swip-top">
                            <div class="swip-top-on">
                                {{ item.title }}
                            </div>
                        </div>
                        <!-- 中间文章 -->
                        <div class="swip-textar">
                            <div class="swip-text">
                                <div v-for="(res, index) in item.article" :key="index">
                                    {{ res }}<br />
                                </div>
                                <div class="swip-inil"></div>
                            </div>
                            <!-- 底部阅读 -->
                            <div class="swip-read">
                                <div>{{ item.favourite_count }}喜欢 · {{ item.comment_count }}想法</div>
                                <div>阅读</div>
                            </div>
                        </div>

                    </div>
                </div>
            </van-swipe-item>

            <van-swipe-item>
                <div class="swiper-dat2 animate__animated animate__fadeInUp" :class="{ 'marginri': swi }">
                    <div class="swip-da2">
                        <div class="da2-center">
                            <div class="center-one">{{ tommroDate }}</div>
                            <div class="center-two">{{ tommroDay }}</div>
                        </div>
                        <div class="tomr-time">
                            <div>距离明日更新还有</div>
                            <div> {{ tommroHour }} 时 {{ tommroMinute }} 分 {{ tommroSecond }} 秒 </div>
                        </div>
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<style lang="scss" scoped>
.main-swiper {
    width: 100vw;
    // height: 450rem;
    // background-color: saddlebrown;
    margin: 10rem 0;

    .swiper-dat1 {
        width: 100%;
        height: 450rem;
        // position: relative;
        // background-color: #aaa;
        padding: 0 10rem;
        margin-left: 35rem;

    }

    .swip-da2 {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 20rem;
        padding: 15rem;
        position: relative;

        .swip-top {
            width: 100%;
            height: 50%;
            position: relative;

            .swip-top-on {
                height: 100%;
                // background-color: aqua;
                writing-mode: vertical-lr;
                font-size: 25rem;
                line-height: 50rem;
                text-align: center;
                text-align-last: justify;
                right: 0;
                position: absolute;
                padding: 20rem 0;
            }

        }

        .swip-textar {
            width: 100%;
            height: 50%;
            // background-color: #aaa;

            .swip-text {
                width: 100%;
                height: 145rem;
                // background-color: red;
                color: #494949;
                font-size: 18rem;
                line-height: 24rem;
                overflow: hidden;
                position: relative;

                .swip-inil {
                    position: absolute;
                    width: 100%;
                    height: 100rem;
                    background: linear-gradient(180deg, transparent 0%, #FFFFFF 100%);
                    bottom: 0;
                }
            }

            .swip-read {
                width: 100%;
                height: 60rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                :nth-child(1) {
                    color: #999999;
                    font-size: 16rem;
                }

                :nth-child(2) {
                    color: #fff;
                    font-size: 16rem;
                    padding: 8rem 16rem;
                    background-color: #c4a068;
                    border-radius: 999rem;
                }
            }
        }

        .da2-center {
            width: 100rem;
            height: 100rem;
            // background-color: red;
            // border: 1px solid #c4a068;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: relative;

            &::after {
                content: "";
                width: 100rem;
                height: 1rem;
                background-color: #ccc;
                position: absolute;
                top: 50rem;
                left: 0;
                transform: rotateZ(-45deg);
            }

            .center-one {
                font-size: 30rem;
                font-family: "华文隶书";
                position: absolute;
                top: 10%;
                left: 10%;
                color: #ccc;
            }

            .center-two {
                font-size: 30rem;
                font-family: "华文隶书";
                position: absolute;
                top: 60%;
                left: 60%;
                color: #ccc;
            }
        }

        .tomr-time {
            width: 200rem;
            height: 80rem;
            position: absolute;
            bottom: 40rem;
            left: 50%;
            transform: translateX(-50%);

            &>div {
                text-align: center;
                color: #ccc;
                font-size: 16rem;
                line-height: 40rem;
            }
        }


    }

    .swiper-dat2 {
        width: 100%;
        height: 450rem;
        position: relative;
        // 到自己那一页的时候-40rem
        padding: 0 10rem;
        margin-left: 35rem;
        // right: 35rem;
    }

    .marginri {
        margin-left: -40rem;
    }
}
</style>