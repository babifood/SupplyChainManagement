// var ipAndPost = 'http://10.4.1.27:8582';
//初始化
$(function(){
	setDateToMonth('begMonth');
	setDateToMonth('endMonth');
	loadAccountStatusQueryData();
});
function loadAccountStatusQueryData(){
	$("#accountStatusQuery_dg").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		// fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#accountStatusQuery_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'供应商编号',  
	          field:'supplierCode',  
              align:'center',
              width:100,
			},
			{  
	          title:'供应商描述',  
	          field:'supplierName',  
              align:'center',
              width:100,
			},
			{  
	          title:'对账单号',  
	          field:'stateOrderId',  
              align:'center',
              width:100,
			},
			{  
                title:'账单总金额',  
                field:'totalAmount',  
                align:'center',
                width:100,  
			},
			{  
                title:'账单总税额',  
                field:'totalTax',  
                align:'center',
                width:100,  
			},
			{  
                title:'总扣款金额',  
                field:'meetAmount',  
                align:'center',
                width:100,  
            },
			{  
                title:'总应付金额',  
                field:'totalPayment',  
                align:'center',
                width:100,  
			},
			{  
                title:'账单状态',  
                field:'status',  
                align:'center',
                width:100,  
			},
			{  
                title:'创建时间',  
                field:'createTime',  
                align:'center',
                width:100,  
			},
			{  
                title:'确认时间',  
                field:'confirmTime',  
                align:'center',
                width:100,  
			},
			{  
                title:'确认人',  
                field:'confirmUser',  
                align:'center',
                width:100,  
			}
			
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.endDate = param.endDate;	// 	截止月份 	否 	否 	202003 	
			params.startDate = param.startDate;	// 	开始月份 	否 	否 	202003 	
			params.stateOrderId = param.stateOrderId;	// 	账单id 	否 	否 		
			params.supplierName = param.supplierName;	// 	供应商名称 	否 	否
			$.ajax({
				url: '/web/state/getStateOrderInfoList',
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
		onDblClickRow:function(rowIndex, rowData){
			onDblClickRowFunction(rowIndex,rowData)//双击事件
		}
	});
}
//行双击事件
function onDblClickRowFunction(rowIndex,rowData){
	$("#accountStatusQueryDetail_window").window("open").window("setTitle","订单明细信息");
	// $('#accountStatusQuery_dg').datagrid({
	// 	queryParams: {
	// 		stateOrderId : rowData.statesId
	// 	}
	//  });
    loadAccountStatusQueryDetail(rowData.statesId);
}
function loadAccountStatusQueryDetail(statesId){
    $("#accountStatusQueryDetail_dg").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
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
	          title:'物料描述',  
	          field:'matterDesc',  
              align:'center',
              width:50,
			},
			{  
                title:'对账数量',  
                field:'matterNum',  
                align:'center',
                width:50,  
			},
			{  
                title:'数量单位',  
                field:'matterUtil',  
                align:'center',
                width:50,  
			},
			{  
                title:'对账金额',  
                field:'amount',  
                align:'center',
                width:50,  
            },
			{  
                title:'对账税额',  
                field:'tax',  
                align:'center',
                width:50,  
			}
		]],
		loader:function(param, success, error){
			var params = {}; //声明一个
			// params.page  = param.page;
			// params.limit  = param.rows;
			params.statesId = statesId;
			$.ajax({
				url:'/web/state/getStateOrderDetailList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
				},
				success: function(obj) {
                    var data = {
						rows:obj.data
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
	var begDate = $('#begMonth').datebox('getValue').replace("-",'');
	var endDate = $('#endMonth').datebox('getValue').replace("-",'');
	var supplier = $("#supplier").textbox('getValue');
	var accountCode = $("#accountCode").textbox('getValue');
	$('#accountStatusQuery_dg').datagrid({
		queryParams: {
			endDate: endDate,
			startDate:begDate,
			stateOrderId : accountCode,	// 	账单id 	否 	否 
			supplierName : supplier	// 	供应商名称 	否 	否
		}
	});
}
//重置
function reset(){
	$("#begMonth").datebox('setValue',"");
	$("#endMonth").datebox('setValue',"");
	$("#supplier").textbox('setValue',"");
	$("#accountCode").textbox('setValue',"");
	
}
