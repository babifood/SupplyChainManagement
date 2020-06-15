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
	          title:'供应商编码',  
	          field:'lifnr',  
              align:'center',
              width:50,
			},
			{  
	          title:'供应商名称',  
	          field:'providerName',  
              align:'center',
              width:50,
			},
			{  
                title:'邀请码',  
                field:'invitationCode',  
                align:'center',
                width:50, 
			}
        ]],
        loader:function(param, success, error){
			var params = {}; //声明一个对象
            params.page  = param.page;
			params.limit  = param.rows;
			params.providerCode = param.providerCode;	// 	供应商名称 	否 	否 		
			params.providerName = param.providerName; 	// 	用户id 	否 	否 		
			$.ajax({
				url: '/web/provider/findProviderInfoList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token')
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
	var providerCode = $("#providerCode").textbox('getValue');
	var providerName = $("#providerName").textbox('getValue');
	$('#userStatusMonitoring_dg').datagrid({
		queryParams: {
			providerName : providerName,	// 	供应商名称 	否 	否 		
			providerCode : providerCode	// 	用户名称 	否 	否
		}
	 });
}
//重置
function reset(){
	$("#providerCode").textbox('setValue',"");
	$("#providerName").textbox('setValue',"");
}