var ipAndPost = 'http://10.4.1.27:8382';
var editIndex = undefined;
var channelVal;
var datas = []
//初始化
$(function(){
	//加载Tabs
	loadTabs();
	//加载角色列表
	loadAuthority();
});
function loadAuthority(){
	//角色列表
	$("#authority_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		// fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#authority_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"powerId",
				hidden:"true",
			},
			{
				field:"name",
				title:"方法名称",
				width:200,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"methodType",
				title:"方法类型",
				width:100,
				editor:{
					type:'combobox',
					options:{
						valueField:'methodType',
						textField:'methodTypeName',
						data:[
							{'methodType':'GET','methodTypeName':'GET'},
							{'methodType':'POST','methodTypeName':'POST'},
						],
						required:true
					}
				}
			},
			{
				field:"methodUrl",
				title:"方法地址",
				width:200,
				editor:{
					type:'textbox',
					options:{
						required:true
					}
				}
			},
			{
				field:"status",
				title:"状态",
				width:100,
				formatter:function(value,row){
					if(value==1){
						return '启用';	
					}else if((value==2)){
						return '禁用';
					}
				},
			},
			{
				field:"description",
				title:"备注",
				width:200,
				editor:{
					type:'textbox',
					options:{

					}
				}
			}
		]],
		onDblClickRow:function(index){
			onDblClickRow(index,'authority_dg');
		},
		onClickRow:function(rowIndex, rowData){
			$('#pcMenu_ul').tree({
				queryParams: {
					powerId:rowData.powerId
				}
			});
			$('#phoneMenu_ul').tree({
				queryParams: {
					powerId:rowData.powerId
				}
			});
		},
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.roleName = param.name;	// 	角色名称 	是 	否 			
			$.ajax({
				url: '/auth/power/findPowerInfoList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data.list,
						total:obj.data.total
					}
                    success(data);
				},
				error : function(e){
					error(e)
				}
			})
		}
	})	
}
function endEditing(dgId){
	if (editIndex == undefined){return true}
	if ($('#'+dgId).datagrid('validateRow', editIndex)){
		$('#'+dgId).datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onDblClickRow(index,dgId){
	if (editIndex != index){
		if (endEditing(dgId)){
			$('#'+dgId).datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#'+dgId).datagrid('selectRow', editIndex);
		}
	}
}
function append(dgId){
	if (endEditing(dgId)){
		$('#'+dgId).datagrid('appendRow',{});
		editIndex = $('#'+dgId).datagrid('getRows').length-1;
		$('#'+dgId).datagrid('selectRow', editIndex)
				.datagrid('beginEdit', editIndex);
	}
}
function removeit(dgId){
	// if (editIndex == undefined){return}
	var rowData =$('#'+dgId).datagrid('getSelected');
	var index = $('#'+dgId).datagrid("getRowIndex",rowData);
	var node = $('#'+dgId).datagrid("getChecked");
	var data = {
		powerId:rowData.powerId
	}
	$.messager.confirm("提示","确定要删除此数据？",function(r){
		if(r){
			$.ajax({
				url: '/auth/power/removePowerInfo',
				type:"post",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : JSON.stringify(data),
				headers: {
					'token':sessionStorage.getItem('token'),
					'userName' :'1'
				},
				beforeSend:function(){
					$.messager.progress({
						text:'删除中......',
					});
				},
				success: function(obj) {
					$.messager.progress('close');
					if(obj.code == "200"){
						$.messager.show({
							title:'消息提醒',
							msg:'删除成功!',
							timeout:3000,
							showType:'slide'
						});
						$('#'+dgId).datagrid('cancelEdit', index).datagrid('deleteRow', index).datagrid('clearSelections',node);
						$('#'+dgId).datagrid('acceptChanges');
						editIndex = undefined;	
						$('#'+dgId).datagrid('reload',{});	
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
		editIndex = undefined;
	})
}
function accept(dgId){
	if (endEditing(dgId)){
		var url,msg;
		var rowData =$('#'+dgId).datagrid('getSelected');
		var data = {
			methodUrl: rowData.methodUrl,
			methodType: rowData.methodType,
			name: rowData.name,
			status:1,
			description:rowData.description
		}
		if(rowData.powerId==undefined||rowData.powerId==''||rowData.powerId==null){
			url = '/auth/power/savePowerInfo';
			msg = '保存成功!';
		}else{
			url = '/auth/power/updatePowerInfo';
			msg = '修改成功!';
			data.powerId=rowData.powerId;
		}
		$.ajax({
			url: url,
			type:"post",
			//请求的媒体类型
			contentType: "application/json;charset=UTF-8",
			data : JSON.stringify(data),
			headers: {
				'token':sessionStorage.getItem('token'),
				'userName' :'1'
			},
			beforeSend:function(){
				$.messager.progress({
					text:'保存中......',
				});
			},
			success: function(obj) {
				$.messager.progress('close');
				if(obj.code == "200"){
					$.messager.show({
						title:'消息提醒',
						msg:msg,
						timeout:3000,
						showType:'slide'
					});
					$('#'+dgId).datagrid('acceptChanges');
					$('#'+dgId).datagrid('reload',{});
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
function reject(dgId){
	$('#'+dgId).datagrid('rejectChanges');
	editIndex = undefined;
}
//加载Tabs
function loadTabs(){
	$("#authority_tabs").tabs({
        fit:true,
        border:false,
		onSelect:function(title,index){
			if(title=="电脑功能菜单"){
				channelVal = "2";
				loadPcMenuTree();
			}else if(title=="手机功能菜单"){
				channelVal = "1";
				loadPhoneMenuTree();
			}
		}
	})
}

//加载PC端菜单功能按钮
function loadPcMenuTree(){
	//菜单树
	$('#pcMenu_ul').tree({
		lines:true,
		checkbox:true,
		toggle:true,
		cascadeCheck:false,
		loader:function(param, success, error){
			var params = {}; //声明一个	
			params.pcChannel = true;
			if(param.powerId!=null){
				params.powerId = param.powerId;
			}
			$.ajax({
				url: '/auth/menu/findMenuInfoList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token'),
					'userName':'1',
					'userId':'1'
				},
				success: function(obj) {
					var data = convertNode(obj.data.pcMenuList);
					// console.log(obj);
					
                    success(data);
				},
				error : function(e){
					console.log(e);
				}
			})
		},
		onLoadSuccess:function(node,data){
		  if (data) {
			  $('#pcMenu_ul').tree('expandAll');
	      }
		}
	});
}
//加载手机端菜单功能按钮
function loadPhoneMenuTree(){
	//菜单树
	$('#phoneMenu_ul').tree({
		lines:true,
		checkbox:true,
		toggle:true,
		cascadeCheck:false,
		loader:function(param, success, error){
			var params = {}; //声明一个	
			params.mobileChannel = true;
			if(param.powerId!=null){
				params.powerId = param.powerId;
			}
			$.ajax({
				url: '/auth/menu/findMenuInfoList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token'),
					'userName':'1',
					'userId':'1'
				},
				success: function(obj) {
					var data = convertNode(obj.data.mobileMenuList);
                    success(data);
				},
				error : function(e){
					console.log(e);
				}
			})
		},
		onLoadSuccess:function(node,data){
		  if (data) {
			  $('#phoneMenu_ul').tree('expandAll');
	      }
		}
	});
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
				channel:obj[i].channel
			},
			children:obj[i].menuInfoVoList == null
			||obj[i].menuInfoVoList == undefined
			||obj[i].menuInfoVoList.length<=0?[]:convertNode(obj[i].menuInfoVoList)
		}
		node.push(item);
	}
	return node;
}
//重置
function resetFunction(){
	$("#methodName").textbox('setValue',"");
}
//查询
function searchFunction(){
	var methodName = $("#methodName").textbox('getValue');
	$('#authority_dg').datagrid({
		queryParams: {
			name:methodName
		}
	});
}
//菜单授权保存
function saveAuthority(){
	if(datas.length <= 0){
		$.messager.alert('我的消息','请先添加数据在保存','info');
		return;
	}
	$.ajax({
		url: '/auth/menu/updateMenuPower',
		type:"post",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		data : JSON.stringify(datas),
		headers: {
			'token':sessionStorage.getItem('token'),
			'userName' :'1',
			'userId':'1'
		},
		beforeSend:function(){
			$.messager.progress({
				text:'保存中......',
			});
		},
		success: function(obj) {
			$.messager.progress('close');
			if(obj.code == "200"){
				$.messager.show({
					title:'消息提醒',
					msg:'保存成功',
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
//添加数据
function addDatas(){
	var rowData =$('#authority_dg').datagrid('getSelected');
	if(rowData == null){
		$.messager.alert('我的消息','请选择一条权限数据','info');
		return;
	}
	var nodes = [];
	if(channelVal == 1){
		nodes = $('#phoneMenu_ul').tree('getChecked');
	}else if(channelVal == 2){
		nodes = $('#pcMenu_ul').tree('getChecked');
	}
	if(nodes.length > 1){
		$.messager.alert('我的消息','授权菜单时每次只能勾选一项','info');
		return;
	}
	var data = {
		powerId:rowData.powerId,
		channel:channelVal,
		menuId:nodes[0].id
	}
	datas.push(data);
	$.messager.alert('我的消息','添加数据成功,当前以添加'+datas.length+'条数据','info');
}
