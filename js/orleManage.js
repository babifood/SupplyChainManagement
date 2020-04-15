var editIndex = undefined;
//初始化
$(function(){
	//加载Tabs
	loadTabs();
	//加载角色列表
	loadRole();
});
function loadRole(){
	//角色列表
	$("#role_dg").datagrid({
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
		toolbar:"#role_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"role_name",
				title:"角色名称",
				width:100,
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"role_desc",
				title:"角色描述",
				width:200,
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
			onClickRow(index,'role_dg');
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
//加载Tabs
function loadTabs(){
	$("#role_tabs").tabs({
        fit:true,
        border:false,
		onSelect:function(title,index){
			if(title=="后台功能菜单"){
				loadPcMenuTree();
			}else if(title=="手机功能菜单"){
				loadPhoneMenuTree();
			}else if(title=="公司组织"){
				loadCompany();
			}
		}
	})
}

//加载PC端菜单功能按钮
function loadPcMenuTree(){
	//菜单树
	$('#pcMenu_ul').tree({
		// url:"../json/pcMenu.json",
		data:[
			{ id: "1", parentID: "0", enCode: "", text: "菜单1", iconCls:"", children:[
				{ id: "2", parentID: "1", enCode: "", text: "按钮1", iconCls: ""},
				{ id: "3", parentID: "1", enCode: "", text: "按钮2", iconCls: ""}
			]},
			{ id: "4", parentID: "0", enCode: "", text: "菜单1", iconCls:"", children:[
				{ id: "5", parentID: "1", enCode: "", text: "按钮1", iconCls: ""},
				{ id: "6", parentID: "1", enCode: "", text: "按钮2", iconCls: ""}
			]}
		],
		lines:true,
		checkbox:true,
		toggle:true,
		cascadeCheck:false,
		onLoadSuccess:function(node,data){
		  if (data) {
			  $('#pcMenu_ul').tree('expandAll');
	      }
		}
	});
}
//加载PC端菜单功能按钮
function loadPhoneMenuTree(){
	//菜单树
	$('#phoneMenu_ul').tree({
		// url:"../json/pcMenu.json",
		data:[
			{ id: "1", parentID: "0", enCode: "", text: "菜单1", iconCls:"", children:[]},
			{ id: "4", parentID: "0", enCode: "", text: "菜单1", iconCls:"", children:[]}
		],
		lines:true,
		checkbox:true,
		toggle:true,
		cascadeCheck:false,
		onLoadSuccess:function(node,data){
		  if (data) {
			  $('#phoneMenu_ul').tree('expandAll');
	      }
		}
	});
}

function loadCompany(){
	//角色列表
	$("#company_dg").datagrid({
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
		singleSelect:true,
		checkOnSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"companyCode",
				title:"公司代码",
			},
			{
				field:"companyName",
				title:"公司名称",
			},
			{
				field:"ck",
				checkbox:true
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
	})	
}