//初始化
$(function(){
	loadNotificationManageData();
});
function loadNotificationManageData(){
	$("#notificationManage_dg").datagrid({
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
		toolbar:"#notificationManage_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'通知单号',  
	          field:'orderCode',  
              align:'center',
              width:50,
			},
			{  
	          title:'通知时间',  
	          field:'supplier',  
              align:'center',
              width:50,
			},
			{  
	          title:'通知标题',  
	          field:'supplierCode',  
              align:'center',
              width:50,
			},
			{  
                title:'供应商数',  
                field:'placeAnOrderDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'操作',  
                field:'buyer',  
                align:'center',
                width:50,  
			},
			{  
                title:'创建人',  
                field:'orderState',  
                align:'center',
                width:50,  
            },
			{  
                title:'最后修改',  
                field:'affirmDate',  
                align:'center',
                width:50,  
			},
			{  
                title:'修改人',  
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
        }
	});
}
function append(){
    $("#notificationManage_window").window("open").window("setTitle","新增通知");
    loadSupplierData();
}

//加载供应商信息
function loadSupplierData(){
    $("#supplier_dg").datagrid({
		// url:"",
        // loadMsg:"数据加载中......",
        data:[{supplier:'供应商1',supplierCode:'供应商编号'},{supplier:'供应商2',supplierCode:'供应商编号2'}],
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#supplier_tbar",
		singleSelect:false,
		rownumbers:true,
        columns:[[
            {  
                field:'ck',  
                align:'center',
                checkbox:true
            },
			{  
	          title:'供应商编码',  
	          field:'supplierCode',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商名',  
	          field:'supplier',  
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
