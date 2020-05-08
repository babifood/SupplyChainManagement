//初始化
$(function(){
	setDateToMonth('begMonth');
	setDateToMonth('endMonth');
	loadBillAffirmData();
});
//对账确认列表
function loadBillAffirmData(){
	$("#billAffirm_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#billAffirm_tbar",
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
                title:'月扣款总金额',  
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
                title:'扣款清单',  
                field:'8',  
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
//产品物料列表
function loadProductData(){
	$("#product_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		// pagination:true,
		// pageSize : 10,
		// pageList : [10, 20, 30 ],
		pageNumber:1,
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'物料号',  
	          field:'1',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料名称',  
	          field:'2',  
              align:'center',
              width:50,
			},
			{  
	          title:'月交货数',  
	          field:'3', 
              align:'center',
              width:50,
			},
			{  
                title:'单位',  
                field:'4',  
                align:'center',
                width:50,  
			},
			{  
                title:'月交货总额',  
                field:'5',  
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
//产品物料列表
function loadProductInfoData(){
	$("#productInfo_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		// fitColumns:true,
		striped:true,
		border:false,
		// pagination:true,
		// pageSize : 10,
		// pageList : [10, 20, 30 ],
		pageNumber:1,
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'日期',  
	          field:'1',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料凭证号',  
	          field:'2',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料号',  
	          field:'3', 
              align:'center',
              width:50,
			},
			{  
                title:'物料名称',  
                field:'4',  
                align:'center',
                width:50,  
			},
			{  
                title:'交货数量',  
                field:'5',  
                align:'center',
                width:50,  
            },
			{  
                title:'单位',  
                field:'5',  
                align:'center',
                width:50,  
            },
			{  
                title:'单价',  
                field:'5',  
                align:'center',
                width:50,  
            },
			{  
                title:'金额',  
                field:'5',  
                align:'center',
                width:50,  
            },
			{  
                title:'币种',  
                field:'5',  
                align:'center',
                width:50,  
            }
        ]],
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