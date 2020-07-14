$(function(){
	$('#tabs').tabs({
		fit:true,
		border:false,
    });
    let userName = sessionStorage.getItem('userName');
    $('#userinfo').html("您好:"+userName);
	//加载导航菜单
    RightAccordion();
});
//导航菜单
function RightAccordion(){
    $("#RightAccordion").accordion({ //初始化accordion
        fillSpace:true,
        fit:true,
        border:false,
        animate:false  
    });
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    var menus = convertNode(userInfo.menus);
    var topMenu =  filtrationJson(menus,"0")
    $.each(topMenu, function (i, e) {//循环创建手风琴的项
        var id = e.id;
        $('#RightAccordion').accordion('add', {
            title: e.text,
            content: "<ul id='tree"+id+"' ></ul>",
            selected: true,
            iconCls:e.iconCls//e.Icon
        });
        $.parser.parse();
        var treeMenu = filtrationJson(e.children,id)
        $("#tree" + id).tree({
            data: treeMenu,  
            onClick:function(node){
                if(node.attributes.url){
                     if($('#tabs').tabs('exists',node.text)){
                         $('#tabs').tabs('select',node.text);
                     }else{
                         addTab(node.text,node.attributes.url,node.iconCls);
                     }
                 }
            }
        });
    });                      
    // $.get("json/menuTerr.json",{"menuID":"0"}, //获取第一层目录
    //         function (data) {
    //             var topMenu =  filtrationJson(data,"0")
    //             $.each(topMenu, function (i, e) {//循环创建手风琴的项
    //                 var id = e.id;
    //                 $('#RightAccordion').accordion('add', {
    //                     title: e.text,
    //                     content: "<ul id='tree"+id+"' ></ul>",
    //                     selected: true,
    //                     iconCls:e.iconCls//e.Icon
    //                 });
    //                 $.parser.parse();
    //                 var treeMenu = filtrationJson(data,id)
    //                 $("#tree" + id).tree({
    //                     data: treeMenu,  
    //                     onClick:function(node){
    //                         if(node.url){
    //                              if($('#tabs').tabs('exists',node.text)){
    //                                  $('#tabs').tabs('select',node.text);
    //                              }else{
    //                                  addTab(node.text,node.url,node.iconCls);
    //                              }
    //                          }
    //                     }
    //                 });     
                  
    //             });
    //         }, "json");
}
/**
* Name 添加菜单选项 Param title 名称 Param href 链接 Param iconCls 图标样式 Param iframe
* 链接跳转方式（true为iframe，false为href）
*/
function addTab(title, pageName, iconCls) {
   var href = "../src/"+pageName;
   var tabPanel = $('#tabs');
   if (!tabPanel.tabs('exists', title)) {
       var content = '<iframe scrolling="auto" frameborder="0"  src="' + href
               + '" style="width:100%;height:100%;"></iframe>';
        tabPanel.tabs('add', {
            title : title,
            content : content,
            iconCls : iconCls,
            fit : true,
            closable : true,
            border : false
        });
   } else {
       tabPanel.tabs('select', title);
   }
}

function filtrationJson(data,parentID){
    var returnData = new Array();
    var index = 0;
    $.each(data, function (i, e) {
        if(e.attributes.parentId==parentID){
            returnData[index] = e;
            index++;
        }
    });
    return returnData;
}
//安全退出
function loginOut(){
    $.ajax({
        url: '/auth/logout',
        type:"post",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        headers: {
            'token':sessionStorage.getItem('token')
        },
        success: function(obj) {
            sessionStorage.removeItem('token')
            window.location.href = '../src/login.html'
        },
        error : function(e){
            console.log(e);
        }
    })
}
//打开修改密码窗口
function updatePassword(){
	$("#updatePsd_dog").dialog("open").dialog("center").dialog("setTitle","修改密码");
    $("#updatePsd_form").form('clear');
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    $("#userName").textbox('setValue',userInfo.user.userName);
    $("#phoneNub").textbox('setValue',userInfo.user.mobile);
};
//更新密码
function updateNewPsd(){
    var isValid = $("#updatePsd_form").form('validate');
    if(!isValid) return;
    let userName = $("#userName").textbox('getValue');
    let phoneNub = $("#phoneNub").textbox('getValue');
    let originalPassword = $("#originalPassword").textbox('getValue');
    let newPassword = $("#newPassword").textbox('getValue');
    var data = {
        userName : userName,
        mobile : phoneNub,	
        password : originalPassword,	
        newPassword : newPassword
	}
	$.ajax({
		url: '/auth/user/updatePassword',
		type:"post",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		data : JSON.stringify(data),
		headers: {
			'token':sessionStorage.getItem('token'),
		},
		success: function(obj) {
			if(obj.code == "200"){
				$.messager.show({
					title:'消息提醒',
					msg:'修改密码成功!',
					timeout:3000,
					showType:'slide'
				});
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

//书节点装换
function convertNode(obj){
	var node = new Array()
	for(var i=0;i<obj.length;i++){
		var item = {
			id:obj[i].menuId,
			text:obj[i].menuName,
			state:'open',
			checked:obj[i].status,
			iconCls:obj[i].icon,
			attributes:{
				url:obj[i].url,
                channel:obj[i].channel,
                parentId:obj[i].parentId
			},
			children:obj[i].menuInfoVoList == null
			||obj[i].menuInfoVoList == undefined
			||obj[i].menuInfoVoList.length<=0?[]:convertNode(obj[i].menuInfoVoList)
		}
		node.push(item);
	}
	return node;
}