var editIndex = undefined; 
//初始化
$(function(){
    loadDeliveryReleaseShwoData();
    loadDeliveryReleaseOperationData();
	loadData();
});

function loadDeliveryReleaseShwoData(){
	$("#deliveryReleaseShwo_dg").datagrid({
        loadMsg:"数据加载中......",
                             fit:true,
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
              width:100,
			},
			{  
	          title:'物料编码',  
	          field:'matterCode',  
              align:'center',
              width:100,
			},
			{  
	          title:'物料名称',  
	          field:'matterName',  
              align:'center',
              width:250,
			},
			{  
	          title:'要求交期',  
	          field:'expireTime',  
              align:'center',
              width:160,
			},
			{  
	          title:'订单数',  
	          field:'matterNum',  
              align:'center',
              width:80,
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
              width:80,
			},
			{  
	          title:'待发数量',  
	          field:'waitNum',  
              align:'center',
              width:80,
			},
			{  
	          title:'交货地址',  
	          field:'address',  
              align:'center',
              width:200,
			},
			{  
			  field:"detailId",
			  hidden:"true",
			},
			{  
	          field:'matterNumnew',  
			  hidden:"true",
			},
			{
			  field:'fileList',
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
				url: '/web/delivery/getDeliveryOrderList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token'),
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
		striped:true,
		border:false,
                             fit:true,
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
              width:100,
			},
			{  
	          title:'物料编码',  
	          field:'matterCode',  
              align:'center',
              width:100,
			},
			{  
	          title:'物料名称',  
	          field:'matterName',  
              align:'center',
              width:250,
			},
			{  
	          title:'订单数',  
	          field:'matterNum',  
              align:'center',
              width:80,
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
              width:80,
			},
			{  
	          title:'本次发货',  
	          field:'matterNumnew',  
			  align:'center',
			  width:100,
			  editor:{
				type:'numberbox',
				options:{
					required:true
					}
				}
			},
			{  
	          title:'发货状态',  
	          field:'isFinish',  
              align:'center',
              width:120,
              editor:{type:'checkbox',options:{on:'1',off:'0'}},
			  formatter: function(value){
				if (value == '1'){				
				  return "已发全";
			   } else
			   {
				  return "未发全";
			   }},
			},
			{  
	          title:'单据上传',  
	          field:'uploadfiles',  
              align:'center',
			  formatter: function(value,row,index)
			      {
 					  return "<a href=\"#\" class=\"easyui-linkbutton\" data-options=\"iconCls:\'icon-search\',plain:\'true\'\" onclick=\"uploadFiles()\"><span class=\"l-btn-left l-btn-icon-left\"><span class=\"l-btn-text\"> 文件上传</span><span class=\"l-btn-icon icon-find\">&nbsp;</span></span></a>";
				  },
              width:120,
			},{
			   title:'文件名称',
			   field:'filename',
			   width:160,
               editor:{
				type:'textbox'},			   
			},
			{
			  title:'数组字段',
			  field:'fileList',
			  width:10,
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
			}
	});
}


function addFunction()
{
	rows = $("#deliveryReleaseShwo_dg").datagrid("getSelections");
	
	if (rows.length > 0 ){
		for (var i = 0;i < rows.length; i++){
			var data = rows[i];
			var index=$('#deliveryReleaseShwo_dg').datagrid('getRowIndex',data);
            $('#deliveryReleaseShwo_dg').datagrid('deleteRow',index);
			$("#deliveryReleaseOperation_dg").datagrid('appendRow',data);
		}
	}	
	$("#deliveryReleaseOperation_dg").datagrid('acceptChanges');	
}

function removeFunction(){
	
    var row = $('#deliveryReleaseOperation_dg').datagrid('getSelected');

    if (row) {
             var rowIndex = $('#deliveryReleaseOperation_dg').datagrid('getRowIndex', row);
             $('#deliveryReleaseOperation_dg').datagrid('deleteRow', rowIndex);  
	         $("#deliveryReleaseOperation_dg").datagrid('acceptChanges');
             $("#deliveryReleaseShwo_dg").datagrid('appendRow',row);
	         $("#deliveryReleaseOperation_dg").datagrid('acceptChanges');
             editIndex = undefined;

     }
}		

