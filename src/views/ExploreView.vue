<script setup lang="ts">
import { request, api } from "@/apis/axios";
import { onMounted, ref } from "vue";
import type { LessonsType, peopleType } from '@/TypeValidation'
import { yeartime } from '@/utils/times'
import router from "@/router";
import { useUser } from '@/stores/counter';



// 鼠标按下是true
const anxia = ref(false);
// 鼠标按下的地点
const x = ref<number>();
const y = ref<number>();
// 鼠标移动的地点
const x1 = ref<number>();
const y1 = ref<number>();

// 探索评论内容总列表
const pindDatas = ref<peopleType[]>([]);
// 探索图书内容总列表
const bookDatas = ref<LessonsType[]>();

// 获取locstorage的数据
const locas = ref<peopleType[]>(JSON.parse(localStorage.getItem('locas') || '[]'));
// const locstorage = localStorage.getItem('user');
// if (locstorage) {
//     return JSON.parse(locstorage);
// }
// return null;

// 拿到数据的locstorege
let locstorege = ref(JSON.parse(localStorage.use));

// pinia用户消息
const defineStor = useUser()

// 处理过的locstorege数据
let userLocstor = ref<peopleType[]>();

// 主页面大爱心判断是否是高亮
let userLocstor1 = ref();

let Arr = ref<Array<HTMLElement>>([])

const showIndex = ref(0)
const showRef = ref<Array<HTMLElement>>()
const shows = ref(0);
const showsid = ref('');

interface elType {
    el: HTMLElement
}
interface elType1 {
    id: string | undefined
    provenance: string | undefined
    title: string | undefined
}
interface us {
    id: number
    pasword: string
    datas: elType1[]
    like: elType1[]
}



// 屏幕内的喜欢高亮
const showrs = (id: string) => {
    if (defineStor.usertrue == true) {
        locstorege.value.forEach((element) => {
            if (element.id == defineStor.userID) {
                let a = true
                element.datas.filter((res: elType1) => {
                    if (res.id == id) {
                        // userLocstor1 = true
                        a = false
                    }
                    return a
                })
                if (a == true) {
                    userLocstor1.value = false
                } else {
                    userLocstor1.value = true
                }
            }
        });
        console.log(userLocstor1.value);

    }

}


// 鼠标按下Movein回来的动画
const Movein = () => {


    if (pindDatas.value) {
        if (showIndex.value < pindDatas.value.length) {
            Arr.value[Arr.value.length - 1].style.transition = 'all 1.5s';
            Arr.value[Arr.value.length - 1].style.transform = 'translate(0px,0px)';
            // }
            // 当前的文章id
            // console.log(pindDatas.value[showIndex.value - 2]);

            Arr.value = Arr.value.filter((l: HTMLElement, index: number) => index != Arr.value.length - 1)
            if (showIndex.value < pindDatas.value.length) {
                showIndex.value++

            }
            anxia.value = false;
            console.log(Arr.value);

        }
    }
    // 当前的文章id
    showrs(pindDatas.value[showIndex.value - 1].lesson_id)
    console.log(pindDatas.value[showIndex.value - 1]);


}


// 鼠标点击喜欢向右的划走的动画
const likeing = () => {

    if (showRef.value && showIndex.value) {
        showRef.value[showIndex.value - 1].style.transition = 'all 1.5s';
        showRef.value[showIndex.value - 1].style.transform = 'translate(500px,0px)';
        if (Arr.value) {
            Arr.value.push(showRef.value[showIndex.value - 1])
            // 当前的文章id
            console.log(pindDatas.value[showIndex.value - 2]);

        }
    }
    if (showIndex.value > 0) {
        showIndex.value--
    }

    if (defineStor.usertrue == true) {
        // 存入当前用户数据
        console.log(locstorege.value);
        locstorege.value.forEach((element: us) => {
            if (element.id == defineStor.userID) {
                console.log(element);
                // console.log(pindDatas.value[showIndex.value])
                let as = pindDatas.value[showIndex.value].dataset
                let obj1 = {
                    id: as?.id,
                    provenance: as?.provenance,
                    title: as?.title
                }
                let dastr = true
                element.datas.filter((res) => {
                    // console.log(res.id);
                    // console.log(as?.id);
                    if (res.id == as?.id) {
                        // console.log(res.id);
                        // console.log(as?.id);


                        dastr = false
                    }
                })
                console.log(dastr);

                if (dastr) {
                    element.datas.push(obj1)
                    // console.log(222333);

                }
            }
        });
        locstorege.value.forEach((element) => {
            // if()
            if (element.id == defineStor.userID) {
                userLocstor.value = element.datas
            }
        });
        // 存储到losstorege
        localStorage.setItem('use', JSON.stringify(locstorege.value))
    }
    // 当前的文章id
    showrs(pindDatas.value[showIndex.value - 1].lesson_id)
    console.log(pindDatas.value[showIndex.value - 1]);
}

