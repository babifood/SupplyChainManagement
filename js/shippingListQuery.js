$(function(){
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
	          field:'1',  
              align:'center',
              width:20,
			},
			{  
	          title:'供应商',  
	          field:'2',  
              align:'center',
              width:20,
			},
			{  
	          title:'供应商编号',  
	          field:'3',  
              align:'center',
              width:30,
			},
			{  
                title:'订单号',  
                field:'4',  
                align:'center',
                width:20,  
			},
			{  
                title:'物料编码',  
                field:'5',  
                align:'center',
                width:20,  
			},
			{  
                title:'物料描述',  
                field:'6',  
                align:'center',
                width:20,  
            },
			{  
                title:'订单数',  
                field:'7',  
                align:'center',
                width:20,  
			},
			{  
                title:'单位',  
                field:'8',  
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
                field:'10',  
                align:'center',
                width:30,  
			},
			{  
                title:'配送方式',  
                field:'11',  
                align:'center',
                width:20,  
			},
			{  
                title:'通知提交时间',  
                field:'12',  
                align:'center',
                width:30,  
            },
			{  
                title:'发货提交人',  
                field:'13',  
                align:'center',
                width:30,  
			},
			{  
                title:'发货备注说明',  
                field:'14',  
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