var editIndex = undefined;
//初始化
$(function(){
	loadCompanyOrganization();
});
function loadCompanyOrganization(){
    $("#companyOrganization_dg").datagrid({
		// url:"../json/role.json",
		// loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#companyOrganization_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
            {
				field:"companyCode",
				title:"公司代码",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"companyName",
				title:"公司名称",
				width:50,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"desc",
				title:"备注",
				width:50,
				editor:{
					type:'textbox',
					options:{
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
		onClickRow:function(index){
			onClickRow(index,'user_dg');
		}
	})
}
function endEditing(dgId){
	if (editIndex == undefined){return true}
	if ($('#'+dgId).datagrid('validateRow', editIndex)){
		$('#'+dgId).datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickRow(index,dgId){
	if (editIndex != index){
		if (endEditing(dgId)){
			$('#'+dgId).datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#'+dgId).datagrid('selectRow', editIndex);
		}
	}
}
function append(dgId){
	if (endEditing(dgId)){
		$('#'+dgId).datagrid('appendRow',{});
		editIndex = $('#'+dgId).datagrid('getRows').length-1;
		$('#'+dgId).datagrid('selectRow', editIndex)
				.datagrid('beginEdit', editIndex);
	}
}
function removeit(dgId){
	if (editIndex == undefined){return}
	$('#'+dgId).datagrid('cancelEdit', editIndex)
			.datagrid('deleteRow', editIndex);
	editIndex = undefined;
}
function accept(dgId){
	if (endEditing(dgId)){
		$('#'+dgId).datagrid('acceptChanges');
	}
}
function reject(dgId){
	$('#'+dgId).datagrid('rejectChanges');
	editIndex = undefined;
}