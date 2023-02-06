<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import { request, api } from "@/apis/axios";
import { useRouter } from "vue-router";
import type { LessonsType, peopleType } from "@/TypeValidation";
import { numandchiniese } from "@/utils/times"
import DetailsTwoView from "@/components/Home/DetailsTwoView.vue";
import { useUser } from '@/stores/counter';

// 拿到数据的locstorege
let locstorege = ref(JSON.parse(localStorage.use));
// pinia用户消息
const defineStor = useUser()
// 获取路径的query
const router = useRouter()
const userrote = ref(router.currentRoute.value.query);
// 文章内容数据
const article = ref<LessonsType>();
// 获取文章内容
const artiData = ref();

// 日期数字转文字
const num1 = ref();
const num2 = ref();
const num3 = ref();
const num4 = ref();

// 月
const moon = ref();
// 日
const day = ref();

// 今天的日期,月和日
const today = new Date();
const todayMoon = today.getMonth() + 1;
const todayDay = today.getDate();
moon.value = todayMoon > 9 ? todayMoon : "0" + todayMoon;
day.value = todayDay > 9 ? todayDay : "0" + todayDay;


const comment = ref()
const contopname = ref();
// 顶部的标题显示内容
const contopnameTo = ref(false);
// 底部的标题显示内容
const commentBott = ref(true)

// 用户的想法数据
const peopl = ref<peopleType[]>([])
// 全部想法数量
const peoplnum = ref<number>()
// 获取全部用户的想法
const peoplData = ref();

// 页面是否加载完成才渲染
const isShow = ref(false);

// 页面显示和隐藏
const isShowTo = ref(true);

// 主页面大爱心判断是否是高亮
let userLocstor1 = ref(false);

console.log(userrote.value.id)

interface elType1 {
    id: string | undefined
    provenance: string | undefined
    title: string | undefined
}


