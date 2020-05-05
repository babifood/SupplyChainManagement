var ipAndPost = 'http://10.4.1.27:8382';
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
            url: ipAndPost+'/auth/login/loginPc',
            type:"post",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            data : JSON.stringify(data),
            headers: {
                'token':'1'
            },
            beforeSend:function(){
                $.messager.progress({
                    text:'登录中......',
                });
            },
            success: function(obj) {
                $.messager.progress('close');
                if(obj.code == "200"){
                    window.location.href = '../src/index.html'
                }else{
                    $.messager.show({
                        title:'消息提醒',
                        msg:obj.message,
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