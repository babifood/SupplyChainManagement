var editIndex = undefined;
// var ip = 'http://10.4.1.27:8382';
$(function(){
	//加载菜单设置列表
	loadTabs();
});
//加载Tabs
function loadTabs(){
	$("#menu_tabs").tabs({
        fit:true,
        border:false,
		onSelect:function(title,index){
			if(title=="目录维护"){
				loadCatalogue();
			}else if(title=="菜单维护"){
                loadMenu();
				loadMenuCatalogue();
			}else if(title=="功能按钮"){
                loadButtonMenu();
                loadButton();
			}
		}
	})
}
/**目录维护 **/
function loadCatalogue(){
    $("#catalogue_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		// pagination:true,
		// pageSize : 10,
		// pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#catalogue_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
            {
				field:"menuName",
				title:"目录名称",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"icon",
				title:"图标",
				width:50,
				editor:{
					type:'textbox',
					options:{
						
					}
				}
			},
			{
				field:"status",
				title:"是否启用",
				width:20,
				editor:{
                    type:'checkbox',
                    options:{
                        on:true,off:false
                    }
				},
			}
		]],
		onDblClickRow:function(index){
			onDblClickRow(index,'catalogue_dg');
		},
		loader:function(param, success, error){
			var params = {
				type:1
			}; //声明一个对象
			$.ajax({
				url:'/auth/menu/findMenuList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data,
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
/**菜单维护 **/
function loadMenu(){
    $("#menu_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#menu_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
            {
				field:"menuName",
				title:"菜单名称",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
            },
            {
				field:"url",
				title:"URL地址",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"icon",
				title:"图标",
				width:50,
				editor:{
					type:'textbox',
					options:{
						
					}
				}
			},
			{
				field:"status",
				title:"是否启用",
				width:50,
				editor:{
                    type:'checkbox',
                    options:{
                        on:true,off:false
                    }
                }
            },
            {
                field:'channel',
                title:"菜单属性",
                width:50,
				formatter:function(value){
                    if(value == 1){
						return '手机端菜单'
					}else if(value == 2){
						return '电脑端菜单'
					}
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'channel',
                        textField:'channelName',
                        data:[{'channel':1,'channelName':'手机端菜单'},{'channel':2,'channelName':'电脑端菜单'}],
                        required:true
                    }
                }		
            }
		]],
		onDblClickRow:function(index){
			onDblClickRow(index,'menu_dg');
		},
		onClickRow:function(rowIndex, rowData){
			var catalogue = $('#menu_catalogue_dg').datagrid('getData').rows;
			$.each(catalogue, function (index, item) {
                if (item.menuId == rowData.parentId) {
                    $('#menu_catalogue_dg').datagrid('checkRow', index);
                }
			});
		},
		loader:function(param, success, error){
			var params = {
				type:2
			}; //声明一个对象
			$.ajax({
				url:'/auth/menu/findMenuList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data,
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
function loadMenuCatalogue(){
    $("#menu_catalogue_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		// pagination:true,
		// pageSize : 10,
		// pageList : [10, 20, 30 ],
		pageNumber:1,
		singleSelect:true,
		rownumbers:true,
		columns:[[
            {
                field:"ck",
                align:'center',
				checkbox:true
			},
            {
				field:"menuName",
				title:"目录名称",
				width:50,
			},
			{
				field:"status",
				title:"是否启用",
				width:50,
			},
		]],
		loader:function(param, success, error){
			var params = {
				type:1
			}; //声明一个对象
			$.ajax({
				url:'/auth/menu/findMenuList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data,
					}
                    success(data);
				},
				error : function(e){
					error(e)
				}
			})
		},
	})
}
/**功能按钮 **/
function loadButtonMenu(){
    $("#button_menu_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pageNumber:1,
		singleSelect:true,
		rownumbers:true,
		columns:[[
            {
                field:"ck",
                align:'center',
				checkbox:true
			},
            {
				field:"menuName",
				title:"菜单名称",
				width:50,
            },
            {
				field:"url",
				title:"URL地址",
				width:50,
			},
			{
				field:"icon",
				title:"图标",
				width:50,
			},
			{
				field:"status",
				title:"是否启用",
				width:50,
            },
            {
                field:'channel',
                title:"菜单属性",
				width:50,
				formatter:function(value){
                    if(value == 1){
						return '手机端菜单'
					}else if(value == 2){
						return '电脑端菜单'
					}
                },
            }
		]],
		loader:function(param, success, error){
			var params = {
				type:2
			}; //声明一个对象
			$.ajax({
				url:'/auth/menu/findMenuList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data
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
function loadButton(){
    $("#button_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pageNumber:1,
		toolbar:"#button_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
            {
				field:"menuName",
				title:"菜单按钮",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
            },
            {
				field:"url",
				title:"URL地址",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"icon",
				title:"图标",
				width:50,
				editor:{
					type:'textbox',
					options:{
						
					}
				}
			},
			{
				field:"status",
				title:"是否启用",
				width:50,
				editor:{
                    type:'checkbox',
                    options:{
                        on:true,off:false
                    }
                }
			}
		]],
		onDblClickRow:function(index){
			onDblClickRow(index,'button_dg');
		},
		onClickRow:function(rowIndex, rowData){
			var catalogue = $('#button_menu_dg').datagrid('getData').rows;
			$.each(catalogue, function (index, item) {
                if (item.menuId == rowData.parentId) {
                    $('#button_menu_dg').datagrid('checkRow', index);
                }
			});
		},
		loader:function(param, success, error){
			var params = {
				type:3
			}; //声明一个对象
			$.ajax({
				url:'/auth/menu/findMenuList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data
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
		menuId:rowData.menuId
	}
	$.messager.confirm("提示","确定要删除此数据？",function(r){
		if(r){
			$.ajax({
				url:'/auth/menu/removeMenuInfo',
				type:"post",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : JSON.stringify(data),
				headers: {
					'token':sessionStorage.getItem('token'),
					'userId':'7877a4205a1646f6b2248d87c21f41e7'
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
		var data = {}
		var rowData =$('#'+dgId).datagrid('getSelected');
		if(dgId == 'catalogue_dg'){//目录
			data.channel = 2;//渠道1：手机，2：pc
			data.icon = rowData.icon;
			data.name = rowData.menuName;
			data.parentId = 0;//目录默认为0
			data.status = rowData.status==true?1:2;//状态:1生效，2失效
			data.type = 1;//类型，1目录，2菜单项，3按钮
			data.url = '';
		}else if(dgId =='menu_dg'){//菜单
			data.channel = rowData.channel;//渠道1：手机，2：pc
			data.icon = rowData.icon;
			data.name = rowData.menuName;
			data.parentId = $('#menu_catalogue_dg').datagrid('getSelected').menuId;//目录默认为0
			data.status = rowData.status==true?1:2;;//状态:1生效，2失效
			data.type = 2;//类型，1目录，2菜单项，3按钮
			data.url = rowData.url;
		}else if(dgId =='button_dg'){//按钮
			data.channel = 2;//渠道1：手机，2：pc
			data.icon = rowData.icon;
			data.name = rowData.menuName;
			data.parentId = 0;//目录默认为0
			data.status = rowData.status==true?1:2;;//状态:1生效，2失效
			data.type = 3;//类型，1目录，2菜单项，3按钮
			data.url = rowData.url;
		}
		if(rowData.menuId==undefined||rowData.menuId==''||rowData.menuId==null){
			url = '/auth/menu/saveMenuInfo';
			msg = '保存成功!';
		}else{
			url = '/auth/menu/updateMenuInfo';
			msg = '修改成功!';
			data.menuId=rowData.menuId;
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