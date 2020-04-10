var editIndex = undefined;
//初始化
$(function(){
	//加载角色列表
    loadRole();
    //加载用户列表
    loadUser();
});
//加载角色列表
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
        singleSelect:true,
        checkOnSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"role_name",
                title:"角色名称",
                width:100,
			},
			{
				field:"role_desc",
				title:"角色描述",
                align:'center',
                width:100,
			},
			{
                field:"ck",
                align:'center',
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
//加载用户列表
function loadUser(){
    $("#user_dg").datagrid({
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
		toolbar:"#user_tbar",
		singleSelect:true,
		rownumbers:true,
		columns:[[
			{
				field:"userId",
				title:"用户ID",
				
				editor:{
					type:'validatebox',
					options:{
						required:true
					}
				}
			},
			{
				field:"userName",
				title:"姓名",
				
				editor:{
					type:'validatebox',
					options:{
                        required:true
					}
				}
			},
			{
				field:"company",
				title:"所属公司",
				
				editor:{
					type:'combogrid',
					options:{
                        panelWidth: 200,
                        idField: 'companyCode',
                        textField: 'companyName',
                        // url: 'datagrid_data1.json',
                        // method: 'get',
                        columns: [[
                            {field:'companyCode',title:'公司代码',width:100},
                            {field:'companyName',title:'公司名称',width:100},
                        ]],
                        fitColumns: true,
                        data:[
                            {companyCode:"1000",companyName:"中饮股份"},
                            {companyCode:"1200",companyName:"中饮管理"}
                        ]
					}
				}
			},
			{
				field:"dept",
				title:"所属部门",
				
				editor:{
					type:'textbox',
					options:{}
				}
            },
            {
				field:"phone",
				title:"电话",
				
				editor:{
					type:'textbox',
					options:{
                    }
				}
			},
            {
				field:"password",
				title:"用户密码",
				
				editor:{
					type:'passwordbox',
					options:{
                        required:true
                    }
				}
			},
            {
				field:"userState",
				title:"用户状态",
				
				formatter:function(value,row){
                    return row.userStateName;
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField:'userState',
                        textField:'userStateName',
                        data:[
                            {userState:"0",userStateName:"启用"},
                            {userState:"1",userStateName:"禁用"}
                        ],
                    }
				}				
                
			},
			{
				field:"1",
				title:"账户类别",
				
				
            },
			{
				field:"2",
				title:"供应商名称",
				
				
            },
			{
				field:"3",
				title:"验证码",
				
				
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
		onDblClickRow:function(index){
			onDblClickRow(index,'user_dg');
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
function onDblClickRow(index,dgId){
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