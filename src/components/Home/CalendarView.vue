<script setup lang="ts">
import { defineComponent,ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useCounterThetim } from '@/stores/counter';
import router from "@/router";


const thetims = useCounterThetim()

const gotuNavTime = () => {
    router.push('/navtime')
}

</script>

<template>
    <div class="conten">
        
        <div class="calendartime" @click="gotuNavTime">

            <div class="calendartime-day">{{thetims.time?.dates}}</div>
            <div class="calendartime-date">
                <div>
                  {{thetims.time?.day}}
                  <div>
                    点击阅读更多
                  </div>
                </div>
                <div>
                 {{thetims.time?.nonday.dateStr}}
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.conten {
    width: 100vw;
    height: 100rem;

    .calendartime{
        display: flex;
        padding: 0 40rem;

        .calendartime-day{
            line-height: 100rem;
            font-size: 40rem;
            color: #909091;
        }

        .calendartime-date{
            width: 300rem;
            height: 40rem;
            margin: auto 20rem;
            

            &>div{
                line-height: 20rem;
                font-size: 14rem;
                position: relative;
                color: #909091;

                &>div{
                    position: absolute;
                    top: 0;
                    left: 100rem;
                    color: #c4a068;
                }
                 &>div::before{
                    content: '';
                    position: absolute;
                    top: 5rem;
                    left: -40rem;
                    width: 10rem;
                    height: 10rem;
                    background-color: #c4a068;
                    border-radius: 999rem;
                }
                &>div::after{
                    content: '';
                    position: absolute;
                    top: 10rem;
                    left: -30rem;
                    width: 25rem;
                    height: 1rem;
                    background-color: #c4a068;
                    border-radius: 999rem;
                }
            }
        }

    }
}
</style>