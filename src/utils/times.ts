import { ref } from "vue";


export function getTimestamp(time: string | number | Date) {

    // 类型判断
    let m, d
    let date = new Date(time);
    let y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();

    // 类型验证


    m = m < 10 ? ('0' + m) : m;
    d = d < 10 ? ('0' + d) : d;

    return {
        no_time: `${y}-${m}-${d}`,
        time: `${y}-${m}-${d} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        times: `${y}${m}${d}`,
        timestamp: date.getTime(),
        date: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };
}

// 星期几  根据时间年月日
export function getWeek(timestamp: number | string) {
    let date = timestamp;

    let y = date.toString().substring(0, 4);
    let m = date.toString().substring(4, 6);
    let d = date.toString().substring(6);
    let week = new Date(`${y}-${m}-${d}`).getDay();
    switch (week) {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
        default:
            return "";
    }
}

// 将数字转为中文
export function numandchiniese(num: number | string) {
    let numStr = num.toString();

    switch (numStr) {
        case '1':
            return "一";
        case '2':
            return "二";
        case '3':
            return "三";
        case '4':
            return "四";
        case '5':
            return "五";
        case '6':
            return "六";
        case '7':
            return "七";
        case '8':
            return "八";
        case '9':
            return "九";
        case '0':
            return "零";
        default:
            return "";

    }

}

export function yeartime(num1: number | string) {
    let num2 = new Date().getTime();
    let num3 = Math.floor(num2 / 1000);
    // 没有毫秒的时间戳
    let num = Number(num1);

    let num4 = num3 - num;

    let num5 = Math.floor(num4 / 60);
    let num6 = Math.floor(num5 / 60);
    let num7 = Math.floor(num6 / 24);
    let num8 = Math.floor(num7 / 30);
    let num9 = Math.floor(num8 / 12);

    if (num9 > 0) {
        return num9 + '年前';
    }
    if (num8 > 0) {
        return num8 + '月前';
    }
    if (num7 > 0) {
        return num7 + '天前';
    }
    if (num6 > 0) {
        return num6 + '小时前';
    }
    if (num5 > 0) {
        return num5 + '分钟前';
    }
    if (num4 > 0) {
        return num4 + '秒前';
    }
}

export const monday = [
    {
        name: '十二月',
        value: '12',
        english: 'December',
        TimData:[]
    },
    {
        name: '十一月',
        value: '11',
        english: 'November',
        TimData:[]
    },
    {
        name: '十月',
        value: '10',
        english: 'October',
        TimData:[]
    },
    {
        name: '九月',
        value: '09',
        english: 'September',
        TimData:[]
    },
    {
        name: '八月',
        value: '08',
        english: 'August',
        TimData:[]
    },
    {
        name: '七月',
        value: '07',
        english: 'July',
        TimData:[]
    },
    {
        name: '六月',
        value: '06',
        english: 'June',
        TimData:[]
    },
    {
        name: '五月',
        value: '05',
        english: 'May',
        TimData:[]
    },
    {
        name: '四月',
        value: '04',
        english: 'April',
        TimData:[]
    },
    {
        name: '三月',
        value: '03',
        english: 'March',
        TimData:[]
    },
    {
        name: '二月',
        value: '02',
        english: 'February',
        TimData:[]
    },
    {
        name: '一月',
        value: '01',
        english: 'January',
        TimData:[]
    },

]