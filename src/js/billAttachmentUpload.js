var ipAndPost = 'http://10.4.1.27:8582'
var editIndex = undefined;
//初始化
$(function(){
	setDateToMonth('begMonth');
	setDateToMonth('endMonth');
	var data = new Date();
	var year = data.getFullYear();
	var month = data.getMonth()+1;
	$('#begMonth').datebox('setValue',year+'-'+month);
	$('#endMonth').datebox('setValue',year+'-'+month);
	loadBillAttachmentUploadData();
});
//对账确认列表
function loadBillAttachmentUploadData(){
	$("#billAttachmentUpload_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		// fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#billAttachmentUpload_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
            {
                field:"ck",
                align:'center',
				checkbox:true
			},
			{  
	          title:'年度',  
	          field:'year',  
              align:'center',
              width:50,
			},
			{  
	          title:'月份',  
	          field:'month',  
              align:'center',
              width:50,
			},
			{  
	          title:'对账单号',  
	          field:'stateId', 
              align:'center',
              width:100,
			},
			{  
                title:'月账单总金额',  
                field:'totalAmount',  
                align:'center',
                width:100,  
			},
			{  
                title:'月扣款总额',  
                field:'withholdAmount',  
                align:'center',
                width:100,  
            },
            {  
                title:'实际货款总额',  
                field:'actualAmount',  
                align:'center',
                width:100,  
            },
            {  
                title:'币种',  
                field:'currency',  
                align:'center',
                width:100,  
			},
            {  
                title:'账单上传',  
                field:'stateBill',  
                align:'center',
				width:100,
				formatter:function(value){
					if (value){
						return '有';
					} else {
						return '无';
					}
				}
			},
            {  
                title:'发票上传',  
                field:'stateInvoice',  
                align:'center',
                width:100,
				formatter:function(value){
					if (value){
						return '有';
					} else {
						return '无';
					}
				}
			},
            {  
                title:'其他文件1',  
                field:'other1File',  
                align:'center',
                width:100,
				formatter:function(value){
					if (value){
						return '有';
					} else {
						return '无';
					}
				}
			},
            {  
                title:'其他文件2',  
                field:'other2File',  
                align:'center',
                width:100,
				formatter:function(value){
					if (value){
						return '有';
					} else {
						return '无';
					}
				}
			},
            {  
                title:'其他文件3',  
                field:'other3File',  
                align:'center',
                width:100,
				formatter:function(value){
					if (value){
						return '有';
					} else {
						return '无';
					}
				} 
			}						
		]],
		queryParams: {
			begDate: $('#begMonth').datebox('getValue').replace("-",''),
			endDate: $('#endMonth').datebox('getValue').replace("-",''),
		},
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.startYearmonth = param.begDate;	
			params.endYearmonth = param.endDate;	
			$.ajax({
				url: '/web/stateFile/getStateFileList',
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
	});
}
//打开文件上传窗口
function uploadFiles(){
	var rowData =$('#billAttachmentUpload_dg').datagrid('getSelected');
	var index = $('#billAttachmentUpload_dg').datagrid("getRowIndex",rowData);
	if(index>=0){
		$('#files_form').form('clear');
		$('#files_dog').dialog('open');
	}else{
		$.messager.alert("消息提示！","请选择一条数据！","info");
	}
	
}
//文件上传
function saveFiles(){
	var formData = new FormData();
	var billFiles = $('#billFiles').filebox("files");
	var invoiceFiles = $('#invoiceFiles').filebox("files");
	var otherFiles1 = $('#otherFiles1').filebox("files");
	var otherFiles2 = $('#otherFiles2').filebox("files");
	var otherFiles3 = $('#otherFiles3').filebox("files");
	fileValueConvert(formData,billFiles);
	fileValueConvert(formData,invoiceFiles);
	fileValueConvert(formData,otherFiles1);
	fileValueConvert(formData,otherFiles2);
	fileValueConvert(formData,otherFiles3);
    $.ajax({
		url:'/web/file/multiFileUpload',
		type:"post",
		//请求的媒体类型
		contentType: false,
        processData: false,
		data:formData,
		headers: {
			'token':sessionStorage.getItem('token'),
		},
		beforeSend:function(){
			$.messager.progress({
				text:'保存中......',
			});
		},
		success: function(obj) {
			$.messager.progress('close');
			if(obj.code== "200"){
				//文件上传成功后调用公告消息保存方法
				saveFilesInfo();
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
//保存文件信息
function saveFilesInfo(){
	var data = [];
	var rowData =$('#billAttachmentUpload_dg').datagrid('getSelected');
	var statesId = rowData.statesId;
	var billFiles = $('#billFiles').filebox("files");
	var invoiceFiles = $('#invoiceFiles').filebox("files");
	var otherFiles1 = $('#otherFiles1').filebox("files");
	var otherFiles2 = $('#otherFiles2').filebox("files");
	var otherFiles3 = $('#otherFiles3').filebox("files");
	fileSaveValueConvert(data,billFiles,statesId,'stateBill');
	fileSaveValueConvert(data,invoiceFiles,statesId,'stateInvoice');
	fileSaveValueConvert(data,otherFiles1,statesId,'stateOther1');
	fileSaveValueConvert(data,otherFiles2,statesId,'stateOther2');
	fileSaveValueConvert(data,otherFiles3,statesId,'stateOther3');
	$.ajax({
		url:  '/web/file/saveFileInfo',
		type:"post",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		data : JSON.stringify(data),
		headers: {
			'token':sessionStorage.getItem('token'),
			'userId':'1',
			'userName':'1'
		},
		success: function(obj) {
			if(obj.code == "200"){
				$.messager.show({
					title:'消息提醒',
					msg:'附件保存成功!',
					timeout:3000,
					showType:'slide'
				});
				$('#files_dog').dialog('close');
				$('#billAttachmentUpload_dg').datagrid({
					queryParams: {
						begDate: $('#begMonth').datebox('getValue').replace("-",''),
						endDate: $('#endMonth').datebox('getValue').replace("-",''),
					}
				});
				// $('#billAttachmentUpload_dg').datagrid('reload',{});
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
function fileValueConvert(formData,filesVal){
	for(var i = 0;i<filesVal.length;i++){
		formData.append("files", filesVal[i]);
	}
}
function fileSaveValueConvert(dataArr,filesVal,statesId,fileType){
	for(var i = 0;i<filesVal.length;i++){
		var file ={
			orderId:statesId,
			fileCode:'stateOrder',
			fileType:fileType,
			fileName:filesVal[i].name,
			fileDesc:filesVal[i].name,
			fileSort:i
		}
		dataArr.push(file);
	}
}
function searchFunction(){
	$('#billAttachmentUpload_dg').datagrid({
		queryParams: {
			begDate: $('#begMonth').datebox('getValue').replace("-",''),
			endDate: $('#endMonth').datebox('getValue').replace("-",''),
		}
	});
}