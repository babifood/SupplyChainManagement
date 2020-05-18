var ipAndPost = 'http://10.4.1.27:8382';
var editIndex = undefined;
//初始化
$(function(){
	//加载Tabs
	loadTabs();
	//加载角色列表
	loadRole();
});
function loadRole(){
	//角色列表
	$("#role_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#role_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"name",
				title:"角色名称",
				width:100,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"description",
				title:"角色描述",
				width:200,
				editor:{
					type:'textbox',
					options:{

					}
				}
			}
		]],
		onDblClickRow:function(index){
			onClickRow(index,'role_dg');
		},
		onClickRow:function(rowIndex, rowData){
			$('#company_dg').datagrid({
				queryParams: {
					roleId:rowData.roleId
				}
			});
			$('#pcMenu_ul').tree({
				queryParams: {
					roleId:rowData.roleId
				}
			});
			$('#phoneMenu_ul').tree({
				queryParams: {
					roleId:rowData.roleId
				}
			});
		},
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			// params.roleName ='';	// 	角色名称 	是 	否 		
			// params.roleId =''	// 	角色id 	是 	否 		
			$.ajax({
				url:'/auth/role/findRoleInfoList',
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
function onClickRow(index,dgId){
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
		roleId:rowData.roleId
	}
	$.messager.confirm("提示","确定要删除此数据？",function(r){
		if(r){
			$.ajax({
				url: '/auth/role/removeRoleInfo',
				type:"post",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : JSON.stringify(data),
				headers: {
					'token':sessionStorage.getItem('token')
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
		var companyArr = [];
		var logicArr = [];
		var url,msg;
		var rowData =$('#'+dgId).datagrid('getSelected');
		//获取选中公司ids
		var companyRowData =$('#company_dg').datagrid('getSelections');
		for(var i=0; i<companyRowData.length; i++){
			companyArr.push(companyRowData[i].companyId)
		}
		//获取PC端菜单数据
		if($('#pcMenu_ul').data != undefined){
			var pcNodes = $('#pcMenu_ul').tree('getChecked');
			for(var i=0; i<pcNodes.length; i++){
				logicArr.push(pcNodes[i].id)
			}
		}
		//获取手机端菜单数据
		if($('phoneMenu_ul').data != undefined){
			var phoneNodes = $('#phoneMenu_ul').tree('getChecked');
			for(var i=0; i<phoneNodes.length; i++){
				logicArr.push(phoneNodes[i].id)
			}
		}
		var data = {
			name: rowData.name,
			description: rowData.description,
			companyIds: companyArr,
			logicIds:logicArr
		}
		if(rowData.roleId==undefined||rowData.roleId==''||rowData.roleId==null){
			url = '/auth/role/saveRoleInfo';
			msg = '保存成功!';
		}else{
			url = '/auth/role/updateRoleInfo';
			msg = '修改成功!';
			data.roleId=rowData.roleId;
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
	$("#role_tabs").tabs({
        fit:true,
        border:false,
		onSelect:function(title,index){
			if(title=="后台功能菜单"){
				loadPcMenuTree();
			}else if(title=="手机功能菜单"){
				loadPhoneMenuTree();
			}else if(title=="公司组织"){
				loadCompany();
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
			params.roleId = param.roleId==null?'':param.roleId;
			$.ajax({
				url: '/auth/menu/findMenusOfRole',
				// url:'../json/pcMenu.json',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
					var data = convertNode(obj.data.pcMenuList);
					console.log(data);
					
                    success(data);
				},
				error : function(e){
					error(e)
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
			params.roleId = param.roleId==null?'':param.roleId;
			$.ajax({
				url: '/auth/menu/findMenusOfRole',
				// url:'../json/pcMenu.json',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
					var data = convertNode(obj.data.mobileMenuList);
					console.log(data);
					
                    success(data);
				},
				error : function(e){
					error(e)
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
//公司
function loadCompany(){
	//角色列表
	$("#company_dg").datagrid({
		// url:"../json/role.json",
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		// pagination:true,
		// pageSize : 10,
		// pageList : [10, 20, 30 ],
		// pageNumber:1,
		// singleSelect:true,
		checkOnSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"companyId",
				hidden:"true",
			},
			{
				field:"status",
				checkbox:true
			},
			{
				field:"companyCode",
				title:"公司代码",
				width:100
			},
			{
				field:"companyName",
				title:"公司名称",
				width:100
			},
			
		]],
		loader:function(param, success, error){
			var params = {}; //声明一个	
			params.roleId = param.roleId==null?'':param.roleId;
			$.ajax({
				url: '/auth/menu/findMenusOfRole',
				// url:'../json/pcMenu.json',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    success(obj.data.companyList);
				},
				error : function(e){
					error(e)
				}
			})
		},
		onLoadSuccess: function (data) {
            if (data) {
                $.each(data.rows, function (index, item) {
                    if (item.status == 1) {
                        $('#company_dg').datagrid('checkRow', index);
                    }
                });
            }
        },
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
