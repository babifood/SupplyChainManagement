var ipAndPost = 'http://10.4.1.27:8582';
var filesObj;
//当前时间戳
var timestamp;
//初始化
$(function(){
	loadNotificationManageData();
});
function loadNotificationManageData(){
	$("#notificationManage_dg").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#notificationManage_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			// {
			// 	field:"notifyId",
			// 	hidden:"true",
			// },
			{  
	          title:'通知单号',  
	          field:'notifyId',  
              align:'center',
			},
			{  
	          title:'通知时间',  
	          field:'messageTime',  
              align:'center',
			},
			{  
	          title:'通知标题',  
	          field:'title',  
              align:'center',
			},
			{  
                title:'供应商数',  
                field:'supplierNum',  
                align:'center',  
			},
			{  
                title:'状态',  
                field:'publish',  
                align:'center',
				formatter:function(value,row,index){
					if (value === 1){
						return '未发布';
					} else if(value === 2){
						return '已发布';
					}
				}  
			},
			// {  
            //     title:'操作',  
            //     field:'buyer',  
            //     align:'center',  
			// },
			{  
                title:'创建人',  
                field:'createUser',  
                align:'center',  
            },
			{  
                title:'最后修改',  
                field:'updateTime',  
                align:'center',  
			},
			{  
                title:'修改人',  
                field:'updateUser',  
                align:'center',  
			}
			
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.messageCode = '';	//消息code 	 	 		
			params.supplierName = '';	//供应商名称 	 	 		
			params.title = '';	//消息标题 			
			params.startDate = '';	//开始日期yyyy-MM-dd 	
			params.endDate = '';//结束日期yyyy-MM-dd
			$.ajax({
				url:'/web/message/findMessageInfoList',
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
		onDblClickRow:function(rowIndex, rowData){
			//查看消息详情
			console.log(rowData);
			
		},
	});
}
//通知类型下来选择生成编号
// function notificationTypeOnSelect(rec){
// 	// timestamp==undefined?timestamp = Date.parse(new Date()):timestamp;
// 	$('#notificationCode').textbox('setValue',rec.value);
// }
//发给所有供应商勾选事件
function checkboxOnChange(checked){
	if(checked){
		$('#showSupplier_dialog_btn').linkbutton('disable');
	}else{
		$('#showSupplier_dialog_btn').linkbutton('enable');
	}
}
//加载供应商信息
function loadSupplierData(messageId){
    $("#supplier_dg").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#supplier_tbar",
		singleSelect:false,
		rownumbers:true,
        columns:[[
			{
				field:"supplierId",
				hidden:"true",
			},
            {  
                field:'ck',  
                align:'center',
                checkbox:true
            },
			{  
	          title:'供应商编码',  
	          field:'lifnr',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商名',  
	          field:'providerName',  
              align:'center',
              width:50,
			}
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.messageId = messageId;	//消息code 	
			if(messageId==='-1'){
				var data = {
					rows:[],
					total:0
				}
				success(data);
			}else{
				$.ajax({
					url:'/web/provider/findProvidersOfMessage',
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
		}
	});
}
//清空已选供应商列表信息
function emptySupplier_dg(){  
    var item = $('#supplier_dg').datagrid('getSelections');
        if (item) {
            for (var i = item.length - 1; i >= 0; i--) {
                var index = $('#supplier_dg').datagrid('getRowIndex', item[i]);
                $('#supplier_dg').datagrid('deleteRow', index);
			}   
        }
}
/**------------------------------------------dialog-------------------------------------------------- */
//打开供应商选择窗体
function showSupplier_dialog(){
	$("#supplier_dialog").dialog("open").dialog("center").dialog("setTitle","供应商信息列表");
	loadSupplierDialogGridData()
}
//加载供应商列表信息
function loadSupplierDialogGridData(){
	$("#supplier_dialog_grid").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#supplier_dialog_tbar",
		singleSelect:false,
		rownumbers:true,
        columns:[[
			{
				field:"supplierId",
				hidden:"true",
			},
            {  
                field:'ck',  
                align:'center',
                checkbox:true
            },
			{  
	          title:'供应商编码',  
	          field:'lifnr',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商名',  
	          field:'providerName',  
              align:'center',
              width:50,
			}
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.invitationCode =	'';//邀请码 	否 	否 		
			params.providerCode = '';//供应商编码 	否 	否 		
			params.providerName = param.providerName;//供应商名称 	 	 		
			$.ajax({
				url:'/web/provider/findProviderInfoList',
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
//供应商名称查询
function supplier_dialog_search(){
	var supplierName = $("#supplier_dialog_supplierName").textbox('getValue');
	$('#supplier_dialog_grid').datagrid({
		queryParams: {
			providerName: supplierName
		}
	 });
}
//确定选中供应商
function supplier_dialog_confirm(){
	var rows = $('#supplier_dialog_grid').datagrid('getSelections');
	var targetRows = $('#supplier_dg').datagrid('getRows');
	if (targetRows.length == 0) {
		for(var i=0; i<rows.length; i++){
			$("#supplier_dg").datagrid('appendRow',
				{
					supplierId : rows[i].supplierId,
					lifnr:rows[i].lifnr,
					providerName:rows[i].providerName,
				});
		}
	}
	else {
		var flag = true;//不相等
		for (var i = 0; i <= rows.length - 1; i++){
			for (var j = 0; j <= targetRows.length - 1; j++){
				if (rows[i].lifnr == targetRows[j].lifnr) {
					flag = false;//相等
					break;
				}
				else {
					flag = true;
				}
			}
			if (flag == true) {
				$("#supplier_dg").datagrid('appendRow',
				{
					supplierId : rows[i].supplierId,
					lifnr:rows[i].lifnr,
					providerName:rows[i].providerName,
				});
			}
		}
	}
	$("#supplier_dialog").dialog("close");
}
//新增公告消息
function append(){
	timestamp = Date.parse(new Date())
	// $("#filelist").css("display","none");//隐藏div
	$('#notificationManage_form').form('clear');
	$("#notificationManage_window").window("open").window("setTitle","新增通知");
	$("#save_linkbutton").linkbutton('enable');
	$('#notificationFiles').filebox({prompt:'选择文件'});
    loadSupplierData('-1');
}
//保存公告消息
function saveMassage(){
	//调用文件上传接口
	var files = $('#notificationFiles').filebox("files");
	const formData = new FormData();  // 声明一个FormData对象
	for(var i = 0;i<files.length;i++){
		formData.append("files",files[i]);
	}
    $.ajax({
		url:'/web/file/multiFileUpload',
		type:"post",
		//请求的媒体类型
		contentType: false,
        processData: false,
		data : formData,
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
				saveMassageInfo();
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
//保存消息详细信息
function saveMassageInfo(){
	var formdata = $('#notificationManage_form').serializeArray();
	var supplierArray = []
	var supplierRows = $('#supplier_dg').datagrid('getRows');
	for(var i = 0;i<supplierRows.length;i++){
		var supplier ={
			supplierId : supplierRows[i].supplierId,
			supplierCode : supplierRows[i].lifnr,
			supplierName : supplierRows[i].providerName
		}
		supplierArray.push(supplier);
	}
	var json={};
	for(var i=0;i<formdata.length;i++){
		json[formdata[i]['name']]=formdata[i]['value'];
	}
	var fileValues = []
	var files = $('#notificationFiles').filebox("files");
	for(index = 0; index<files.length; index++){
		fileitem = {
			fileName:files[index].name,
			fileDesc:files[index].name+'desc',
			fileSort:index
		}
		fileValues.push(fileitem);
	}
	var data = {
		allProvider : json.check=="true"?true:false,	// 	所有供应商 	否 	否 		false
		content : json.notificationContext,	// 	消息内容 	是 	否 		
		files : fileValues,	 	//消息文件列表 	否 	否 	files:[{fileId：消息id}] 	
		messageCode : json.notificationType,	// 	消息code 	是 	否 		
		messageName : json.notificationType,	// 	消息名称 	是 	否 		
		providers : supplierArray,	// 	供应商列表 	否 	否 	"providers": [ { "supplierCode": "1", "supplierId": "1" } ] 	
		title : json.notificationTitle	// 	消息标题 	是
	}
	if(supplierRows.length <= 0 && data.allProvider == false){
		$.messager.alert('提示消息','您还没有指定消息推送的供应商哦！','info');
		return
	}
	var url,msg;
	if(json.notificationCode==''){
		url = '/web/message/saveMessageInfo';
		msg = '消息保存成功';
	}else{
		url = '/web/message/updateMessageInfo';
		msg = '消息更新成功';
		// if(data.files.length)
		data.messageId = json.notificationCode;
		if(data.files.length<=0){
			data.files = filesObj;
		}
	}
	$.ajax({
		url:url,
		type:"post",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		data : JSON.stringify(data),
		headers: {
			'token':sessionStorage.getItem('token'),
			'userName':'1',
			'userId':'1'
		},
		success: function(obj) {
			if(obj.code == "200"){
				$.messager.show({
					title:'消息提醒',
					msg:msg,
					timeout:3000,
					showType:'slide'
				});
				$('#notificationManage_window').window('close');
				$('#notificationManage_dg').datagrid('reload',{});
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
//删除公告消息
function removeit(){
	var dg = $('#notificationManage_dg');
	var rowData = dg.datagrid('getSelected');
	var index = dg.datagrid("getRowIndex",rowData);
	if(index>=0){
		$.messager.confirm("提示","确定要删除此数据？",function(r){
			if(r){
				$.ajax({
					url:'/web/message/removeMessageInfo',
					type:"post",
					//请求的媒体类型
					contentType: "application/json;charset=UTF-8",
					data : rowData.notifyId,
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
							dg.datagrid('reload',{});
						}else{
							$.messager.show({
								title:'消息提醒',
								msg:obj.message,
								timeout:3000,
								showType:'slide'
							});	
						}
					}
				})
			}
		})
	}else{
		$.messager.alert('提示消息','请选择要删除的数据！','info');
	}
}
//发送公告消息
function send(){
	var dg = $('#notificationManage_dg');
	var rowData = dg.datagrid('getSelected');
	var index = dg.datagrid("getRowIndex",rowData);
	if(index>=0){
		$.messager.confirm("提示","确定要发布此数据？",function(r){
			if(r){
				$.ajax({
					url:'/web/message/publishMessage',
					type:"post",
					//请求的媒体类型
					contentType: "application/json;charset=UTF-8",
					data : rowData.notifyId,
					headers: {
						'token':sessionStorage.getItem('token'),
						'userName':'1'
					},
					beforeSend:function(){
						$.messager.progress({
							text:'发布中......',
						});
					},
					success: function(obj) {
						$.messager.progress('close');
						if(obj.code == "200"){
							$.messager.show({
								title:'消息提醒',
								msg:'发布成功!',
								timeout:3000,
								showType:'slide'
							});	
							dg.datagrid('reload',{});
						}else{
							$.messager.show({
								title:'消息提醒',
								msg:obj.message,
								timeout:3000,
								showType:'slide'
							});	
						}
					}
				})
			}
		})
	}else{
		$.messager.alert('提示消息','请选择要发布的数据！','info');
	}
}
function update(){
	var dg = $('#notificationManage_dg');
	var rowData = dg.datagrid('getSelected');
	var index = dg.datagrid("getRowIndex",rowData);
	if(index>=0){
		$('#notificationManage_form').form('clear');
		$("#notificationManage_window").window("open").window("setTitle","修改通知");
		// $("#filelist").css("display","block");//显示div
		fundMessageInfo(rowData.notifyId);
		loadSupplierData(rowData.notifyId);
		$("#save_linkbutton").linkbutton('enable');
	}else{
		$.messager.alert('提示消息','请选择要修改的数据！','info');
	}   
}
//查询消息详情
function fundMessageInfo(notifyId){
	$.ajax({
		url:'/web/message/findMessageInfo',
		type:"get",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		data : {messageId:notifyId},
		headers: {
			'token':sessionStorage.getItem('token')
		},
		success: function(obj) {
			console.log(obj);
			$('#notificationCode').textbox('setValue',obj.data.notifyId);
			$('#notificationType').combobox('setValue',obj.data.messageName);
			$('#notificationTitle').textbox('setValue',obj.data.title);
			$('#notificationContext').textbox('setValue',obj.data.content);
			setFilesValues(obj.data.filesVo)
			filesObj = obj.data.filesVo;
		},
		error : function(e){
			console.log(e);
		}
	})
}
function setFilesValues(files){
	var filesName = '';
	for(var i = 0;i < files.length; i++){
		filesName+=files[i].fileName+';'
	}
	$('#notificationFiles').filebox({prompt:filesName});
}
//查看消息
function look(){
	var dg = $('#notificationManage_dg');
	var rowData = dg.datagrid('getSelected');
	var index = dg.datagrid("getRowIndex",rowData);
	if(index>=0){
		$('#notificationManage_form').form('clear');
		$("#notificationManage_window").window("open").window("setTitle","查看消息");
		// $("#filelist").css("display","block");//显示div
		fundMessageInfo(rowData.notifyId);
		loadSupplierData(rowData.notifyId);
		$("#save_linkbutton").linkbutton('disable');
	}else{
		$.messager.alert('提示消息','请选择要查看的数据！','info');
	}
}