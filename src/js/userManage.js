var ipAndPost = 'http://10.4.1.27:8382';
var editIndex = undefined;
//初始化
$(function(){
	//加载角色列表
    loadRole();
    //加载用户列表
    loadUser();
});
//加载角色列表
function loadRole(){
	//角色列表
	$("#role_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		// pagination:true,
		// pageSize : 10,
		// pageList : [10, 20, 30 ],
		// pageNumber:1,
        singleSelect:true,
        checkOnSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"roleId",
				hidden:"true",
			},
			{
                field:"status",
                align:'center',
				checkbox:true
			},
			{
				field:"name",
                title:"角色名称",
                width:100,
			},
			{
				field:"description",
				title:"角色描述",
                align:'center',
                width:100,
			},
			
		]],
		loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.userId = param.userId==null?'':param.userId;	
			$.ajax({
				url: '/auth/role/findRolesOfUser',
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
		onLoadSuccess: function (data) {
            if (data) {
                $.each(data.rows, function (index, item) {
                    if (item.status == 1) {
                        $('#role_dg').datagrid('checkRow', index);
                    }
                });
            }
        },
	})	
}
//加载用户列表
function loadUser(){
    $("#user_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#user_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"userId",
				title:"用户ID",
				width:150,
			},
			{
				field:"userName",
				title:"姓名",
				width:150,
				editor:{
					type:'validatebox',
					options:{
                        required:true
					}
				}
			},
			{
				field:"companyCode",
				title:"公司代码",
				hidden:"true",
				editor:{
					type:'text',
					options:{}
				}
			},
			{
				field:"companyName",
				title:"所属公司",
				width:150,
				editor:{
					type:'combogrid',
					options:{
                        panelWidth: 500,
                        idField: 'companyName',
						textField: 'companyName',
						striped:true,
						border:false,
						pagination:true,
						pageSize : 10,
						pageList : [10, 20, 30 ],
						pageNumber:1,
						rownumbers:true,
						fitColumns: true,
						required:true,
                        columns: [[
                            {field:'companyCode',title:'公司代码',width:250},
                            {field:'companyName',title:'公司名称',width:250},
                        ]],
						onSelect:function (index, row){
							var ed_nub = $('#user_dg').datagrid('getEditor', {index:editIndex,field:'companyCode'});
							$(ed_nub.target).val(row.companyCode); 
						},
						loader:function(param, success, error){
							var params = {}; //声明一个对象
							params.page  = param.page;
							params.limit  = param.rows;	
							$.ajax({
								url: '/web/company/findCompanyInfoList',
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
						},
					}
				}
			},
			{
				field:"department",
				title:"所属部门",
				width:150,
				editor:{
					type:'textbox',
					options:{}
				}
            },
            {
				field:"mobile",
				title:"电话",
				width:150,
				editor:{
					type:'validatebox',
					options:{
                        required:true
					}
				}
			},
            {
				field:"password",
				title:"用户密码",
				width:150,
				editor:{
					type:'passwordbox',
					options:{
                        required:true
                    }
				}
			},
            {
				field:"status",
				title:"用户状态",
				width:100,
				formatter:function(value,row){
                    if(value==1){
						return '启用'
					}else if(value==2){
						return '禁用'
					}
                },   
			},
			{
				field:"userType",
				title:"账户类别",
				width:100,
				formatter:function(value,row){
                    if(value==0){
						return '内部'
					}else if(value==1){
						return '外部'
					}
                },   
				
            },
			{
				field:"providerCompany",
				title:"供应商名称",
				width:100,
				
            },
			{
				field:"invitCode",
				title:"验证码",
				width:100,
				
            }
		]],
		queryParams: {
			userType: 0
		},
		loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.userType	 = param.userType;	
			$.ajax({
				url: '/auth/user/getUserInfoList',
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
		},
		onDblClickRow:function(index){
			onDblClickRow(index,'user_dg');
		},
		onClickRow:function(rowIndex, rowData){
			$('#role_dg').datagrid({
				queryParams: {
					userId:rowData.userId
				}
			 });
		}
	})
}
function radioOnClick(value){
	$('#user_dg').datagrid({
		queryParams: {
			userType : value,
		}
	 });
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
		userId:rowData.userId
	}
	$.messager.confirm("提示","确定要删除此数据？",function(r){
		if(r){
			$.ajax({
				url: '/auth/user/removeUserInfo',
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
		var orleArr = [];
		var url,msg;
		var rowData =$('#'+dgId).datagrid('getSelected');
		var orleRows = $('#role_dg').datagrid('getSelections');
		for(var i=0; i<orleRows.length; i++){
			orleArr.push(orleRows[i].roleId)
		}
		var data = {
			companyCode :rowData.companyCode,	//string 	公司编码 	是 	否 		
			companyName :rowData.companyName,	//string 	公司名称 	是 	否 		
			department 	:rowData.department,//string 	所属部门 	是 	否 		
			mobile 	:rowData.mobile,//string 	手机号码 	是 	否 		
			password :rowData.password,	//string 	密码 	是 	否 		
			roleIds : orleArr,	//ARRAY 	角色id列表 	是 	否 	"roleIds": [ "1" ] 	
			userDesc :'',	//string 	用户描述 	是 	否 		
			userName :rowData.userName,	//string 	用户名称 	是 	否 		
		}
		if(rowData.userId==undefined||rowData.userId==''||rowData.userId==null){
			url = '/auth/user/saveUserInfo';
			msg = '保存成功!';
			data.userType = '0';	//string 	用户类型：0内部，1外部 	是 	否
		}else{
			url = '/auth/user/updateUserInfo';
			msg = '修改成功!';
			data.userId=rowData.userId;
			data.description = '';
			data.status = rowData.status == ''||rowData.status==null?'0':rowData.status;
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