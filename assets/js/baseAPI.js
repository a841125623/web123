//每次调用 或 或 的时候，会先调用下面这个份函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在真正发起Ajax请求之前，统一拼接请求的根路径
    options.url = '' + options.url
})