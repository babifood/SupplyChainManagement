//初始化
$(function(){
	setDateToMonth('begMonth');
	setDateToMonth('endMonth');
	loadBillAttachmentUploadData();
});
//对账确认列表
function loadBillAttachmentUploadData(){
	$("#billAttachmentUpload_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
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
	          field:'1',  
              align:'center',
              width:50,
			},
			{  
	          title:'月份',  
	          field:'2',  
              align:'center',
              width:50,
			},
			{  
	          title:'对账单号',  
	          field:'3', 
              align:'center',
              width:50,
			},
			{  
                title:'月账单总金额',  
                field:'4',  
                align:'center',
                width:50,  
			},
			{  
                title:'月扣款总额',  
                field:'5',  
                align:'center',
                width:50,  
            },
            {  
                title:'实际货款总额',  
                field:'6',  
                align:'center',
                width:50,  
            },
            {  
                title:'币种',  
                field:'7',  
                align:'center',
                width:50,  
			},
            {  
                title:'账单上传',  
                field:'8',  
                align:'center',
                width:50,  
			},
            {  
                title:'发票上传',  
                field:'9',  
                align:'center',
                width:50,  
			},
            {  
                title:'其他文件1',  
                field:'10',  
                align:'center',
                width:50,  
			},
            {  
                title:'其他文件2',  
                field:'11',  
                align:'center',
                width:50,  
			},
            {  
                title:'其他文件3',  
                field:'12',  
                align:'center',
                width:50,  
			}						
        ]],
		onClickRow:function(rowIndex, rowData){
			
		},
		// loader:function(param, success, error){
		// 	var params = {}; //声明一个
		// 	params.page  = param.page;
		// 	params.limit  = param.rows;
			
		// 	$.ajax({
		// 		url: ipAndPost+'/web/examineFile/getExamineFileInfoList',
		// 		type:"get",
		// 		//请求的媒体类型
		// 		contentType: "application/json;charset=UTF-8",
		// 		data : params,
		// 		headers: {
		// 			'token':'1'
		// 		},
		// 		success: function(obj) {
        //             var data = {
		// 				rows:obj.data.list,
		// 				total:obj.data.total
		// 			}
        //             success(data);
		// 		},
		// 		error : function(e){
		// 			error(e)
		// 		}
		// 	})
		// }
	});
}