import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 进度条
// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css';


const defaultConfig = {
    timeout: 5000,
    // baseURL: import.meta.env.PROD ? 'http://110.42.184.111' : 'http://localhost:3000/release'
    // baseURL: '/api'
}

// TS 封装
class Http {
    constructor() {
        // 实例化请求响应拦截
        this.httpInterceptorsRequest()
        this.httpInterceptorsResponse()
    }

    private static axiosInstance = axios.create(defaultConfig)

    // 请求拦截 config 为一个 axios 请求
    private httpInterceptorsRequest() {
        Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 发送请求前可以做的事
            // nprogress.start();

            return config
        }, err => {
            return Promise.reject(err)
        })
    }

    // 响应拦截 response 为一个 axios 响应
    private httpInterceptorsResponse() {
        Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
            // 响应前可以做的事
            // nprogress.done();

            return response
        }, err => {
            // nprogress.done();

            console.log('发送请求失败，请检查 api 接口');
            return Promise.reject(err)
        })
    }


    // 封装 get/post 请求函数
    public httpRequestGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.get(url, params).then(res => res.data).catch()
    }

    public httpRequestPost<T>(url: string, params: AxiosRequestConfig): Promise<T> {
        return Http.axiosInstance.post(url, params).then(res => res.data).catch()
    }
}

// 导出 http 实例
export const http = new Http()
