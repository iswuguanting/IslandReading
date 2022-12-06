import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterThetim = defineStore('thetim', () => {
  const time = ref()
  function increment(re: object) {
    time.value = re
  }

  // 轮播图跳转到当前日期
  let swiperTogo = ref(0);
  function swip(re: number) {
    swiperTogo.value = re
  }

  return { time, increment, swiperTogo, swip }
})


// 拿到用户数据
export const useUser = defineStore('user', () => {
  const userID = ref(0)
  // 验证用户是否登录
  const usertrue = ref(false)

  function useric(re: number) {
    userID.value = re;
    usertrue.value = true;
  }

  function userout() {
    userID.value = 0;
    usertrue.value = false;
  }

  return { userID, usertrue, useric,userout }
})