// 鼠标点击删除向左的划走的动画
const deleve = () => {
    if (showRef.value && showIndex.value) {
        showRef.value[showIndex.value - 1].style.transition = 'all 1.5s';
        showRef.value[showIndex.value - 1].style.transform = 'translate(-500px,0px)';
        if (Arr.value) {
            Arr.value.push(showRef.value[showIndex.value - 1])
        }
    }
    if (showIndex.value > 0) {
        showIndex.value--
    }
    // 当前的文章id
    console.log(pindDatas.value[showIndex.value - 1]);
    showrs(pindDatas.value[showIndex.value - 1].lesson_id)
}


// 按下
const yidonanxia = (f: TouchEvent) => {
    console.log('start', f);
    anxia.value = true
    // console.log(f.changedTouches[0]);
    x.value = f.changedTouches[0].clientX
    y.value = f.changedTouches[0].clientY
    console.log(showRef.value);

}

// 滑动
const yidonanxyidon = (f: TouchEvent) => {
    // console.log(f.targetTouches[0]);
    if (x.value) {
        x1.value = f.targetTouches[0].clientX - x.value
    }
    if (y.value) {
        y1.value = f.targetTouches[0].clientY - y.value

    }

    // console.log(x1.value);
    // if (x1.value) {
    //     if (x1.value <= 0) {
    //         shows.value = 1;
    //         console.log(111);
    //     }else if(x1.value > 0){
    //         shows.value = 2;
    //         console.log(222);
    //     }else{
    //         shows.value = 0;
    //     }
    // }

    // 获取当前滑动的showRef
    if (showRef.value && showIndex.value) {
        if (x1.value) {
            if (x1.value <= 0) {
                shows.value = 2;
            } else if (x1.value > 0) {
                shows.value = 1;
            } else {
                shows.value = 0;
            }
        }
        showsid.value = pindDatas.value[showIndex.value - 1].lesson_id
        // console.log(pindDatas.value[showIndex.value - 1].lesson_id);
    }



    // console.log(x1.value, y1.value);

    // first.value.style.transform = `translateX(${x1.value}px) translateY(${y1.value}px)`
    if (f.target && x1.value) {
        (f.target as HTMLElement).style.transition = 'all 0s';
        // 百分比旋转
        (f.target as HTMLElement).style.transform = `translateX(${x1.value}px) translateY(${y1.value}px) rotate(${x1.value / 10}deg)`
    }
}


