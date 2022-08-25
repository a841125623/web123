$(function () {
    //点击去注册账号的链接
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    //点击去登录的链接
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })


    //从layui中获取 from对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的市确认密码的内容
            //还需要拿到密码框里的值
            //然后进行一次等于判断
            //如果失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });



    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //1.阻止默认的提交行为
        e.preventDefault()
        var data = { username: $('#form_reg [name=title]').val(), password: $('#form_reg [name=password]').val() }
        //2.发起Ajax的POST请求
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //console.log(res.message)
                layer.msg(res.message)

                ///模拟人的点击行为返回到登录页
                $('#link_login').click()
            })

    })


    //监听登录表格提交事件
    $('#form_login').submit(function (e) {
        //1.阻止默认的提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                layer.msg('登录成功！')
                //将登陆成功的得到的 token字符串，保存到localStorage 中
                localStorage.setItem('token', res.token)
                //跳转到后台页面
                location.href = '/index.html'
            }
        })
    })
})