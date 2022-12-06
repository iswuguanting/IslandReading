<script setup lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import CalendarView from "@/components/Home/CalendarView.vue";
import SwiperView from "@/components/Home/SwiperView.vue";


</script>

<template>
    <main class="contengs">
        <CalendarView />
        <SwiperView />
    </main>
</template>

<style lang="scss" scoped>
.contengs {
    width: 100vw;
    height: 100vh;
    background:linear-gradient(180deg, #d7dddd 0%, #bdbed0 100%);

}
</style>