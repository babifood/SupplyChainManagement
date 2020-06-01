var ipAndPost = 'http://10.4.1.27:8582';
$(function(){
	setDateToMonth('month');
	loadBillDownloadData();
});
function loadBillDownloadData(){
	$("#billDownload_dg").datagrid({
		// url:"",
		// loadMsg:"数据加载中......",
		// data:[{supplierCode:'00001',supplierDesc:'供应商描述',month:'04',invoice:'是',account:'是',rests:'是'}],
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#billDownload_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'供应商编码',  
	          field:'supplierCode',  
              align:'center',
              width:20,
			},
			{  
	          title:'供应商描述',  
	          field:'supplierName',  
              align:'center',
              width:20,
			},
			{  
	          title:'对账月份',  
	          field:'yearMonth',  
              align:'center',
              width:30,
			},
			{  
				title:'对账单号',  
				field:'stateOrderId',  
				align:'center',
				width:30,
			  },
			{  
                title:'账单附件',  
                field:'billFile',  
                align:'center',
				width:20,
				formatter:function(value,row,index){
					if (value){
						return '有';
					} else {
						return '无';
					}
				}    
			},
			{  
                title:'发票附件',  
                field:'invoiceFile',  
                align:'center',
				width:20, 
				formatter:function(value,row,index){
					if (value){
						return '有';
					} else {
						return '无';
					}
				}     
			},
			{  
                title:'其他附件',  
                field:'otherFile1',  
                align:'center',
				width:20, 
				formatter:function(value,row,index){
					if (row.otherFile1 || row.otherFile2 || row.otherFile3){
						return '有';
					} else {
						return '无';
					}
				}     
            }	
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.yearMonth =	param.yearMonth.replace("-",'');// 	年月 	否 	否 	202003 	
			params.supplierName = param.supplierName;	// 	供应商名称 	否 	否 		
			params.stateOrderId = param.stateOrderId;	// 	账单id 	否 	否		
			$.ajax({
				url:  '/web/stateFile/getStateFileInfoList',
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
		onClickRow:function(rowIndex, rowData){
			loadAccountData(rowData.statesId);
			loadInvoiceData(rowData.statesId);
			loadRestsData(rowData.statesId);
		}
	});
}
//查询
function searchFunction(){
	var supplier = $("#supplier").textbox('getValue');
	var month = $("#month").datebox('getValue').replace("-",'');
	var accountCode = $("#accountCode").textbox('getValue');
	$('#billDownload_dg').datagrid({
		queryParams: {
			yearMonth :	month,// 	年月 	否 	否 	202003 	
			supplierName : supplier,	// 	供应商名称 	否 	否 		
			stateOrderId :accountCode	// 	账单id 	否 	否
		}
	});
}
//重置
function reset(){
	$("#supplier").textbox('setValue','');
 	$("#month").datebox('setValue','');
	$("#accountCode").textbox('setValue','');
}
//加载账单附件
function loadAccountData(statesId){
	$("#account_dg").datagrid({
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"fileId",
				hidden:"true",
			},
			{
				field:"name",
				title:"文件名称",
				width:20,
			},
			{
				field:"createTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
			var url = '/web/file/fileDownload?fileId='+rowData.fileId;
			downLoadByUrl(url,rowData.name)
		},
		loader:function(param, success, error){
			var params = {
				orderId : statesId
			}; //声明一个	
			$.ajax({
				url: '/web/file/findFilesOfOrder',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data.stateOrder.stateBill,
					}
                    success(data);
				},
				error : function(e){
					error(e)
				}
			})
		},
	})
};
//加载发票附件
function loadInvoiceData(statesId){
	$("#invoice_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"fileId",
				hidden:"true",
			},
			{
				field:"name",
				title:"文件名称",
				width:20,
			},
			{
				field:"createTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
			var url = '/web/file/fileDownload?fileId='+rowData.fileId;
			downLoadByUrl(url,rowData.name)
		},
		loader:function(param, success, error){
			var params = {
				orderId : statesId
			}; //声明一个	
			$.ajax({
				url: '/web/file/findFilesOfOrder',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data.stateOrder.stateInvoice,
					}
                    success(data);
				},
				error : function(e){
					error(e)
				}
			})
		},
	})
};
//加载其他附件
function loadRestsData(statesId){
	$("#rests_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"fileId",
				hidden:"true",
			},
			{
				field:"name",
				title:"文件名称",
				width:20,
			},
			{
				field:"createTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
			var url = '/web/file/fileDownload?fileId='+rowData.fileId;
			downLoadByUrl(url,rowData.name)
		},
		loader:function(param, success, error){
			var params = {
				orderId : statesId
			}; //声明一个	
			$.ajax({
				url: '/web/file/findFilesOfOrder',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows: fileConvertData(obj.data.stateOrder)
					}
                    success(data);
				},
				error : function(e){
					error(e)
				}
			})
		},
	})
};
//其他附件合并展示
function fileConvertData(fileObj){
	var fileData = []
	eachFiles(fileData,fileObj.stateOther1);
	eachFiles(fileData,fileObj.stateOther2);
	eachFiles(fileData,fileObj.stateOther3);
	return fileData;
}
function eachFiles(fileData,files){
	if(files == undefined) return;
	for(var i = 0;i < files.length;i++){
		fileData.push(files[i]);
	}
}
function downLoadByUrl(url,fileName){
	var xhr = new XMLHttpRequest();
	//GET请求,请求路径url,async(是否异步)
	xhr.open('GET', url, true);
	//设置请求头参数的方式,如果没有可忽略此行代码
	xhr.setRequestHeader("token", sessionStorage.getItem('token'));
	//设置响应类型为 blob
	xhr.responseType = 'blob';
	//关键部分
	xhr.onload = function (e) {
		//如果请求执行成功
		if (this.status == 200) {
			var blob = this.response;
			var a = document.createElement('a');
			blob.type = "application/octet-stream";
			//创键临时url对象
			var url = URL.createObjectURL(blob);
			a.href = url;
			a.download= fileName;
			a.click();
			//释放之前创建的URL对象
			window.URL.revokeObjectURL(url);
		}
	};
	//发送请求
	xhr.send();
}