import axios from 'axios';
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken,getCode } from '@/utils/auth'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (store.getters.token) {
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            config.headers['Access-Token'] = getToken();
            // util.cookies.set('code', res.data.AccessCode)
            config.headers['Access-Code'] = getCode();
        }
        return config
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
    response => {
        // 有 code 代表这是一个后端接口 可以进行进一步的判断
        const res = response.data
        switch (res.errcode) {
            case 0:
                // [ 示例 ] code === 0 代表没有错误
                return response.data
            case "1001":
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
                return Promise.reject(error)
            default:
                // 不是正确的 code
                return res
        }
    },
    error => {
        if (error && error.response) {
            console.log(error)
            switch (error.response.status) {
                case 400:
                    error.errmsg = '请求错误';
                    break
                case 401:
                    error.errmsg = '未授权，请登录';
                    break
                case 403:
                    error.errmsg = '拒绝访问';
                    break
                case 404:
                    error.errmsg = `请求地址出错: ${error.response.config.url}`;
                    break
                case 408:
                    error.errmsg = '请求超时';
                    break
                case 500:
                    error.errmsg = '服务器内部错误';
                    break
                case 501:
                    error.errmsg = '服务未实现';
                    break
                case 502:
                    error.errmsg = '网关错误';
                    break
                case 503:
                    error.errmsg = '服务不可用';
                    break
                case 504:
                    error.errmsg = '网关超时';
                    break
                case 505:
                    error.errmsg = 'HTTP版本不受支持';
                    break
                default:
                    break
            }
        }
        Message({
            message: error.errmsg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
);

export default service;
