$(function(){
	loadBillDownloadData();
});
function loadBillDownloadData(){
	$("#billDownload_dg").datagrid({
		// url:"",
		// loadMsg:"数据加载中......",
		data:[{supplierCode:'00001',supplierDesc:'供应商描述',month:'04',invoice:'是',account:'是',rests:'是'}],
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#billDownload_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'供应商编码',  
	          field:'supplierCode',  
              align:'center',
              width:20,
			},
			{  
	          title:'供应商描述',  
	          field:'supplierDesc',  
              align:'center',
              width:20,
			},
			{  
	          title:'对账月份',  
	          field:'month',  
              align:'center',
              width:30,
			},
			{  
                title:'账单附件',  
                field:'invoice',  
                align:'center',
                width:20,  
			},
			{  
                title:'发票附件',  
                field:'account',  
                align:'center',
                width:20,  
			},
			{  
                title:'其他附件',  
                field:'rests',  
                align:'center',
                width:20,  
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
		onClickRow:function(rowIndex, rowData){
			loadAccountData();
			loadInvoiceData();
			loadRestsData();
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
//加载账单附件
function loadAccountData(){
	$("#account_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"FileName",
				title:"文件名称",
				width:20,
			},
			{
				field:"FileCreateDateTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
		}
	})
};
//加载发票附件
function loadInvoiceData(){
	$("#invoice_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"FileName",
				title:"文件名称",
				width:20,
			},
			{
				field:"FileCreateDateTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
		}
	})
};
//加载其他附件
function loadRestsData(){
	$("#rests_dg").datagrid({
		url:"",
		fit:true,
		fitColumns:true,
		border:false,
		singleSelect:true,
		columns:[[
			{
				field:"FileName",
				title:"文件名称",
				width:20,
			},
			{
				field:"FileCreateDateTime",
				title:"上传时间",
				width:20,
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
		}
	})
};