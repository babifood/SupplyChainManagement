var ipAndPost = 'http://10.4.1.27:8582';
//初始化
$(function(){
	loadUserStatusMonitoringData();
});
//加载考勤汇总数据
function loadUserStatusMonitoringData(){
	$("#userStatusMonitoring_dg").datagrid({
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
	          field:'userName',  
              align:'center',
              width:50,
			},
			{  
	          title:'所属公司',  
	          field:'companyName',  
              align:'center',
              width:50,
			},
			{  
                title:'所属部门',  
                field:'department',  
                align:'center',
                width:50,  
			},
			{  
                title:'电话',  
                field:'mobile',  
                align:'center',
                width:50,  
			},
			{  
                title:'创建日期',  
                field:'createTime',  
                align:'center',
                width:50,  
            },
			{  
                title:'最晚登录',  
                field:'lastLogin',  
                align:'center',
                width:50,     
            },
			{  
                title:'用户状态',  
                field:'status',  
                align:'center',
                width:50,  
			},
			{  
                title:'最后修改日期',  
                field:'updateTime',  
                align:'center',
                width:50, 
			},
			{  
                title:'供应商名称',  
                field:'providerCompany',  
                align:'center',
                width:50, 
			}
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			supplierName = param.supplierName;	// 	供应商名称 	否 	否 		
			userId = param.userId; 	// 	用户id 	否 	否 		
			userName = param.userName; 	// 	用户名称 	否 	否
			$.ajax({
				url: ipAndPost+'/auth/user/getUserStatusList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':'1'
				},
				success: function(obj) {
                    var data = {
						rows:obj.data.list,
						total:obj.data.total
					}
                    success(data);
				},
				error : function(e){
					error(e)
				}
			})
		}
	});
}
//查询
function searchFunction(){
	var userId = $("#userId").textbox('getValue');
	var supplier = $("#supplier").textbox('getValue');
	var userName = $("#userName").textbox('getValue');
	$('#userStatusMonitoring_dg').datagrid({
		queryParams: {
			supplierName : supplier,	// 	供应商名称 	否 	否 		
			userId : userId, 	// 	用户id 	否 	否 		
			userName : userName, 	// 	用户名称 	否 	否
		}
	 });
}
//重置
function reset(){
	$("#userId").textbox('setValue',"");
	$("#supplier").textbox('setValue',"");
	$("#userName").textbox('setValue',"");
}