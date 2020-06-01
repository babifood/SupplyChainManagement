var ipAndPost = 'http://10.4.1.27:8582';
var fileId;
$(function(){

	$("#begDate").datebox('setValue',getNowFormatDate());
	$("#endDate").datebox('setValue',getNowFormatDate());
	loadInspectionSheetDownloadData();
});
function loadInspectionSheetDownloadData(){
	$("#inspectionSheetDownload_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#inspectionSheetDownload_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'发货单号',  
	          field:'deliveryId',  
              align:'center',
              width:20,
			},
			{  
				title:'订单号',  
				field:'orderNo',  
				align:'center',
				width:20,
			  },
			{  
	          title:'发货物料',  
	          field:'matterName',  
              align:'center',
              width:20,
			},
			{  
	          title:'物料类别',  
	          field:'matterCode',  //临时用物料编码代替
              align:'center',
              width:30,
			},
			{  
                title:'到货时间',  
                field:'expectDate',  
                align:'center',
                width:20,  
			},
			{  
                title:'到货数量',  
                field:'matterNum',  
                align:'center',
                width:20,  
			},
			{  
                title:'采购员',  
                field:'purchaser',  
                align:'center',
                width:20,  
            },
			{  
                title:'供应商代码',  
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
                title:'质检报告',  
                field:'fileStatus',  
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
		onClickRow:function(rowIndex, rowData){
			if(rowData.fileStatus){
				loadAccountData(rowData.deliveryId);
				fileId = rowData.deliveryId;
			}
		},
		queryParams: {
			endDate: $("#endDate").datebox('getValue'),
			startDate:$("#begDate").datebox('getValue'),
		},
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.endDate = param.endDate;	// 	截止日期 	否 	否 	yyyy-MM-dd 	
			params.startDate = param.startDate;	// 	开始日期 	否 	否 	yyyy-MM-dd 	
			params.matterName =	param.matterName;// 	物料名称 	否 	否 		
			params.orderId = param.orderId;	// 	订单id 	否 	否 		
			params.supplierName = param.supplierName;	// 	供应商名称
			$.ajax({
				url: '/web/examineFile/getExamineFileInfoList',
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
//查询
function searchFunction(){
	var supplierName = $("#supplierName").textbox('getValue');
	var orderId = $("#orderId").textbox('getValue');
	var matterName = $("#matterName").textbox('getValue');
	var begDate = $("#begDate").datebox('getValue');
	var endDate = $("#endDate").datebox('getValue');
	$('#inspectionSheetDownload_dg').datagrid({
		queryParams: {
			endDate: endDate,
			startDate:begDate,
			orderId : orderId,	// 	账单id 	否 	否 
			supplierName : supplierName,	// 	供应商名称 	否 	否
			matterName : matterName //物料
		}
	});
}
//重置
function reset(){
	$("#supplierName").textbox('setValue','');
	$("#orderId").textbox('setValue','');
	$("#matterName").textbox('setValue','');
	$("#begDate").datebox('setValue',getNowFormatDate());
	$("#endDate").datebox('setValue',getNowFormatDate());
}
//加载账单附件
function loadAccountData(deliveryId){
	$("#account_dg").datagrid({
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
				orderId : deliveryId
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
						rows:obj.data.deliveryOrder.deliveryFile
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
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
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