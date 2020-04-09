var editIndex = undefined;
//初始化
$(function(){
	loadSupplierSet();
});
function loadSupplierSet(){
    $("#supplierSet_dg").datagrid({
		// url:"../json/role.json",
        // loadMsg:"数据加载中......",
        data:[{supplierCode:'1',supplierName:'aaa',supplierState:'0'}],
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#supplierSet_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
            {
				field:"supplierCode",
				title:"供应商代码",
				width:50,
				
			},
			{
				field:"supplierName",
				title:"供应商描述",
				width:50,
			},
			{
				field:"supplierState",
				title:"用户状态",
                width:40,
                formatter:function(value){
                    if(value=="0"){
                        return "启用";
                    }else if(value=="1"){
                        return "禁用";
                    }
                   
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'supplierState',
                        textField:'supplierStateName',
                        data:[
                            {supplierState:"0",supplierStateName:"启用"},
                            {supplierState:"1",supplierStateName:"禁用"}
                        ],
                    }
                }  
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
		onClickCell: onClickCell
	})
}
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#supplierSet_dg').datagrid('validateRow', editIndex)){
        $('#supplierSet_dg').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
function onClickCell(index, field){
    if (endEditing()){
        $('#supplierSet_dg').datagrid('selectRow', index)
                .datagrid('editCell', {index:index,field:field});
        editIndex = index;
    }
}
//保存
function save(){
    $('#supplierSet_dg').datagrid('acceptChanges');
    var rowData =$('#supplierSet_dg').datagrid('getSelected');
    console.log(rowData);
    
}