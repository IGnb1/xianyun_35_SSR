import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:1337';
// 添加请求拦截器:可以拦截每一个axios请求
// 拦截器的本质并不是来发起请求的，而是对请求报文进行处理
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么:获取token，设置请求头
    //   1.获取token
    let mytoken = localStorage.getItem('itcast_manager_35_token')
    if (mytoken) {
      // 2.设置请求头:config.headers是一个对象，里面就包含着当前的请求头的设置
      //   console.log(config)
      config.headers.Authorization = mytoken
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    //   Promise.reject(error):中止本次请求
    return Promise.reject(error)
  })
  export default axios;