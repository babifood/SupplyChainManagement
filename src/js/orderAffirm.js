var ipAndPost = 'http://10.4.1.27:8582'
//初始化
$(function(){
	loadOrderAffirmData();
});
function loadOrderAffirmData(){
	$("#order_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#order_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
            {
                field:"ck",
                align:'center',
				checkbox:true
			},
			{  
	          title:'订单号',  
	          field:'orderId',  
              align:'center',
              width:50,
			},
			{  
	          title:'订单日期',  
	          field:'orderDate',  
              align:'center',
              width:50,
			},
			{  
	          title:'订单金额',  
	          field:'amount',  //临时用物料编码代替
              align:'center',
              width:50,
			},
			{  
                title:'采购员',  
                field:'purchaser',  
                align:'center',
                width:50,  
			},
			{  
                title:'订单合同',  
                field:'contract',  
                align:'center',
                width:50,  
			},
        ]],
		onClickRow:function(rowIndex, rowData){
			 loadProductData(rowData.ordersId);
		},
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			$.ajax({
				url:'/web/confirm/getConfirmOrderList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token'),
					'supplierCode':'20239',
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
function loadProductData(ordersId){
	$("#product_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		// fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		singleSelect:true,
		rownumbers:true,
        columns:[[
			{  
	          title:'物料号',  
	          field:'matterCode',  
              align:'center',
              width:100,
			},
			{  
	          title:'物料名称',  
	          field:'matterName',  
              align:'center',
              width:100,
			},
			{  
	          title:'订单数量',  
	          field:'matterNum',  //临时用物料编码代替
              align:'center',
              width:100,
			},
			{  
                title:'单位',  
                field:'matterUtil',  
                align:'center',
                width:100,  
			},
			{  
                title:'单价',  
                field:'matterPrice',  
                align:'center',
                width:100,  
            },
            {  
                title:'币种',  
                field:'currency',  
                align:'center',
                width:100,  
            },
            {  
                title:'税率',  
                field:'taxRate',  
                align:'center',
                width:100,  
            },
            {  
                title:'金额',  
                field:'amount',  
                align:'center',
                width:100,  
            },
            {  
                title:'交货时间',  
                field:'expectTime',  
                align:'center',
                width:100,  
            },
            {  
                title:'交货地址',  
                field:'address',  
                align:'center',
                width:150,  
            },
            {  
                title:'订单备注说明',  
                field:'description',  
                align:'center',
                width:150,  
			},
        ]],
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.ordersId = ordersId;
			$.ajax({
				url: '/web/confirm/getConfirmOrderDetailList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token'),
					'supplierCode':'20239',
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
//删除
function removeFunction(){
	var rowData =$('#order_dg').datagrid('getSelected');
	var index = $("#order_dg").datagrid("getRowIndex",rowData);
	var ordersId = rowData.ordersId;
	if(index>=0){
		$.messager.confirm("提示","确定要删除此数据？",function(r){
			if(r){
				$.ajax({
					url:'/web/confirm/removeConfirmOrder',
					type:'post',
					data:ordersId,
					contentType: "application/json;charset=UTF-8",
					headers: {
						'token':sessionStorage.getItem('token'),
						'userName' :'1',
					},
					beforeSend:function(){
						$.messager.progress({
							text:'删除中......',
						});
					},
					success: function(obj) {
						$.messager.progress('close');
						if(obj.code == "200"){
							$.messager.show({
								title:'消息提醒',
								msg:'删除成功!',
								timeout:3000,
								showType:'slide'
							});
							$('#order_dg').datagrid('reload',{});	
						}else{
							$.messager.show({
								title:'消息提醒',
								msg:obj.message,
								timeout:3000,
								showType:'slide'
							});
						}
					},
					error : function(e){
						console.log(e);
					}
				});
			}
		});
	}else{
		$.messager.alert("消息提示！","请选择一条数据！","info");
	}
}
//导出
function exportFunction(){
	//导出确认订单详情
	var rowData =$('#order_dg').datagrid('getSelected');
	var url ='/web/file/downloadOrderDetail?ordersId='+rowData.ordersId;
	var token = sessionStorage.getItem('token');
	downLoadByUrl(url,token)
}
//确认
function saveFunction(){
	var rowData =$('#order_dg').datagrid('getSelected');
	var data ={
		ordersId:rowData.ordersId,
		confirmDesc:'订单确认备注信息'
	}
    $.ajax({
		url:'/web/confirm/submitOrderInfo',
		type:"post",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		data : JSON.stringify(data),
		headers: {
			'token':sessionStorage.getItem('token'),
			'userName' :'1',
			'supplierCode':'20239',
			'supplierName' : '1',
		},
		beforeSend:function(){
			$.messager.progress({
				text:'保存中......',
			});
		},
		success: function(obj) {
			$.messager.progress('close');
			if(obj.code == "200"){
				$.messager.show({
					title:'消息提醒',
					msg:'订单确认成功!',
					timeout:3000,
					showType:'slide'
				});
				$('#order_dg').datagrid('reload',{});	
			}else{
				$.messager.show({
					title:'消息提醒',
					msg:obj.message,
					timeout:3000,
					showType:'slide'
				});
			}
		},
		error : function(e){
			console.log(e);
		}
	})		
}
function downLoadByUrl(url,token){
	var xhr = new XMLHttpRequest();
	//GET请求,请求路径url,async(是否异步)
	xhr.open('GET', url, true);
	//设置请求头参数的方式,如果没有可忽略此行代码
	xhr.setRequestHeader("token", token);
	xhr.setRequestHeader("supplierCode", '20239');
	//设置响应类型为 blob
	xhr.responseType = 'blob';
	//关键部分
	xhr.onload = function (e) {
		//如果请求执行成功
		if (this.status == 200) {
			var blob = this.response;
			var a = document.createElement('a');
			blob.type = "application/octet-stream";
			//创键临时url对象
			var url = URL.createObjectURL(blob);
			a.href = url;
			a.download='订单导出'+formatDate(new Date().getTime());
			a.click();
			//释放之前创建的URL对象
			window.URL.revokeObjectURL(url);
		}
	};
	//发送请求
	xhr.send();
}
function formatDate(time,format='YY-MM-DD hh:mm:ss'){
	var date = new Date(time);

	var year = date.getFullYear(),
		month = date.getMonth()+1,//月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
		return '0'+index;
	});////开个长度为10的数组 格式为 00 01 02 03

	var newTime = format.replace(/YY/g,year)
						.replace(/MM/g,preArr[month]||month)
						.replace(/DD/g,preArr[day]||day)
						.replace(/hh/g,preArr[hour]||hour)
						.replace(/mm/g,preArr[min]||min)
						.replace(/ss/g,preArr[sec]||sec);

	return newTime;			
}
