<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import type { LessonsType, peopleType } from "@/TypeValidation";
import { yeartime } from "@/utils/times";

// 接收父组件传递的数据
// const props = defineProps({
//     isShowTo: {
//     type: Boolean,
//   }
// });

const props = defineProps<{
    isShowTo: boolean,
    article: string | undefined,
    peopl: peopleType[],
    peoplnum: number | undefined,
}>();
const emit = defineEmits(['gomyfarther'])
const gomyfarther = () => {
    emit('gomyfarther', true);
}

const isShowTo = ref(props.isShowTo);
const article = ref(props.article);
const peopl = ref(props.peopl);
const peoplnum = ref(props.peoplnum)
console.log(peoplnum.value, 111)
console.log(isShowTo.value, article.value, peopl.value);

// 时间
// const year
// 当前时间减去过去的时间
peopl.value = peopl.value.map((item) => {
    item.user.avatar = item.user.avatar != ''? item.user.avatar : 'https://img.bosszhipin.com/beijin/upload/avatar/20221128/607f1f3d68754fd0514c2f8fcdadae58270fe4f2ecf9ad9f41fffbe1138d9a75f7777504fe0ec8a0_s.png',

    // item.user.avatar = item.user.avatar == "" ? 
    item.time = yeartime(item.created_at);
    return item;
});

</script>

<template>
    <!-- animate__fadeInUp -->
    <div class="bosingfs">
        <!-- 头部 -->
        <nav class="navs">
            <div @click="gomyfarther">
                <van-icon name="cross" />
            </div>
            <div>
                <div>{{ article }}</div>
                <div>{{ peoplnum }}想法</div>
            </div>
            <div>
                <van-icon name="ellipsis" />
            </div>
        </nav>
        <div class="poot"></div>
        <main class="contengs">
            <div class="contengs-tex" v-for="(item, index) in peopl" :key="index">
                <div class="img-names">
                    <img :src="item.user.avatar" alt="">
                    <div>{{ item.user.nickname }}</div>
                </div>
                <div class="texts-tear">
                    {{ item.content }}
                </div>
                <div class="times">
                    <div>{{item.time}}</div>
                    <div>
                        <div>
                            <van-icon name="chat-o" />
                        </div>
                        <div>
                            <van-icon name="like" />
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </div>
</template>

<style lang="scss" scoped>
.bosingfs {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #d7dddd 0%, #bdbed0 100%);
    overflow: auto;

    .navs {
        width: 100vw;
        height: 50rem;
        background-color: rgb(255, 255, 255, 0.8);
        position: fixed;
        box-sizing: border-box;
        padding: 0 20rem;
        display: flex;

        &>div:nth-child(1) {
            position: absolute;
            line-height: 50rem;
            font-size: 20rem;
            font-weight: 600;
        }

        &>div:nth-child(2) {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &>div:nth-child(1) {

                font-size: 18rem;
                font-weight: 600;
            }
        }

        &>div:nth-child(3) {
            position: absolute;
            right: 20rem;
            line-height: 50rem;
            font-size: 20rem;
            font-weight: 600;
        }

    }

    .poot {
        width: 100%;
        height: 50rem;
    }

    .contengs {
        padding: 0 20rem;
        overflow-y: scroll;
        overflow-x: hidden;

        .contengs-tex {
            width: 100%;
            // height: 500rem;
            background-color: white;
            margin: 20rem 0 0 0;
            border-radius: 10rem;
            padding: 0 20rem;

            .img-names {
                display: flex;
                padding: 20rem 0;

                // background-color: red;
                img {
                    width: 30rem;
                    height: 30rem;
                    border-radius: 50%;
                }

                div {
                    margin-left: 20rem;
                    display: flex;
                    align-items: center;
                    width: 200rem;
                    height: 30rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14rem;
                    font-weight: 600;
                }
            }

            .texts-tear {
                width: 100%;
                color: #9b9b9b;
                font-size: 15rem;
                line-height: 20rem;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
            }

            .times {
                padding: 20rem 0;
                width: 100%;
                height: 20rem;
                // background-color: red;
                display: flex;
                justify-content: space-between;
                align-items: center;

                &>div:nth-child(1) {
                    font-size: 12rem;
                    color: #9b9b9b;
                }

                &>div:nth-child(2) {
                    display: flex;
                    align-items: center;

                    &>div:nth-child(1) {
                        margin-right: 20rem;
                        font-size: 16rem;
                        color: #9b9b9b;
                    }

                    &>div:nth-child(2) {
                        font-size: 16rem;
                        color: #9b9b9b;
                    }
                }
            }
        }

    }
}

.bosingfs::-webkit-scrollbar {
    display: none;
}
.contengs::-webkit-scrollbar {
    display: none;
}
</style>