<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { monday } from '@/utils/times'
import router from "@/router";
import type { commentType, LessonsType } from "@/TypeValidation";
import { request, api } from "@/apis/axios";
import _ from "lodash"

const colr = ref(0)

const mondays = ref<commentType[]>(monday)

const monData = ref<commentType[]>([])

// 获取今年的日期
const year = ref()
const month = ref()
const day = ref()
year.value = new Date().getFullYear()
month.value = new Date().getMonth() + 1
day.value = new Date().getDate()
month.value = month.value < 10 ? '0' + month.value : month.value
day.value = day.value < 10 ? '0' + day.value : day.value


console.log(year.value, month.value, day.value);

const scoto = ref<HTMLElement[]>()
const scotop = ref<HTMLElement>()
const topindex = ref(0)
// scotop.value.clientHeight = 

const scolltop = (index: number) => {
    console.log(111);
    console.log(index);
    // console.log(scoto.value)
    // console.log(scoto.value[index].offsetTop);
    // topindex.value = scoto.value[index].offsetTop
    if (scoto.value) {
        scoto.value[index].scrollIntoView({ behavior: 'smooth' })
    }
    topindex.value = index
    // if (scotop.value) {
    //         console.log(scotop.value.style.height,11111);

    //         console.log(scotop.value.clientHeight);
    //         scotop.value.style.height = scotop.value.clientHeight + 'rem'
    //     }
}


const datas = () => {
    request(api + "/lessons", {
        form: `${year.value}0101`,
        to: `${year.value}${month.value}${day.value}`,
    }).then(res => {
        console.log(res.data);
        mondays.value.forEach((item) => {
            item.TimData = []
            res.data.forEach((items: LessonsType) => {
                if (item.value == items.date_by_day.toString().slice(4, 6)) {
                    item.TimData.unshift({
                        ...items,
                        time1: items.date_by_day.toString().slice(6, 8),
                    })
                }
            })
        })
        console.log(mondays.value, 111)
        mondays.value.filter((item) => {
            // 判断item.TimData不等于空数组
            // console.log(item.TimData.length);

            if (item.TimData.length > 0) {
                monData.value?.push(item)
            }
        })

        console.log(monData.value, 222);
    })
}

const getoutrouter = () => {
    router.go(-1)
}


let scolls = (e: any) => {
    // console.log(e);
    scoto.value?.forEach((item, index) => {
        // console.log(item.offsetTop);
        if (e.target.lastElementChild.scrollTop >= item.offsetTop - 100) {
            topindex.value = index

        }
    })
}

const gotoshu = (ids: string) => {
    router.push({
        path: "/details",
        query: {
            // 获取当前索引的id
            id: ids,
        }
    })
}

onMounted(() => {
    datas()
    scolls = _.throttle(scolls, 200)
    window.addEventListener('scroll', scolls)
})

onUnmounted(() => {
    window.removeEventListener("scroll", scolls);


});

</script>

<template>
    <div class="bosingsf">
        <div class="nav-top">
            <van-icon name="cross" class="cross" @click="getoutrouter" />
            <div>2022
                <van-icon name="play" class="plaing" />
            </div>
        </div>
        <div class="poot"></div>
        <div class="contengs-le">
            <div class="moonther" @click="scolltop(index)" :class="{ 'blac': topindex === index }"
                v-for="(item, index) in monData" :key="index">
                {{ item.name }}
            </div>
        </div>
        <!-- <main class="contengs"> -->
        <div class="contengs-ri" ref="scotop">
            <div class="content-sc">
                <div class="moon-content" v-for="(item, index) in monData" :key="index" ref="scoto">
                    <div class="moon-days">
                        {{ item.name }}
                    </div>
                    <div class="moon-data">
                        <div class="dat" v-for="(res, index) in item.TimData" :key="index" @click="gotoshu(res.id)">
                            <div>{{ res.time1 }}</div>
                            <div>{{ res.title }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- </main> -->
    </div>

</template>

<style lang="scss" scoped>
.bosingsf {
    width: 100vw;
    background: linear-gradient(180deg, #d7dddd 0%, #bdbed0 100%);
    overflow: auto;


    .nav-top {
        width: 100vw;
        height: 50rem;
        background-color: rgb(255, 255, 255, .8);
        // display: flex;
        position: fixed;
        text-align: center;
        line-height: 50rem;
        font-weight: 600;
        z-index: 999;

        .cross {
            position: absolute;
            line-height: 50rem;
            font-size: 25rem;
            left: 20rem;
        }

        .plaing {
            transform: rotateZ(90deg);
        }
    }

    .poot {
        width: 100%;
        height: 50rem;
    }

    .contengs-le {
        width: 80rem;
        position: fixed;
        left: 0;
        top: 50rem;


        .moonther {
            width: 100%;
            // height: 100rem;
            // background-color: aqua;
            text-align: end;
            padding: 10rem 0;
            font-size: 18rem;
            color: #aaa;
        }

        .blac {
            color: #000;
        }
    }

    .contengs-ri {
        width: 250rem;
        height: 100%;
        // background-color: white;
        overflow-y: scroll;
        overflow-x: hidden;
        // position: relative;
        margin-left: 110rem;

        .content-sc {
            width: 100%;

            // top: 50rem;
            .moon-content {
                width: 100%;
                // height: 100vh;
                // background-color: red;

                .moon-days {
                    width: 100%;
                    padding: 60rem 0 20rem 0;
                    font-size: 26rem;
                    font-weight: 600;
                }

                .moon-data {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;

                    .dat {
                        width: 70rem;
                        height: 100rem;
                        margin-right: 13rem;
                        margin-top: 13rem;
                        // border: 1px solid #000;
                        background-color: white;
                        border-radius: 5rem;

                        &>div:nth-child(1) {
                            width: 100%;
                            height: 70%;
                            text-align: center;
                            line-height: 70rem;
                            font-size: 30rem;
                        }

                        &>div:nth-child(2) {
                            width: 100%;
                            height: 30%;
                            text-align: center;
                        }
                    }
                }
            }
        }




    }

}

.content-sc::-webkit-scrollbar {
    display: none;

}

.contengs-ri::-webkit-scrollbar {
    display: none;
}
</style>