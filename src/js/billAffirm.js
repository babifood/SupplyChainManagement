var ipAndPost = 'http://10.4.1.27:8582'
var mainYearMonth;
var loadStatus = false;
//初始化
$(function(){
	setDateToMonth('begMonth');
	setDateToMonth('endMonth');
	var data = new Date();
	var year = data.getFullYear();
	var month = data.getMonth()+1;
	$('#begMonth').datebox('setValue',year+'-'+month);
	$('#endMonth').datebox('setValue',year+'-'+month);
	$('input:radio:first').attr('checked', 'checked');
	loadBillAffirmData();
});
//对账确认列表
function loadBillAffirmData(){
	$("#billAffirm_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
		striped:true,
		border:false,
		pagination:true,
		pageSize : 10,
		pageList : [10, 20, 30 ],
		pageNumber:1,
		toolbar:"#billAffirm_tbar",
		singleSelect:true,
		rownumbers:true,
        columns:[[
            {
                field:"ck",
                align:'center',
				checkbox:true
			},
			{  
	          title:'年度',  
	          field:'year',  
              align:'center',
              width:50,
			},
			{  
	          title:'月份',  
	          field:'month',  
              align:'center',
              width:50,
			},
			{  
	          title:'对账单号',  
	          field:'stateId', 
              align:'center',
              width:50,
			},
			{  
                title:'月账单总金额',  
                field:'totalAmount',  
                align:'center',
                width:50,  
			},
			{  
                title:'月扣款总金额',  
                field:'withholdAmount',  
                align:'center',
                width:50,  
            },
            {  
                title:'实际货款总额',  
                field:'actualAmount',  
                align:'center',
                width:50,  
            },
            {  
                title:'币种',  
                field:'currency',  
                align:'center',
                width:50,  
			},
            {field:'operate',title:'查看附件清单',align:'center',width:50,
				formatter:function(value, row, index){
					var str = '<a href="#" name="opera" class="easyui-linkbutton" onclick="lock('+row.stateId+')"></a>';
					return str;
				}
			}
		]],
		onLoadSuccess:function(data){  
            $("a[name='opera']").linkbutton({text:'清单查看',plain:true,iconCls:'icon-find'});  
    	},
		queryParams: {
			begDate: $('#begMonth').datebox('getValue').replace("-",''),
			endDate: $('#endMonth').datebox('getValue').replace("-",''),
			billType:$("input[name='query_radio']:checked").val()
		},
		onClickRow:function(rowIndex, rowData){
			mainYearMonth =rowData.year+rowData.month;
			loadProductData(rowData.statesId);
			//清空产品明细详情表数据
			if(loadStatus){
				var item = $('#productInfo_dg').datagrid('getRows');
				if (item) {
					for (var i = item.length - 1; i >= 0; i--) {
						var index = $('#productInfo_dg').datagrid('getRowIndex', item[i]);
						$('#productInfo_dg').datagrid('deleteRow', index);
					}
				}
			}
		},
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.startYearmonth = param.begDate;
			params.endYearmonth = param.endDate;
			params.status = param.billType;
			$.ajax({
				url: '/web/state/getStateOrderList',
				type:"get",
				//请求的媒体类型
				contentType: "application/json;charset=UTF-8",
				data : params,
				headers: {
					'token':sessionStorage.getItem('token'),
					'supplierCode':'20239'
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
//产品物料列表
function loadProductData(statesId){
	$("#product_dg").datagrid({
		loadMsg:"数据加载中......",
		fit:true,
		fitColumns:true,
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
				field:"statesId",
				hidden:"true",
			},
			{  
	          title:'物料号',  
	          field:'matterCode',  
              align:'center',
              width:50,
			},
			{  
	          title:'物料名称',  
	          field:'matterName',  
              align:'center',
              width:50,
			},
			{  
	          title:'月交货数',  
	          field:'matterNum', 
              align:'center',
              width:50,
			},
			{  
                title:'单位',  
                field:'matterUtil',  
                align:'center',
                width:50,  
			},
			{  
                title:'月交货总额',  
                field:'amount',  
                align:'center',
                width:50,  
            }
		]],
		onClickRow:function(rowIndex, rowData){
			loadProductInfoData(rowData.statesId,rowData.matterCode);
		},
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.yearMonth = mainYearMonth;
			params.statesId = statesId;
			$.ajax({
				url: '/web/state/getStateOrderMatterList',
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
//产品物料列表
function loadProductInfoData(statesId,matterId){
	loadStatus = true;
	$("#productInfo_dg").datagrid({
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
	          title:'日期',  
	          field:'stateDate',  
              align:'center',
              width:100,
			},
			{  
	          title:'物料凭证号',  
	          field:'matterProof',  
              align:'center',
              width:100,
			},
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
                title:'交货数量',  
                field:'matterNum',  
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
                title:'金额',  
                field:'amount',  
                align:'center',
                width:100,  
            },
			{  
                title:'币种',  
                field:'currency',  
                align:'center',
                width:100,  
            }
        ]],
		loader:function(param, success, error){
			var params = {}; //声明一个
			params.page  = param.page;
			params.limit  = param.rows;
			params.statesId = statesId;	 	//对账单id 	是 	否 		
			params.matterId = matterId;	 	//物料编码 	是 	否 		
			params.yearMonth = mainYearMonth;
			$.ajax({
				url: '/web/state/getStateOrderMatterDetailList',
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
	$('#billAffirm_dg').datagrid({
		queryParams: {
			begDate: $('#begMonth').datebox('getValue').replace("-",''),
			endDate: $('#endMonth').datebox('getValue').replace("-",''),
			billType:$("input[name='query_radio']:checked").val()
		}
	});
}
//账单确认
function saveFunction(){
	var rowData =$('#billAffirm_dg').datagrid('getSelected');
	var data = {
		statesId:rowData.statesId
	}
	$.ajax({
		url:'/web/state/updateStatInfo',
		type:"post",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		data : JSON.stringify(data),
		headers: {
			'token':sessionStorage.getItem('token'),
		},
		success: function(obj) {
			if(obj.code == "200"){
				$.messager.show({
					title:'消息提醒',
					msg:'账单确认成功!',
					timeout:3000,
					showType:'slide'
				});
				$('#billAffirm_dg').datagrid('reload',{});	
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
//账单下载
function exportFunction(){
	var rowData =$('#billAffirm_dg').datagrid('getSelected');
	var token = sessionStorage.getItem('token');
	var url = "/web/file/downloadAccountBill?statesId="+rowData.statesId+"&fileType=pdf";
	var filename = '账单下载';
	downLoadByUrl(url,token,filename)
}
//根据状态过滤数据
function radioOnClick(value){
	$('#billAffirm_dg').datagrid({
		queryParams: {
			billType : value,
			begDate: $('#begMonth').datebox('getValue').replace("-",''),
			endDate: $('#endMonth').datebox('getValue').replace("-",''),
		}
	});
	if(value == 1){
		$("#billAffirm_but").linkbutton('disable');
	}else{
		$("#billAffirm_but").linkbutton('enable');
	}
}
function downLoadByUrl(url,token){
	var xhr = new XMLHttpRequest();
	//GET请求,请求路径url,async(是否异步)
	xhr.open('GET', url, true);
	//设置请求头参数的方式,如果没有可忽略此行代码
	xhr.setRequestHeader("token", token);
	xhr.setRequestHeader("operatorId", 'f84c89ad82a8413a85f436269e45fffb');
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
			a.download='账单附件下载'+formatDate(new Date().getTime());
			a.click();
			//释放之前创建的URL对象
			window.URL.revokeObjectURL(url);
		}
	};
	//发送请求
	xhr.send();
}
function formatDate(time){
	var format='YY-MM-DD hh:mm:ss';
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
//查看附件清单
function lock(stetaId){
	var simg =  "http://10.1.1.46:8081/"+stetaId+".JPG";
	$('#dlg').dialog({
		title: '清单查看',
		width: 600,
		height:500,
		resizable:true,
		closed: false,
		cache: false,
		modal: true
	});
	$("#simg").attr("src",simg);	
}
