var ipAndPost = 'http://10.4.1.27:8582';
//初始化
$(function(){
	loadOrderStatusQueryData();
});
function loadOrderStatusQueryData(){
	$("#orderStatusQuery_dg").datagrid({
        loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#orderStatusQuery_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'订单编号',  
	          field:'orderId',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商',  
	          field:'supplierName',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商编号',  
	          field:'supplierCode',  
              align:'center',
              width:50,
			},
			{  
                title:'下单日期',  
                field:'orderDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'采购员',  
                field:'purchaser',  
                align:'center',
                width:50,  
			},
			{  
                title:'订单状态',  
                field:'status',  
                align:'center',
				width:50, 
				formatter:function(value,row,index){
					if (value === 0){
						return '待确认';
					} else if(value === 1){
						return '已确认';
					}
				}  
            },
			{  
                title:'确认时间',  
                field:'confirmTime',  
                align:'center',
                width:50,  
			},
			{  
                title:'确认人',  
                field:'confirmUser',  
                align:'center',
                width:50,  
			},
			{  
                title:'确认备注信息',  
                field:'confirmDesc',  
                align:'center',
                width:50,  
			}
			
        ]],
		onDblClickRow:function(rowIndex, rowData){
			onDblClickRowFunction(rowIndex,rowData)//双击事件
		},
		loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.endDate = param.endDate==null||param.endDate==''||param.endDate==undefined?'':param.endDate;	// 	截止日期 	否 	否 		
			params.startDate = param.startDate==null||param.startDate==''||param.startDate==undefined?'':param.startDate;	// 	开始日期 	否 	否 		
			params.matterName = '';	// 	物料名称 	否 	否 		
			params.orderId = '';	// 	订单id 	否 	否 		
			params.purchaser = '';	// 	采购员 	否 	否 		
			params.supplierName = '';	// 	供应商名称 	否 	否 		
			$.ajax({
				url: ipAndPost+'/web/purchase/getPurchaseOrderInfoList',
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
//行双击事件
function onDblClickRowFunction(rowIndex,rowData){
	$("#orderStatusQueryDetail_window").window("open").window("setTitle","订单明细信息");
	$('#orderStatusQueryDetail_dg').datagrid({
		queryParams: {
			orderId: rowData.orderId
		}
	 });
    loadOrderStatusQueryDetail();
}
function loadOrderStatusQueryDetail(){
    $("#orderStatusQueryDetail_dg").datagrid({
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
	          title:'订单编号',  
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
	          title:'物料名称',  
	          field:'matterName',  
              align:'center',
              width:50,
			},
			{  
                title:'订单数量',  
                field:'matterNum',  
                align:'center',
                width:50,  
			},
			{  
                title:'单位',  
                field:'matterUtil',  
                align:'center',
                width:50,  
			},
			{  
                title:'单价',  
                field:'matterPrice',  
                align:'center',
                width:50,  
            },
			{  
                title:'总金额',  
                field:'totalAmount',  
                align:'center',
                width:50,  
			},
			{  
                title:'税率',  
                field:'taxRate',  
                align:'center',
                width:50,  
			},
			{  
                title:'交货日期',  
                field:'expectDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'交货时间',  
                field:'expectTime',  
                align:'center',
                width:50,  
			}
			
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个对象
			params.orderId = param.orderId;
			$.ajax({
				url: ipAndPost+'/web/purchase/getPurchaseOrderDetail',
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
		loadFilter:function(data){
			if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
	            data = {
	                total: data.length,
	                rows: data
	            }
	        }
	        var dg = $(this);
	        var opts = dg.datagrid('options');
	        var pager = dg.datagrid('getPager');
	        pager.pagination({
	            onSelectPage:function(pageNum, pageSize){
	                opts.pageNumber = pageNum;
	                opts.pageSize = pageSize;
	                pager.pagination('refresh',{
	                    pageNumber:pageNum,
	                    pageSize:pageSize
	                });
	                dg.datagrid('loadData',data);
	            },
	        	onRefresh:function(){
	        		dg.datagrid('reload');
	        	}
	        });
	        if (!data.originalRows){
	            data.originalRows = (data.rows);
	        }
	        var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	        var end = start + parseInt(opts.pageSize);
	        data.rows = (data.originalRows.slice(start, end));
	        return data;
		}
	});
}
//查询
function searchFunction(){
	var begDate = $("#begDate").datebox('getValue');
	var endDate = $("#endDate").datebox('getValue');
	$('#orderStatusQuery_dg').datagrid({
		queryParams: {
			endDate: endDate,
			startDate:begDate
		}
	 });
	
}
//重置
function reset(){
	$("#begDate").datebox('setValue',"");
	$("#endDate").datebox('setValue',"");
}
