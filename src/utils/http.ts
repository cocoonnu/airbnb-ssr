// 1、如果请求发送成功，那么请求函数返回一个 promise 对象 分为成功态和失败态

// 2、如果请求发送失败，则返回一个 AxiosError 对象

// 对象里面是两个类型 用作 ts 封装
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const defaultConfig = {
    timeout: 5000,
    // baseURL: import.meta.env.PROD ? 'http://110.42.184.111' : 'http://localhost:3000/release'
}

// TS 封装
class Http {
    constructor() {
        // 实例化请求响应拦截
        this.httpInterceptorsRequest()
        this.httpInterceptorsResponse()
    }

    private static axiosInstance = axios.create(defaultConfig)

    // 请求拦截 config 为一个 axios 请求类型
    private httpInterceptorsRequest() {
        Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            return config
        }, err => {
            return Promise.reject(err)
        })
    }

    // 响应拦截 response 为一个 axios 响应类型
    private httpInterceptorsResponse() {
        Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
            return response
        }, err => {
            return Promise.reject(err)
        })
    }


    // 封装请求（公有属性） 函数返回类型为一个泛式
    public httpRequestGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.get(url, { params }).then(res => res.data).catch()
    }

    public httpRequestPost<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.post(url, params).then(res => res.data).catch()
    }
}

// 导出 http 实例 内部包含 httpRequestPost httpRequestGet
export const http = new Http()
