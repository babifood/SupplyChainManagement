var ipAndPost = 'http://10.4.1.27:8582';
$(function(){
	var date = new Date();
	thisDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	$("#begDate").datebox('setValue',thisDate);
	$("#endDate").datebox('setValue',thisDate);
	loadShippingListQueryData();
});
function loadShippingListQueryData(){
	$("#shippingListQuery_dg").datagrid({
		url:"",
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#shippingListQuery_tbar",
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
	          title:'供应商',  
	          field:'supplierName',  
              align:'center',
              width:20,
			},
			{  
	          title:'供应商编号',  
	          field:'supplierCode',  
              align:'center',
              width:30,
			},
			{  
                title:'订单号',  
                field:'orderId',  
                align:'center',
                width:20,  
			},
			{  
                title:'物料编码',  
                field:'matterCode',  
                align:'center',
                width:20,  
			},
			{  
                title:'物料描述',  
                field:'matterDesc',  
                align:'center',
                width:20,  
            },
			{  
                title:'订单数',  
                field:'matterNum',  
                align:'center',
                width:20,  
			},
			{  
                title:'单位',  
                field:'matterUtil',  
                align:'center',
                width:20,  
			},
			{  
                title:'发货数量',  
                field:'9',  
                align:'center',
                width:20,  
			},
			{  
                title:'预计到货时间',  
                field:'expectTime',  
                align:'center',
                width:30,  
			},
			{  
                title:'配送方式',  
                field:'shippingMethod',  
                align:'center',
                width:20,  
			},
			{  
                title:'通知提交时间',  
                field:'createTime',  
                align:'center',
                width:30,  
            },
			{  
                title:'发货提交人',  
                field:'deliveryName',  
                align:'center',
                width:30,  
			},
			{  
                title:'发货备注说明',  
                field:'description',  
                align:'center',
                width:50,  
			}
			
		]],
		queryParams: {
			endDate : $("#endDate").datebox('getValue'),	// 	截止日期 	否 	否 	yyyy-MM-dd 	
			startDate : $("#begDate").datebox('getValue'),	// 	开始日期 	否 	否 	yyyy-MM-dd 	
		},
		loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.endDate = param.endDate;	// 	截止日期 	否 	否 	yyyy-MM-dd 	
			params.startDate = param.startDate;	// 	开始日期 	否 	否 	yyyy-MM-dd 	
			params.matterName = param.matterName;	// 	物料名称 	否 	否 		
			params.orderId = param.orderId;	// 	订单id 	否 	否 		
			params.purchaser = param.purchaser;	// 	采购员 	否 	否 		
			params.supplierName = param.supplierName;	// 	供应商 	否 	否	
			$.ajax({
				url: ipAndPost+'/web/delivery/getDeliveryOrderInfoList',
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
		}
	});
}
//查询
function searchFunction(){
	var begDate = $("#begDate").datebox('getValue');
	var endDate = $("#endDate").datebox('getValue');
	var supplier = $("#supplier").textbox('getValue');
	var roderNub = $("#roderNub").textbox('getValue');
	var product = $("#product").textbox('getValue');
	var buyer = $("#buyer").textbox('getValue');
	$('#shippingListQuery_dg').datagrid({
		queryParams: {
			endDate : endDate,	// 	截止日期 	否 	否 	yyyy-MM-dd 	
			startDate : begDate,	// 	开始日期 	否 	否 	yyyy-MM-dd 	
			matterName : product,	// 	物料名称 	否 	否 		
			orderId : roderNub,	// 	订单id 	否 	否 		
			purchaser : buyer,	// 	采购员 	否 	否 		
			supplierName : supplier,	// 	供应商 	否 	否	
		}
	 });
	
}
//重置
function reset(){
	$("#begDate").datebox('setValue',"");
	$("#endDate").datebox('setValue',"");
	$("#supplier").textbox('setValue',"");
	$("#roderNub").textbox('setValue',"");
	$("#product").textbox('setValue',"");
	$("#buyer").textbox('setValue',"");
}