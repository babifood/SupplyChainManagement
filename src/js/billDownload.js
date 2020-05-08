var ipAndPost = 'http://10.4.1.27:8582';
$(function(){
	setDateToMonth('month');
	loadBillDownloadData();
});
function loadBillDownloadData(){
	$("#billDownload_dg").datagrid({
		// url:"",
		// loadMsg:"数据加载中......",
		data:[{supplierCode:'00001',supplierDesc:'供应商描述',month:'04',invoice:'是',account:'是',rests:'是'}],
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
                field:'otherFile',  
                align:'center',
				width:20, 
				formatter:function(value,row,index){
					if (value){
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
			params.yearMonth =	param.yearMonth;// 	年月 	否 	否 	202003 	
			params.supplierName = param.supplierName;	// 	供应商名称 	否 	否 		
			params.stateOrderId = param.stateOrderId;	// 	账单id 	否 	否		
			$.ajax({
				url: ipAndPost+'/web/stateFile/getStateFileInfoList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':'1'
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
			loadAccountData();
			loadInvoiceData();
			loadRestsData();
		}
	});
}
//查询
function searchFunction(){
	var supplier = $("#supplier").textbox('getValue');
	var month = $("#month").datebox('getValue');
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
function loadAccountData(){
	$("#account_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"FileName",
				title:"文件名称",
				width:20,
			},
			{
				field:"FileCreateDateTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
		}
	})
};
//加载发票附件
function loadInvoiceData(){
	$("#invoice_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"FileName",
				title:"文件名称",
				width:20,
			},
			{
				field:"FileCreateDateTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
		}
	})
};
//加载其他附件
function loadRestsData(){
	$("#rests_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"FileName",
				title:"文件名称",
				width:20,
			},
			{
				field:"FileCreateDateTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
		}
	})
};