var ip = 'http://10.4.1.27:81'
function loginSubmit(){
    var isValid = $("#loginForm").form("validate");
	if(isValid){
        var userName = $('#userName').textbox('getValue');
        var password = $('#password').passwordbox('getValue');
        var accountType = $('#accountType').combobox('getValue');
        var data ={
            channel: accountType,
            mobile: userName,
            password: password
        }
        $.ajax({
            url:'/auth/login/loginPc',
            type:"post",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            data : JSON.stringify(data),
            headers: {
                'token':'1',
            },
            beforeSend:function(){
                $.messager.progress({
                    text:'登录中......',
                });
            },
            success: function(res,textStatus,request) {
                $.messager.progress('close');
                if(res.code == "200"){
                    sessionStorage.setItem("token",request.getResponseHeader("token"));
                    window.location.href = '../src/index.html'
                }else{
                    $.messager.show({
                        title:'消息提醒',
                        msg:res.message,
                        timeout:3000,
                        showType:'slide'
                    });	
                }
            },
            error : function(e){
                console.log(e);
            }
        }) 
    }		
}