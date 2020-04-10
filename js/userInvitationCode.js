//初始化
$(function(){
	loadUserInvitationCodeData();
});
//加载考勤汇总数据
function loadUserInvitationCodeData(){
	$("#userInvitationCode_dg").datagrid({
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
		toolbar:"#userInvitationCode_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'编码',  
	          field:'userId',  
              align:'center',
              width:50,
			},
			{  
	          title:'名称',  
	          field:'name',  
              align:'center',
              width:50,
			},
			{  
	          title:'所属公司',  
	          field:'company',  
              align:'center',
              width:50,
			},
			{  
                title:'所属部门',  
                field:'dept',  
                align:'center',
                width:50,  
			},
			{  
                title:'电话',  
                field:'phone',  
                align:'center',
                width:50,  
			},
			{  
                title:'验证码',  
                field:'createDate',  
                align:'center',
                width:50,  
            },
			{  
                title:'状态',  
                field:'userState',  
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
	var name = $("#name").textbox('getValue');
	var supplier = $("#supplier").textbox('getValue');
	loadUserInvitationCodeData();
}
//重置
function reset(){
	$("#name").textbox('setValue',"");
	$("#supplier").textbox('setValue',"");
}