// 屏幕内的喜欢高亮
const showrs = (id: string) => {
    if (defineStor.usertrue == true) {
        locstorege.value.forEach((element: any, index: number) => {
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

const CancelLove = () => {
    showrs(userrote.value.id as string)

    if( userLocstor1.value == true){
        locstorege.value.forEach((element: any, index: number) => {
            if (element.id == defineStor.userID) {
                element.datas.forEach((res: elType1, index: number) => {
                    if (res.id == userrote.value.id) {
                        element.datas.splice(index, 1)
                        localStorage.use = JSON.stringify(locstorege.value)
                        userLocstor1.value = false
                    }
                })
            }
        });

    }else{
        locstorege.value.forEach((element: any, index: number) => {
            if (element.id == defineStor.userID) {
                element.datas.push({
                    id: userrote.value.id,
                    provenance: article.value?.provenance,
                    title: article.value?.title
                })
                localStorage.use = JSON.stringify(locstorege.value)
                userLocstor1.value = true
            }
        });
    }
}



// https://apis.netstart.cn/daodu/lessons/6335baac8d555800061883d8
request(api + `/lessons/${userrote.value.id}`, {}).then(res => {
    console.log(res.data);
    // 文字内容数据
    artiData.value = res.data.article.split('\n')
    // console.log(articleData)
    article.value = res.data

    let numbe = res.data.date_by_day + ''
    console.log(numbe);

    // 日期数字转文字
    num1.value = numandchiniese(numbe.slice(4, 5));
    num2.value = numandchiniese(numbe.slice(5, 6));
    num3.value = numandchiniese(numbe.slice(6, 7));
    num4.value = numandchiniese(numbe.slice(7, 8));

    isShow.value = true
})

// 动态获取图片
const getAssetsImages = () => {
    return new URL('/src/assets/yonhu.png', import.meta.url).href
}
// 获取评论内容
request(api + `/lessons/${userrote.value.id}/comments`, {}).then(res => {
    console.log(res.data);
    peoplnum.value = res.data.length;
    peoplData.value = res.data
    let datas = res.data.map((res: peopleType) => {
        return {
            content: res.content,
            content_tr_zh_hant: res.content_tr_zh_hant,
            created_at: res.created_at,
            id: res.id,
            lesson_id: res.lesson_id,
            user: {
                avatar: res.user.avatar == '' ? getAssetsImages() : res.user.avatar,
                id: res.user.id,
                nickname: res.user.nickname,
            }
        }
    })
    console.log(datas);

    peopl.value = datas.slice(0, 2)
})

const showtru = () => {
    isShowTo.value = false
}
const gomyfarther = () => {
    isShowTo.value = true

}

const gonote = () => {
    router.go(-1)
}

// 滚动页面触发
const scoller = (e: any) => {
    console.log('滚动了')
    console.log(e);

}

const onScroll = (e: any) => {
    // console.log(e);

    // console.log(e.path[1].pageYOffset + 667);
    // console.log(yinc.value.offsetTop, 'yinc')
    // console.log(comment.value.offsetTop + 60, 'comment');

    let contop = contopname.value?.clientHeight
    // console.log(e.target.lastElementChild.scrollTop)
    // console.log(contop, 'contopname')
    if (e.target.lastElementChild.scrollTop >= contop) {
        contopnameTo.value = true
    } else {
        contopnameTo.value = false
    }
    // commentBott
    let commentBotttop = comment.value?.offsetTop + 90
    if (e.target.lastElementChild.scrollTop + 667 >= commentBotttop) {
        commentBott.value = false
    } else {
        commentBott.value = true
    }


};



onMounted(() => {
    console.log(11)
    window.addEventListener("scroll", onScroll);
    showrs(userrote.value.id as string)
})

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
});

</script>

<template>
    <div>
        <div v-if="isShowTo">
            <div class="load-page" v-if="isShow == false">
                <div class="nav-img" @click="gonote">
                    <img src="@/assets/tui.jpg" alt="">
                </div>
                <van-loading class="spinner" type="spinner" size="80px" />
            </div>
            <main class="contengs" v-if="isShow">

                <div class="contengs-nav" :class="{ 'conactive': contopnameTo }">
                    <div class="nav-img" @click="gonote">
                        <img src="@/assets/tui.jpg" alt="">
                    </div>
                    <div class="nav-name" v-if="contopnameTo">
                        <div>{{ article?.title }}</div>
                        <div>{{ num1 }}{{ num2 }}月{{ num3 }}{{ num4 }}</div>
                    </div>
                </div>
                <div class="contengs-main" ref="sco" @scroll="scoller">
                    <div class="main-content">
                        <div class="content-top" ref="contopname">
                            <div>{{ article?.title }}</div>
                            <div>{{ num1 }}{{ num2 }}月{{ num3 }}{{ num4 }}</div>
                        </div>
                        <div class="conten-tex" v-for="(item, index) in artiData" :key="index">
                            {{ item }}<br />
                        </div>
                    </div>
                    <!-- 作者 -->
                    <div class="author">
                        《{{ article?.provenance }}》 , &nbsp;{{ article?.author.name }}
                    </div>
                    <!-- 打卡 -->
                    <div class="author-img">
                        <img src="@/assets/Snipaste_2022-11-24_19-22-54.jpg" alt="">
                        <div class="author-context">{{ moon }}/{{ day }}</div>
                    </div>
                    <!-- 底部图形展示 -->
                    <div ref="comment" class="comment-ti"></div>
                    <div class="author-comment" v-if="commentBott">
                        <div>
                            <img src="@/assets/爱心.png" alt="">
                            <img src="@/assets/聊天.png" alt="">
                        </div>
                        <div>
                            <img src="@/assets/分享.png" alt="">
                        </div>
                    </div>
                    <div class="foother">
                        <div class="foother-title">想法</div>
                        <div class="foother-main">
                            <div><img src="@/assets/yonhu.png" alt=""></div>
                            <div>写点什么吧...</div>
                        </div>
                        <!-- 评论的用户和内容 -->
                        <div class="foo-people" v-for="item in peopl" :key="item.id">
                            <div class="people-name">
                                <div><img :src="item.user.avatar" alt=""></div>
                                <div>{{ item.user.nickname }}</div>
                            </div>
                            <div class="people-text">
                                {{ item.content }}
                            </div>
                        </div>
                        <div class="foother-over">
                            全部{{ peoplnum }}条想法
                        </div>
                    </div>
                    <div class="boot"></div>
                </div>

                <!-- 底部导航栏 -->
                <div class="xiangfa" v-if="commentBott == false">
                    <div>
                        <div @click="CancelLove">
                            <img v-if="userLocstor1 == false" src="@/assets/爱心.png" alt="">
                            <img v-if="userLocstor1 == true" src="@/assets/user/aix.png" alt="">

                            <span>{{ userrote.num1 }}</span>
                        </div>
                        <div @click="showtru">
                            <img src="@/assets/聊天.png" alt="">
                            <span>{{ peoplnum }}</span>
                        </div>
                    </div>
                    <div>
                        <img src="@/assets/分享.png" alt="">
                    </div>
                </div>
            </main>
        </div>

        <div v-if="isShowTo == false">
            <DetailsTwoView :peopl="peoplData" :article="article?.title" :isShowTo="isShowTo" @gomyfarther="gomyfarther"
                :peoplnum="peoplnum" />
        </div>
    </div>

</template>

<style lang="scss" scoped>
.load-page {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    position: fixed;

    .nav-img {
        width: 23rem;
        height: 23rem;
        margin: 20rem;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.contengs {
    width: 100vw;
    background-color: #fff;
    overflow: auto;

    .contengs-nav {
        width: 100vw;
        height: 50rem;
        position: fixed;
        padding: 0 20rem;
        display: flex;
        justify-content: space-between;
        z-index: 10;

        .nav-img {
            width: 23rem;
            height: 23rem;
            margin: auto 0;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .nav-name {
            height: 100%;
            text-align: right;
            display: flex;
            flex-direction: column;
            justify-content: center;

            &>div:nth-child(1) {
                font-size: 16rem;
                font-weight: 600;
            }
        }
    }

    .conactive {
        background-color: rgb(255, 255, 255, .8);
    }

    .contengs-main {
        width: 100%;
        background-color: #fff;
        padding: 20rem;
        overflow: auto;

        .main-content {
            width: 100%;
            // background-color: skyblue;


            .content-top {
                width: 100%;
                height: 300rem;
                // background-color: red;
                writing-mode: tb-rl;
                letter-spacing: 4rem;

                &>div:nth-child(1) {
                    font-size: 30rem;
                    margin-left: 10rem;
                    font-family: '华文行楷';
                }

                &>div:nth-child(2) {
                    font-size: 16rem;
                    margin-left: 10rem;
                    font-family: '华文行楷';
                }
            }

            .conten-tex {
                font-size: 18rem;
                font-family: '华文楷体';
            }
        }

        .author {
            width: 100%;
            height: 100rem;
            padding-top: 60rem;
            font-size: 16rem;
            color: #9a9a9a;
            // background-color: red;
        }

        .author-img {
            width: 100%;
            height: 100rem;
            position: relative;
            // background-color: red;

            .author-context {
                position: absolute;
                top: 0;
                bottom: 0;
                color: #9a9a9a;

                line-height: 92rem;
                left: 50rem;
            }
        }

        .comment-ti {
            width: 100%;
            height: 1rem;
            color: #f9f9f9;
        }

        .foother {
            width: 100%;
            // background-color: #ddd;
            margin-top: 20rem;

            .foother-title {
                font-size: 20rem;
                font-weight: 600;
            }

            .foother-main {
                width: 100%;
                height: 70rem;
                background-color: #fff;
                // padding: 30rem;
                display: flex;
                position: relative;

                &>div:nth-child(1) {
                    img {
                        width: 30rem;
                        position: absolute;
                        margin: auto 0;
                        top: 0;
                        bottom: 0;
                    }
                }

                &>div:nth-child(2) {
                    display: flex;
                    align-items: center;
                    margin-left: 40rem;
                    font-size: 14rem;
                    color: #d5d5d5;
                }
            }

            .foo-people {
                width: 100%;
                background-color: #fff;
                // padding: 30rem;
                margin: 20rem 0;

                .people-name {
                    display: flex;
                    position: relative;

                    &>div:nth-child(1) {
                        img {
                            width: 30rem;
                            position: absolute;
                            margin: auto 0;
                            top: 0;
                            bottom: 0;
                            border-radius: 999rem;
                        }
                    }

                    &>div:nth-child(2) {
                        display: flex;
                        align-items: center;
                        margin-left: 50rem;
                        font-size: 16rem;
                        color: #d5d5d5;
                    }
                }

                .people-text {
                    margin-top: 20rem;
                    font-size: 16rem;
                    line-height: 22rem;
                    font-family: '微软雅黑';
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                }


            }

            .foother-over {
                font-weight: 600;
                margin-top: 30rem;
                color: #c4a068;
                font-size: 14rem;
            }
        }

        .boot {
            width: 100%;
            height: 130rem;
        }

        .author-comment {
            width: 100%;
            height: 100rem;
            // background-color: red;
            display: flex;
            justify-content: space-between;

            &>div:nth-child(1) {
                // background-color: red;
                margin: auto 0;
                top: 0;
                bottom: 0;

                img {
                    width: 30rem;
                    height: 30rem;
                    margin-right: 20rem;
                }
            }

            &>div:nth-child(2) {
                // background-color: red;
                margin: auto 0;
                top: 0;
                bottom: 0;

                img {
                    width: 30rem;
                    height: 30rem;
                }
            }
        }
    }

    .xiangfa {
        width: 100vw;
        height: 90rem;
        background-color: white;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        padding: 0 20rem;
        align-items: center;

        &>div:nth-child(1) {
            // background-color: red;
            margin: auto 0;
            top: 0;
            bottom: 0;
            display: flex;

            &>div:nth-child(1) {
                // background-color: red;
                margin: auto 0;
                top: 0;
                bottom: 0;
                display: flex;
                margin-right: 20rem;
                align-items: center;

                img {
                    width: 30rem;
                    height: 30rem;
                }
            }

            &>div:nth-child(2) {
                // background-color: red;
                margin: auto 0;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;


                img {
                    width: 30rem;
                    height: 30rem;
                }
            }


        }

        &>div:nth-child(2) {
            // background-color: red;
            margin: auto 0;
            top: 0;
            bottom: 0;

            img {
                width: 30rem;
                height: 30rem;
            }
        }
    }
}
</style>