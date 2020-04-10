$(function(){
	loadInspectionSheetDownloadData();
});
function loadInspectionSheetDownloadData(){
	$("#inspectionSheetDownload_dg").datagrid({
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
		toolbar:"#inspectionSheetDownload_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'发货单号',  
	          field:'supplierCode',  
              align:'center',
              width:20,
			},
			{  
	          title:'发货物料',  
	          field:'supplierDesc',  
              align:'center',
              width:20,
			},
			{  
	          title:'物料类别',  
	          field:'month',  
              align:'center',
              width:30,
			},
			{  
                title:'到货时间',  
                field:'invoice',  
                align:'center',
                width:20,  
			},
			{  
                title:'到货数量',  
                field:'account',  
                align:'center',
                width:20,  
			},
			{  
                title:'采购员',  
                field:'rests',  
                align:'center',
                width:20,  
            },
			{  
                title:'供应商代码',  
                field:'1',  
                align:'center',
                width:20,  
            },
			{  
                title:'供应商描述',  
                field:'2',  
                align:'center',
                width:20,  
            },
			{  
                title:'质检报告',  
                field:'3',  
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
				
			},
			{
				field:"FileCreateDateTime",
				title:"上传时间",
				
			}
		]],
		onDblClickRow:function(rowIndex,rowData){
			// onDblClickRowFileDownload(rowIndex,rowData);
		}
	})
};