function saveFunction()
{
	var url,msg;
	var data = new Array();
	
	$("#deliveryReleaseOperation_dg").datagrid('acceptChanges');	
	var rows =  $('#deliveryReleaseOperation_dg').datagrid('getRows');
	
	var shippingMethod = $("#shippingMethod").val();
	var expectTime = $("#expectTime").val();
	var description = $("#description").val();

	for ( j = 0; j< rows.length; j++ ){
		
		var num1 = rows[j]['matterNumnew'];
		var filelist = rows[j]['fileList'];	
		
		if (typeof(shippingMethod) == "undefined" || shippingMethod == "" ){
			msg = "配送方式未输入！";
			break;
		}
		
		if (typeof(expectTime) == "undefined" || expectTime == "" ){
			msg = "到货时间未输入！";
			break;
		}		
		
		if (typeof(num1) == "undefined" || num1 == "")
		{
			msg = "行【" + j + 1  + "】发货单数据未维护！";
			break;
		}
		
		if (filelist.length == 0 ) {
			msg = "行【" + j + 1 + "】文件附件未上传！";
			break;
		}
		
		let obj = {
			deliveryId:rows[j]['deliveryId'],
			detailId:rows[j]['detailId'],
			expectTime:expectTime,
			matterNum:rows[j]['matterNumnew'],			
			matterUtil:rows[j]['matterUtil'],				
			shippingMethod:shippingMethod,
			isFinish:Number(rows[j]['isFinish']),
			fileList:JSON.parse(rows[j]['fileList']),						
			description:description
		}
		
		data.push(obj);
	}

    if (typeof(msg) != "undefined")
	{
		$.messager.alert("消息提示！", msg,"info");	
		return;
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
				$('#deliveryReleaseShwo_dg').datagrid('reload');    
				$('#deliveryReleaseOperation_dg').datagrid('loadData',{total:0,rows:[]});
				
				$('#shippingMethod').combobox("setValue","");
				$('#expectTime').datetimebox("setValue", "");
				$("#description").textbox("setValue"," ");
			
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

				$.messager.show({
					title:'消息提醒',
					msg:'文件上传成功！',
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
				$('#deliveryReleaseShwo_dg').datagrid('reload',{});
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
	var filename = "" ;
	for(var i = 0;i<filesVal.length;i++){
		var file ={
			orderId:orderId,
			fileCode:'deliveryOrder',
			fileType:fileType,
			fileName:filesVal[i].name,
			fileDesc:filesVal[i].name,
			fileSort:i
		}

		if (i !=0 )
		{
			filename += ",";
		}
		
		filename += file.fileName;
		
		dataArr.push(file);
	}
	
	var editor  = $('#deliveryReleaseOperation_dg' ).datagrid( 'getEditor',{index:rowIndex,field: 'fileList' });  
    var obj  = $('#deliveryReleaseOperation_dg' ).datagrid( 'getEditor',{index:rowIndex,field: 'filename' });  
 
	if (editor  != null) {
		editor.target.textbox("setValue", JSON.stringify(dataArr));
		obj.target.textbox("setValue", filename);
	}
}

// function synchCategory(rowIndex){
	
  // if (editIndex != rowIndex || editIndex == undefined ){return true}	
      // var jqData;  
      // var url = '/web/shippingMethod/findShippingCodeAndNameList';
      // var ed = $('#deliveryReleaseOperation_dg' ).datagrid( 'getEditor',{index:rowIndex,field: 'shippingMethod' });  
     // $.ajax({  
           // url:url,  
           // dataType : 'json',  
           // headers: {
	           // 'token':sessionStorage.getItem('token'),
           // },	
           // type : 'get',  
           // success: function (data){  
                // jqData = data.data;  
                // $(ed.target).combobox( 'loadData' , jqData);  
           // }  
     // });  
// } 



function loadData() {
	
      var url = '/web/shippingMethod/findShippingCodeAndNameList';	
		
	  $.ajax({  
            url:url,  
            dataType:'json',  
            headers:{
	            'token':sessionStorage.getItem('token'),
            },	
            type:'get',  
            success:function(data){ 
			
			 $('#shippingMethod').combobox({
			  data:data.data,
			  valueField:'shippingName',
			  textField:'shippingName' 
            });
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