let a = ref<HTMLElement>()
// 离开
const handlerTouchend = (f: TouchEvent) => {
    console.log('end');
    anxia.value = false
    console.log(f);

    // 清除样式
    if (f) {
        (f.target as HTMLElement).style.transform = `translateX(0px) translateY(0px)`;
        (f.target as HTMLElement).style.transition = 'all 0.5s'
    }


    // 向上移出去
    if (y1.value) {
        if (y1.value < -100) {
            // if (f) {
            //     (f.target as HTMLElement).style.transform = `translateX(0px) translateY(-500px)`;
            //     (f.target as HTMLElement).style.transition = 'all 1.5s'
            // }
            router.push({
                path: "/details",
                query: {
                    // 获取当前索引的id
                    id: pindDatas.value[showIndex.value - 1].lesson_id,
                }
            })

        }
    }


    // 向左移出去
    if (x1.value) {
        if (x1.value < -100) {
            if (f) {
                (f.target as HTMLElement).style.transform = `translateX(-500px) translateY(0px)`;
                (f.target as HTMLElement).style.transition = 'all 1.5s'
                shows.value = 0;
            }
            if (Arr.value) {
                Arr.value.push((f.target as HTMLElement))
            }
            if (showIndex.value > 0) {
                showIndex.value--
            }
            // 当前的文章id
            console.log(pindDatas.value[showIndex.value - 1]);
            showrs(pindDatas.value[showIndex.value - 1].lesson_id)

        }
    }


    // 向右移出去
    if (x1.value) {
        if (x1.value > 100) {
            if (f) {
                (f.target as HTMLElement).style.transform = `translateX(500px) translateY(0px)`;
                (f.target as HTMLElement).style.transition = 'all 1.5s'
                shows.value = 0;
            }
            if (Arr.value) {
                Arr.value.push((f.target as HTMLElement))
            }
            if (showIndex.value > 0) {
                showIndex.value--
            }


            if (defineStor.usertrue == true) {
                // 存入当前用户数据
                console.log(locstorege.value);
                locstorege.value.forEach((element: us) => {
                    if (element.id == defineStor.userID) {
                        console.log(element);
                        console.log(pindDatas.value[showIndex.value])
                        let as = pindDatas.value[showIndex.value].dataset
                        let obj1 = {
                            id: as?.id,
                            provenance: as?.provenance,
                            title: as?.title
                        }
                        let dastr = true
                        element.datas.filter((res) => {
                            console.log(res.id);
                            console.log(as?.id);
                            if (res.id == as?.id) {
                                console.log(res.id);
                                console.log(as?.id);


                                dastr = false
                            }
                        })
                        console.log(dastr);

                        if (dastr) {
                            element.datas.push(obj1)
                            console.log(222333);

                        }
                    }
                });
                locstorege.value.forEach((element) => {
                    // if()
                    if (element.id == defineStor.userID) {
                        userLocstor.value = element.datas
                    }
                });
                // 存储到losstorege
                localStorage.setItem('use', JSON.stringify(locstorege.value))
            }
            // 当前的文章id
            console.log(pindDatas.value[showIndex.value - 1]);
            showrs(pindDatas.value[showIndex.value - 1].lesson_id)

        }
    }





    // 其余的都清零 地点清零
    x.value = 0
    y.value = 0
    x1.value = 0
    y1.value = 0
    shows.value = 0;


}


onMounted(() => {

    locstorege.value.forEach((element) => {
        // if()
        if (element.id == defineStor.userID) {
            userLocstor.value = element.datas
        }
    });
    console.log(userLocstor.value, 1111);

    request(api + '/today_recommends', {}).then((res) => {
        console.log(res.data.comments);
        console.log(res.data.lessons);
        bookDatas.value = res.data.lessons;
        pindDatas.value = res.data.comments.slice(0, 10).map((item: peopleType) => {
            return {
                content: item.content,
                lesson_id: item.lesson_id,
                created_at: item.created_at,
                user: {
                    avatar: item.user.avatar != '' ? item.user.avatar : 'https://img.bosszhipin.com/beijin/upload/avatar/20221128/607f1f3d68754fd0514c2f8fcdadae58270fe4f2ecf9ad9f41fffbe1138d9a75f7777504fe0ec8a0_s.png',
                    nickname: item.user.nickname,
                    id: item.user.id
                },
                id: item.id,
                times: yeartime(item.created_at),
                dataset: []
            }
        });


        pindDatas.value?.forEach((item: peopleType, index: number) => {
            request(api + '/lessons/' + item.lesson_id, {}).then((res) => {
                item.dataset = res.data;
                let datasd = (res.data.date_by_day as string);
                // console.log(datasd)
                // 吧res.data.article 改成数组
                if (item.dataset) {
                    item.dataset.article = (item.dataset?.article as string).split('\n');
                    item.dataset.time1 = datasd.toString().slice(0, 4);
                    item.dataset.time2 = datasd.toString().slice(4, 6);
                    item.dataset.time3 = datasd.toString().slice(6, 9);
                }
            })

        })

        console.log(a);
        // if (pindDatas.value) {
        console.log(pindDatas.value.length);
        showIndex.value = pindDatas.value.length

        // }
        console.log(showRef);

        console.log(pindDatas.value, pindDatas.value?.length, 33333222);

        // 获取用户id
        console.log(pindDatas.value[pindDatas.value.length - 1].lesson_id)

        showrs(pindDatas.value[pindDatas.value.length - 1].lesson_id)

        // showrs(pindDatas.value[showIndex.value - 1].lesson_id)

    });



    // if (first) {
    //     yidonanxia(first.value as any)
    //     yidonanxyidon(first.value as any)
    //     handlerTouchend(first.value as any)
    // }

    // console.log(first);


})

</script>

