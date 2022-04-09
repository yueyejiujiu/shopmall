import axios from 'axios'

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
            baseURL: 'http://152.136.185.210:7878/api/hy66',
            timeout: 5000
        })
        // 2.axios的拦截器
    instance.interceptors.request.use(
            config => {
                return config
            },
            err => {
                console.log(err)
            }
        )
        // 3.发送真正的网路请求
    return instance(config)
}