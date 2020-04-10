//初始化
$(function(){
	loadAccountStatusQueryData();
});
function loadAccountStatusQueryData(){
	$("#accountStatusQuery_dg").datagrid({
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
		toolbar:"#accountStatusQuery_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'供应商编号',  
	          field:'orderCode',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商描述',  
	          field:'supplierDesc',  
              align:'center',
              width:50,
			},
			{  
	          title:'对账单号',  
	          field:'accountChecking',  
              align:'center',
              width:50,
			},
			{  
                title:'账单总金额',  
                field:'accountSum',  
                align:'center',
                width:50,  
			},
			{  
                title:'账单总税额',  
                field:'taxSum',  
                align:'center',
                width:50,  
			},
			{  
                title:'总扣款金额',  
                field:'kkSum',  
                align:'center',
                width:50,  
            },
			{  
                title:'总应付金额',  
                field:'yfSum',  
                align:'center',
                width:50,  
			},
			{  
                title:'账单状态',  
                field:'accountState',  
                align:'center',
                width:50,  
			},
			{  
                title:'创建时间',  
                field:'createDate',  
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
    var row = $("#accountStatusQuery_dg").datagrid("getSelected");
    $("#accountStatusQueryDetail_window").window("open").window("setTitle","订单明细信息");
    loadAccountStatusQueryDetail();
}
function loadAccountStatusQueryDetail(){
    $("#accountStatusQueryDetail_dg").datagrid({
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
	          title:'订单号',  
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
	          title:'物料描述',  
	          field:'supplierCode',  
              align:'center',
              width:50,
			},
			{  
                title:'对账数量',  
                field:'placeAnOrderDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'数量单位',  
                field:'buyer',  
                align:'center',
                width:50,  
			},
			{  
                title:'对账金额',  
                field:'orderState',  
                align:'center',
                width:50,  
            },
			{  
                title:'对账税额',  
                field:'affirmDate',  
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