<template>
    <div class="bosonf">
        <main class="contengs">
            <div class="contengs-kapian">
                <div class="kapian-firs a" @touchstart.self="yidonanxia" @touchmove.self="yidonanxyidon"
                    @touchend.self="handlerTouchend" ref="showRef" v-for="(item,index) in pindDatas" :key="index">

                    <!-- <div class="zhezao">

                    </div> -->

                    <!-- 喜欢和已经阅读 -->
                    <div class="fil" v-if="shows == 1 && item.lesson_id == showsid">喜欢</div>
                    <div class="fil2" v-if="shows == 2 && item.lesson_id == showsid">已阅</div>

                    <!-- user name and img -->
                    <div class="kapian-name-img">
                        <div class="kapian-le">
                            <div class="picher">
                                <img :src="item.user.avatar" alt="">
                            </div>
                            <div class="names">{{ item.user.nickname }}</div>
                        </div>
                        <div class="kapian-ri">
                            <img src="@/assets/fenxiang.png" alt="">
                        </div>
                    </div>
                    <!-- 评论内容 -->
                    <div class="pinlun">
                        {{ item.content }}
                    </div>
                    <!-- 文章内容 -->
                    <div class="contents">
                        <div class="contents-day">
                            <div class="daycont-le">
                                <div>{{ item.dataset?.time2 }}</div>
                                <div>{{ item.dataset?.time3 }}</div>
                            </div>
                            <div class="daycont-ri">
                                <div>{{ item.dataset?.provenance }}</div>
                                <div>{{ item.dataset?.author?.name }}</div>
                            </div>
                        </div>
                        <!-- 评论的时间 -->
                        <div class="pinlun-time">
                            <div>{{ item.times }}</div>
                            <div class="time-like">
                                <div>
                                    <van-icon name="chat-o" />
                                </div>
                                <div>
                                    <!-- 未喜欢和已经喜欢 -->
                                    <div class="linkign" v-if="(defineStor.usertrue == false)">
                                        <van-icon class="linke " name="like" />
                                    </div>
                                    <div class="linkign" v-if="(defineStor.usertrue == true)" v-for="res in userLocstor"
                                        :key="res.id">
                                        <van-icon class="linke " :class="{ 'acti': res.id == item.lesson_id }"
                                            name="like" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="foo">
            <div @click="Movein">
                <van-icon class="replay" name="replay" />
            </div>
            <div @click="deleve">
                <van-icon class="clear" name="cross" />
            </div>
            <!-- userLocstor1 -->
            <div @click="likeing">
                <van-icon class="linke" :class="{ 'linkesd': userLocstor1 == true }" name="like" />
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.bosonf {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(180deg, #d7dddd 0%, #bdbed0 100%);

    .contengs {
        width: 100%;
        height: 80%;
        // background-color: aqua;
        padding: 40rem;

        .contengs-kapian {
            width: 100%;
            height: 100%;
            // background-color: aqua;
            position: relative;

            .kapian-firs {
                width: 100%;
                height: 100%;
                border-radius: 20rem;
                background-color: white;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 999;
                padding: 20rem 15rem;

                .zhezao {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .fil {
                    position: absolute;
                    left: 20rem;
                    padding: 20rem;
                    border: 1rem solid red;
                    font-weight: 600;
                    font-size: 30rem;
                    color: red;
                    transform: rotate(-20deg);
                }

                .fil2 {
                    position: absolute;
                    right: 20rem;
                    padding: 20rem;
                    border: 1rem solid orange;
                    font-weight: 600;
                    font-size: 30rem;
                    color: orange;
                    transform: rotate(20deg);
                }

                .kapian-name-img {
                    width: 100%;
                    height: 40rem;
                    // background-color: aqua;
                    display: flex;
                    justify-content: space-between;
                    pointer-events: none;

                    .kapian-le {
                        width: 80%;
                        height: 100%;
                        // background-color: red;
                        display: flex;
                        align-items: center;

                        .picher {
                            width: 40rem;
                            height: 40rem;
                            // background-color: darkblue;
                            border-radius: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }

                        .names {
                            width: 150rem;
                            height: 100%;
                            // background-color: #bdbed0;
                            margin-left: 20rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display: flex;
                            align-items: center;
                            font-size: 14rem;
                            font-weight: 600;
                        }

                    }

                    .kapian-ri {
                        width: 20%;
                        height: 100%;
                        // background-color: aqua;
                        position: relative;

                        img {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 20rem;
                            height: 20rem;
                        }
                    }
                }

                .pinlun {
                    width: 100%;
                    // height: 250rem;
                    margin: 20rem 0;
                    font-size: 16rem;
                    line-height: 23rem;
                    color: #aaa;
                    // background-color: aqua;
                    -webkit-line-clamp: 8;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                    pointer-events: none;
                }

                .contents {
                    width: 260rem;
                    // height: 150rem;
                    bottom: 20rem;
                    position: absolute;
                    // background-color: red;
                    pointer-events: none;

                    .contents-day {
                        width: 100%;
                        height: 60rem;
                        margin: 0 0 30rem 0;
                        border: 1rem solid #aaa;
                        // background-color: aqua;
                        display: flex;

                        .daycont-le {
                            width: 60rem;
                            height: 100%;
                            background-color: white;
                            position: relative;
                            border-right: 1rem solid #aaa;

                            &::before {
                                content: '';
                                position: absolute;
                                width: 40rem;
                                height: 1rem;
                                // 旋转45°
                                transform: rotate(-45deg);
                                // 居中
                                top: 50%;
                                left: 15%;

                                background-color: #aaa;
                            }

                            &>div:nth-child(1) {
                                // background-color: aqua;
                                font-size: 20rem;
                                color: #aaa;
                                padding: 8rem;
                            }

                            &>div:nth-child(2) {
                                // background-color: aqua;
                                font-size: 20rem;
                                color: #aaa;
                                padding: 0 0 0 30rem;
                            }
                        }

                        .daycont-ri {
                            width: 190rem;
                            height: 100%;
                            // background-color: white;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            padding: 0 0 0 20rem;

                            &>div:nth-child(1) {
                                // background-color: aqua;
                                font-size: 16rem;
                                font-weight: 600;
                                color: #aaa;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }

                            &>div:nth-child(2) {
                                // background-color: aqua;
                                font-size: 14rem;
                                color: #aaa;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }

                    .pinlun-time {
                        width: 100%;
                        height: 30rem;
                        // background-color: aqua;
                        font-size: 14rem;
                        color: #aaa;
                        display: flex;
                        justify-content: space-between;

                        &>div:nth-child(1) {
                            width: 50%;
                            height: 100%;
                            // background-color: aqua;
                            display: flex;
                            align-items: center;
                        }

                        .time-like {
                            display: flex;
                            font-size: 20rem;

                            &>div:nth-child(1) {
                                width: 20rem;
                                height: 100%;
                                margin-left: 20rem;
                                // background-color: aqua;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }

                            &>div:nth-child(2) {
                                width: 20rem;
                                height: 100%;
                                margin-left: 20rem;
                                // background-color: aqua;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                position: relative;

                                .linkign {
                                    position: absolute;
                                    position: relative;
                                    top: -10rem;
                                    left: -10rem;

                                    .linke {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                    }

                                    .acti {
                                        z-index: 9;
                                        color: red !important;
                                    }

                                }


                            }
                        }

                    }
                }
            }
        }
    }

    .foo {
        width: 100%;
        height: 10%;
        // background-color: red;
        display: flex;
        padding: 0 50rem;

        &>div {
            // width: 100%;
            width: 33.333%;
            height: 100%;
            // background-color: aqua;
            position: relative;


            .replay {
                width: 50rem;
                height: 50rem;
                position: absolute;
                background-color: white;
                border-radius: 999rem;
                font-size: 30rem;
                line-height: 50rem;
                text-align: center;
                color: #bbbdcb;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-shadow: 0 0 10rem 0 rgba(0, 0, 0, 0.2);
            }

            .replay:active {
                background-color: rgb(0, 0, 0, .5);
            }

            .clear {
                width: 60rem;
                height: 60rem;
                position: absolute;
                background-color: white;
                border-radius: 999rem;
                font-size: 30rem;
                line-height: 60rem;
                text-align: center;
                color: #bbbdcb;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-shadow: 0 0 10rem 0 rgba(0, 0, 0, 0.2);
            }

            .clear:active {
                background-color: rgb(0, 0, 0, .5);
            }

            .linke {
                width: 50rem;
                height: 50rem;
                position: absolute;
                background-color: white;
                border-radius: 999rem;
                font-size: 30rem;
                line-height: 50rem;
                text-align: center;
                color: #bbbdcb;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                box-shadow: 0 0 10rem 0 rgba(0, 0, 0, 0.2);


            }

            .linkesd {
                color: red;
            }

            .linke:active {
                background-color: rgb(0, 0, 0, .5);
            }
        }
    }
}
</style>