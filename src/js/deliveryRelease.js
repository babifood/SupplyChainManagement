var ipAndPost = 'http://10.4.1.27:8582'
var editIndex = undefined; 
//初始化
$(function(){
    loadDeliveryReleaseShwoData();
    loadDeliveryReleaseOperationData();
});

function loadDeliveryReleaseShwoData(){
	$("#deliveryReleaseShwo_dg").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		singleSelect:false,
		rownumbers:true,
        columns:[[
			{
				field:"deliveryId",
				hidden:"true",
			},
            {  
                field:'ck',  
                align:'center',
                checkbox:true
            },
			{  
	          title:'订单号',  
	          field:'orderId',  
              align:'center',
              width:80,
			},
			{  
	          title:'物料编码',  
	          field:'matterCode',  
              align:'center',
              width:80,
			},
			{  
	          title:'物料名称',  
	          field:'matterName',  
              align:'center',
              width:160,
			},
			{  
	          title:'要求交期',  
	          field:'expireTime',  
              align:'center',
              width:50,
			},
			{  
	          title:'订单数',  
	          field:'matterNum',  
              align:'center',
              width:50,
			},
			{  
	          title:'单位',  
	          field:'matterUtil',  
              align:'center',
              width:50,
			},
			{  
	          title:'已发数量',  
	          field:'finishNum',  
              align:'center',
              width:50,
			},
			{  
	          title:'待发数量',  
	          field:'waitNum',  
              align:'center',
              width:50,
			},
			{  
	          title:'交货地址',  
	          field:'address',  
              align:'center',
              width:50,
			},
			{  
				field:"detailId",
				hidden:"true",
			},
        ]],
			onDblClickRow:function(index){

		},
		
        loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows; 
			$.ajax({
				url: ipAndPost+'/web/delivery/getDeliveryOrderList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token'),
					'supplierCode':'20239'
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

function loadDeliveryReleaseOperationData(){
	$("#deliveryReleaseOperation_dg").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		// pagination:true,
		// pageSize : 10,
        // pageList : [10, 20, 30 ],
        toolbar:"#deliveryReleaseOperation_tbar",
		pageNumber:1,
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{
				field:"deliveryId",
				hidden:"true",
			},
			{  
				field:"detailId",
				hidden:"true",
			},
			{  
	          title:'订单号',  
	          field:'orderId',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料编码',  
	          field:'matterCode',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料名称',  
	          field:'matterName',  
              align:'center',
              width:50,
			},
			{  
	          title:'订单数',  
	          field:'matterNum',  
              align:'center',
              width:50,
			},
			{  
	          title:'单位',  
	          field:'matterUtil',  
              align:'center',
              width:50,
			},
			{  
	          title:'已发数量',  
	          field:'finishNum',  
              align:'center',
              width:50,
			},
			{  
	          title:'本次发货',  
	          field:'matterNumnew',  
              align:'center',
			  editor:{
				type:'validatebox',options:{required:true}},
              width:30,
			},
			{  
	          title:'配送方式',  
	          field:'shippingMethodd',  
              align:'center',
              width:50,
			  editor:{
			 	type:'combobox',
				options:{
					valueField:'shippingCode',
					textField:'shippingName',
				}
			  }			  
			},
			{  
	          title:'到货时间',  
	          field:'expectTime',  
              align:'center',
              width:80,
			  editor:{type:'datetimebox',options:{required:true}},
  		    },			
			{  
	          title:'发货状态',  
	          field:'isFinish',  
              align:'center',
              width:30,
              editor:{type:'checkbox',options:{on:'1',off:'0'}},
			  formatter: function(value){
				if (value){				
				  return "已发全";
			   } else
			   {
				  return "未发全";
			   }}
			},
			{  
	          title:'单据上传',  
	          field:'',  
              align:'center',
			  formatter: function(value,row,index)
			      {
                      return "<a href='javascript:void(0)' class='easyui-linkbutton' onclick='uploadFiles()'>上传附件</a>";
				  },
              width:50,
			},{  
	          title:'备注说明',  
	          field:'description',  
              align:'center',
              width:80,
			  editor:{
				type:'textbox',
				options:{
				}},
  		    },{
			  title:'数组字段',
			  field:'fileList',
			  width:1000,
			  hidden:true,
			  editor:{
				type:'textbox'},			  
			},
        ]],onAfterEdit: function (rowIndex, rowData, changes) {
			//endEdit该方法触发此事件
			editIndex = undefined;
			},
			onClickRow: function (index) {
         if (editIndex != index){
             if (endEditing()){
                 $('#deliveryReleaseOperation_dg').datagrid('selectRow', index)
                         .datagrid('beginEdit', index);
                 editIndex = index;
             } else {
                 $('#deliveryReleaseOperation_dg').datagrid('selectRow', editIndex);
             }
			}
				synchCategory(index);		
			}
			

	});
}


function addFunction()
{
	rows = $("#deliveryReleaseShwo_dg").datagrid("getSelections");
	if (rows.length > 0 ){
		for (var i = 0;i < rows.length; i++){
			$("#deliveryReleaseOperation_dg").datagrid('appendRow',rows[i]);
		}
	}	
	$("#deliveryReleaseOperation_dg").datagrid('acceptChanges');	
}

