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
				field:"supplierId",
				hidden:"true",
			},
            {  
                field:'ck',  
                align:'center',
                checkbox:true
            },
			{  
	          title:'订单号',  
	          field:'lifnr',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料编码',  
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
	          title:'要求交期',  
	          field:'3',  
              align:'center',
              width:50,
			},
			{  
	          title:'订单数',  
	          field:'4',  
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
	          title:'已发数量',  
	          field:'6',  
              align:'center',
              width:50,
			},
			{  
	          title:'待发数量',  
	          field:'7',  
              align:'center',
              width:50,
			},
			{  
	          title:'交货地址',  
	          field:'8',  
              align:'center',
              width:50,
			}
        ]],
        // loader:function(param, success, error){
		// 	var params = {}; //声明一个对象
        //     params.page  = param.page;
		// 	params.limit  = param.rows; 	 	 		
		// 	$.ajax({
		// 		url: ipAndPost+'',
		// 		type:"get",
		// 		//请求的媒体类型
		// 		contentType: "application/json;charset=UTF-8",
		// 		data : params,
		// 		headers: {
		// 			'token':'1'
		// 		},
		// 		success: function(obj) {
		// 			var data = {
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
	          title:'订单号',  
	          field:'lifnr',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料编码',  
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
	          title:'订单数',  
	          field:'4',  
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
	          title:'已发数量',  
	          field:'6',  
              align:'center',
              width:50,
			},
			{  
	          title:'本次发货',  
	          field:'7',  
              align:'center',
              width:50,
			},
			{  
	          title:'配送方式',  
	          field:'8',  
              align:'center',
              width:50,
			},
			{  
	          title:'发货状态',  
	          field:'9',  
              align:'center',
              width:50,
			},
			{  
	          title:'单据上传',  
	          field:'10',  
              align:'center',
              width:50,
			},
			{  
	          title:'备注说明',  
	          field:'11',  
              align:'center',
              width:50,
			}
        ]]
	});
}