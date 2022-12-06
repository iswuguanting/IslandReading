import axios from "axios"

// get请求
export const request = (url:string,par:object) => axios.get(url,{
    params:par
})

// post请求
export const requestPost = (url:string,par:object) => axios.post(url,{
    params:par
})

export const api = 'https://apis.netstart.cn/daodu'