function removeFunction(){
	
    var row = $('#deliveryReleaseOperation_dg').datagrid('getSelected');
    if (row) {
             var rowIndex = $('#deliveryReleaseOperation_dg').datagrid('getRowIndex', row);
             $('#deliveryReleaseOperation_dg').datagrid('deleteRow', rowIndex);  
     }
}		

function saveFunction()
{
	var url,msg;
	
	 if (endEditing()){
		 var data = [];
		 var rows = $('#deliveryReleaseOperation_dg').datagrid('getChanges');
		 var $dg=$('#deliveryReleaseOperation_dg');
		 if ($dg.datagrid('getChanges').length) {
			// var inserted = $dg.datagrid('getChanges', "inserted"); //获取添加状态的行
			// var deleted = $dg.datagrid('getChanges', "deleted");//获取删除状态的行
			var updated = $dg.datagrid('getChanges', "updated");//获取修改状态的行
			 var effectRow = new Object();
			 if (updated.length) {
				effectRow["update"] = updated;
			 }
	 
	        data = effectRow.update;
			
			for(j = 0,len=data.length; j < len; j++) {
				var filelist =  JSON.parse(data[j].fileList);
				data[j].fileList =  filelist;
            }
			 
    		msg = "保存成功！";
			
		    url = '/web/delivery/updateDeliveryOrderDetail';
			 
				$.ajax({
					url: url,
					type:"post",
					//请求的媒体类型
					contentType: "application/json;charset=UTF-8",
					data : JSON.stringify(data),
					headers: {
						'token':sessionStorage.getItem('token'),
						'userName' :'1',
						'operatorId':'7383040d9eb441529f765174b9aee520'
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
							$('#deliveryReleaseOperation_dg').datagrid('reload',{});
						}else{
							$.messager.show({
								title:'消息提醒',
								msg:obj.message,
								timeout:5000,
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
}

//打开文件上传窗口
function uploadFiles(){
	var rowData =$('#deliveryReleaseOperation_dg').datagrid('getSelected');
	var index = $('#deliveryReleaseOperation_dg').datagrid("getRowIndex",rowData);
	if(index>=0){
		$('#files_form').form('clear');
		$('#files_dog').dialog('open');
	}else{
		$.messager.alert("消息提示！","请选择一条数据！","info");
	}
	
}

//文件上传
function saveFiles(){
    var rowData =$('#deliveryReleaseOperation_dg').datagrid('getSelected');
	var index = $('#deliveryReleaseOperation_dg').datagrid("getRowIndex",rowData);
    var orderId = rowData.detailId;
	var formData = new FormData();
	var devFiles = $('#devFiles').filebox("files");
	fileValueConvert(formData,devFiles);
    $.ajax({
		url: '/web/file/multiFileUpload',
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
				//saveFilesInfo();
			    fileSaveValueConvert(index,devFiles,orderId,'deliveryFile');
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
	
	$('#files_dog').dialog('close');
}

//保存文件信息
function saveFilesInfo(){
	var data = [];
	var rowData =$('#deliveryReleaseOperation_dg').datagrid('getSelected');
	var orderId = rowData.detailId;
	var devFiles = $('#devFiles').filebox("files");
	fileSaveValueConvert(data,devFiles,orderId,'deliveryFile');

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
				$('#deliveryReleaseOperation_dg').datagrid('reload',{});
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

function fileSaveValueConvert(rowIndex,filesVal,orderId,fileType){
	var dataArr = new Array();
	for(var i = 0;i<filesVal.length;i++){
		var file ={
			orderId:orderId,
			fileCode:'deliveryOrder',
			fileType:fileType,
			fileName:filesVal[i].name,
			fileDesc:filesVal[i].name,
			fileSort:i
		}
		dataArr.push(file);
	}
	
	var editor  = $('#deliveryReleaseOperation_dg' ).datagrid( 'getEditor',{index:rowIndex,field: 'fileList' });  
	if (editor  != null) {
		editor.target.textbox("setValue", JSON.stringify(dataArr));
	}
}

function synchCategory(rowIndex){
	
  if (editIndex != rowIndex){return true}	
      var jqData;  
      var url = ipAndPost+'/web/shippingMethod/findShippingCodeAndNameList';
      var ed = $('#deliveryReleaseOperation_dg' ).datagrid( 'getEditor',{index:rowIndex,field: 'shippingMethodd' });  
     $.ajax({  
           url:url,  
           dataType : 'json',  
           type : 'get',  
           success: function (data){  
                jqData = data.data;  
                $(ed.target).combobox( 'loadData' , jqData);  
           }  
     });  
} 


function endEditing(){
  if (editIndex == undefined){return true}
  if ($('#deliveryReleaseOperation_dg').datagrid('validateRow', editIndex)){
	  $('#deliveryReleaseOperation_dg').datagrid('endEdit', editIndex);
	  editIndex = undefined;
	  return true;
	  } else {
	return false;
 }
}
