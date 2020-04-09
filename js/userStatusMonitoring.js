//初始化
$(function(){
	loadUserStatusMonitoringData();
});
//加载考勤汇总数据
function loadUserStatusMonitoringData(){
	$("#userStatusMonitoring_dg").datagrid({
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
		toolbar:"#userStatusMonitoring_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'用户ID',  
	          field:'userId',  
              align:'center',
              width:50,
			},
			{  
	          title:'姓名',  
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
                title:'创建日期',  
                field:'createDate',  
                align:'center',
                width:50,  
            },
			{  
                title:'最晚登录',  
                field:'atLatest',  
                align:'center',
                width:50,     
            },
			{  
                title:'用户状态',  
                field:'userState',  
                align:'center',
                width:50,  
			},
			{  
                title:'冻结日期',  
                field:'freezeDate',  
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
	var comp = $("#userId").textbox('getValue');
	var organ = $("#supplier").textbox('getValue');
	loadUserStatusMonitoringData();
}
//重置
function reset(){
	$("#userId").textbox('setValue',"");
	$("#supplier").textbox('setValue',"");
}