var ipAndPost = 'http://10.4.1.27:8582';
var editIndex = undefined;
//初始化
$(function(){
	loadCompanyOrganization();
});
function loadCompanyOrganization(){
    $("#companyOrganization_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#companyOrganization_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"companyId",
				hidden:"true",
			},
            {
				field:"companyCode",
				title:"公司代码",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"companyName",
				title:"公司名称",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"description",
				title:"备注",
				width:50,
				editor:{
					type:'textbox',
					options:{
					}
				}
			}
		]],
		onDblClickRow:function(index){
			onDblClickRow(index,'companyOrganization_dg');
		},
		loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.companyCode = '';
			params.companyId = '';
			params.companyName = '';
			$.ajax({
				url:'/web/company/findCompanyInfoList',
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
		companyId:rowData.companyId
	}
	$.messager.confirm("提示","确定要删除此数据？",function(r){
		if(r){
			$.ajax({
				url:'/web/company/removeCompanyInfo',
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
		var url,msg;
		var rowData =$('#'+dgId).datagrid('getSelected');
		var data = {
		    companyCode: rowData.companyCode,
			companyName: rowData.companyName,
			description: rowData.description
		}
		if(rowData.companyId==undefined||rowData.companyId==''||rowData.companyId==null){
			url ='/web/company/saveCompanyInfo';
			msg = '保存成功!';
		}else{
			url ='/web/company/updateCompanyInfo';
			msg = '修改成功!';
			data.companyId=rowData.companyId;
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