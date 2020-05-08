//初始化
$(function(){
	loadOrderAffirmData();
});
function loadOrderAffirmData(){
	$("#order_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#order_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
            {
                field:"ck",
                align:'center',
				checkbox:true
			},
			{  
	          title:'订单号',  
	          field:'deliveryId',  
              align:'center',
              width:50,
			},
			{  
	          title:'订单日期',  
	          field:'matterName',  
              align:'center',
              width:50,
			},
			{  
	          title:'订单金额',  
	          field:'matterCode',  //临时用物料编码代替
              align:'center',
              width:50,
			},
			{  
                title:'采购员',  
                field:'expectDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'订单合同',  
                field:'matterNum',  
                align:'center',
                width:50,  
			},	
        ]],
		onClickRow:function(rowIndex, rowData){
			loadProductData();
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
function loadProductData(){
	$("#product_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		// fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'物料号',  
	          field:'deliveryId',  
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
	          title:'订单数量',  
	          field:'matterCode',  //临时用物料编码代替
              align:'center',
              width:50,
			},
			{  
                title:'单位',  
                field:'expectDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'单价',  
                field:'matterNum',  
                align:'center',
                width:50,  
            },
            {  
                title:'币种',  
                field:'matterNum',  
                align:'center',
                width:50,  
            },
            {  
                title:'税率',  
                field:'matterNum',  
                align:'center',
                width:50,  
            },
            {  
                title:'金额',  
                field:'matterNum',  
                align:'center',
                width:50,  
            },
            {  
                title:'交货时间',  
                field:'matterNum',  
                align:'center',
                width:50,  
            },
            {  
                title:'交货地址',  
                field:'matterNum',  
                align:'center',
                width:100,  
            },
            {  
                title:'订单备注说明',  
                field:'matterNum',  
                align:'center',
                width:100,  
			},	
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
//删除
function removeFunction(){

}
//导出
function exportFunction(){

}
//确认
function saveFunction(){
    
}