//当前时间戳
var timestamp;
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
	timestamp = Date.parse(new Date())
	$('#ff').form('clear');
	$("#notificationManage_window").window("open").window("setTitle","新增通知");
    loadSupplierData();
}
//通知类型下来选择生成编号
function notificationTypeOnSelect(rec){
	timestamp==undefined?timestamp = Date.parse(new Date()):timestamp;
	$('#notificationCode').textbox('setValue',rec.value+'-'+timestamp);
}
//发给所有供应商勾选事件
function checkboxOnChange(checked){
	if(checked){
		$('#showSupplier_dialog_btn').linkbutton('disable');
	}else{
		$('#showSupplier_dialog_btn').linkbutton('enable');
	}
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
//清空已选供应商列表信息
function emptySupplier_dg(){  
    var item = $('#supplier_dg').datagrid('getSelections');
        if (item) {
            for (var i = item.length - 1; i >= 0; i--) {
                var index = $('#supplier_dg').datagrid('getRowIndex', item[i]);
                $('#supplier_dg').datagrid('deleteRow', index);
			}   
        }
}
/**------------------------------------------dialog-------------------------------------------------- */
//打开供应商选择窗体
function showSupplier_dialog(){
	$("#supplier_dialog").dialog("open").dialog("center").dialog("setTitle","供应商信息列表");
	loadSupplierDialogGridData()
}
//加载供应商列表信息
function loadSupplierDialogGridData(){
	$("#supplier_dialog_grid").datagrid({
		// url:"",
        // loadMsg:"数据加载中......",
        data:[{supplier:'供应商3',supplierCode:'供应商编号3'},{supplier:'供应商4',supplierCode:'供应商编号4'}],
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#supplier_dialog_tbar",
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
//供应商名称查询
function supplier_dialog_search(){
	var supplierName = $("#supplier_dialog_supplierName").datebox('getValue');
}
//确定选中供应商
function supplier_dialog_confirm(){
	var rows = $('#supplier_dialog_grid').datagrid('getSelections');
	var targetRows = $('#supplier_dg').datagrid('getRows');
	if (targetRows.length == 0) {
		for(var i=0; i<rows.length; i++){
			$("#supplier_dg").datagrid('appendRow',
				{
					supplierCode:rows[i].supplierCode,
					supplier:rows[i].supplier,
				});
		}
	}
	else {
		var flag = true;//不相等
		for (var i = 0; i <= rows.length - 1; i++){
			for (var j = 0; j <= targetRows.length - 1; j++){
				if (rows[i].supplierCode == targetRows[j].supplierCode) {
					flag = false;//相等
					break;
				}
				else {
					flag = true;
				}
			}
			if (flag == true) {
				$("#supplier_dg").datagrid('appendRow',
				{
					supplierCode:rows[i].supplierCode,
					supplier:rows[i].supplier,
				});
			}
		}
	}
	$("#supplier_dialog").dialog("close");
}
