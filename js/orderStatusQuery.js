//初始化
$(function(){
	loadOrderStatusQueryData();
});
function loadOrderStatusQueryData(){
	$("#orderStatusQuery_dg").datagrid({
		// url:"",
        // loadMsg:"数据加载中......",
        data:[{orderCode:'0001',supplier:'供应商1',supplierCode:'供应商编号',placeAnOrderDate:'2020-04-09',
        buyer:'李四',orderState:'订单状态',affirmDate:'2020-04-09',affirmPerson:'张三',affirmDesc:'备注信息'}],
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
	          field:'orderCode',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商',  
	          field:'supplier',  
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
                field:'placeAnOrderDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'采购员',  
                field:'buyer',  
                align:'center',
                width:50,  
			},
			{  
                title:'订单状态',  
                field:'orderState',  
                align:'center',
                width:50,  
            },
			{  
                title:'确认时间',  
                field:'affirmDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'确认人',  
                field:'affirmPerson',  
                align:'center',
                width:50,  
			},
			{  
                title:'确认备注信息',  
                field:'affirmDesc',  
                align:'center',
                width:50,  
			}
			
        ]],
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
        },
        onDblClickRow:onDblClickRowFunction,//双击事件
	});
}
//行双击事件
function onDblClickRowFunction(){
    var row = $("#orderStatusQuery_dg").datagrid("getSelected");
    $("#orderStatusQueryDetail_window").window("open").window("setTitle","订单明细信息");
    loadOrderStatusQueryDetail();
}
function loadOrderStatusQueryDetail(){
    $("#orderStatusQueryDetail_dg").datagrid({
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
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'订单编号',  
	          field:'orderCode',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料编码',  
	          field:'supplier',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料名称',  
	          field:'supplierCode',  
              align:'center',
              width:50,
			},
			{  
                title:'订单数量',  
                field:'placeAnOrderDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'单位',  
                field:'buyer',  
                align:'center',
                width:50,  
			},
			{  
                title:'单价',  
                field:'orderState',  
                align:'center',
                width:50,  
            },
			{  
                title:'总金额',  
                field:'affirmDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'税率',  
                field:'affirmPerson',  
                align:'center',
                width:50,  
			},
			{  
                title:'交货日期',  
                field:'affirmDesc',  
                align:'center',
                width:50,  
			},
			{  
                title:'交货时间',  
                field:'affirmDesc',  
                align:'center',
                width:50,  
			}
			
        ]],
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
function search(){
	var begDate = $("#begDate").datebox('getValue');
	var endDate = $("#endDate").datebox('getValue');
	
}
//重置
function reset(){
	$("#begDate").datebox('setValue',"");
	$("#endDate").datebox('setValue',"");
}
