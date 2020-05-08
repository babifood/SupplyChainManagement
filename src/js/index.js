$(function(){
	$('#tabs').tabs({
		fit:true,
		border:false,
	});
	//加载导航菜单
    RightAccordion();
});
//导航菜单
function RightAccordion(){
    $("#RightAccordion").accordion({ //初始化accordion
        fillSpace:true,
        fit:true,
        border:false,
        animate:false  
    });
    $.get("json/menuTerr.json",{"menuID":"0"}, //获取第一层目录
            function (data) {
                var topMenu =  filtrationJson(data,"0")
                $.each(topMenu, function (i, e) {//循环创建手风琴的项
                    var id = e.id;
                    $('#RightAccordion').accordion('add', {
                        title: e.text,
                        content: "<ul id='tree"+id+"' ></ul>",
                        selected: true,
                        iconCls:e.iconCls//e.Icon
                    });
                    $.parser.parse();
                    var treeMenu = filtrationJson(data,id)
                    $("#tree" + id).tree({
                        data: treeMenu,  
                        onClick:function(node){
                            if(node.url){
                                 if($('#tabs').tabs('exists',node.text)){
                                     $('#tabs').tabs('select',node.text);
                                 }else{
                                     addTab(node.text,node.url,node.iconCls);
                                 }
                             }
                        }
                    });     
                  
                });
            }, "json");
}
/**
* Name 添加菜单选项 Param title 名称 Param href 链接 Param iconCls 图标样式 Param iframe
* 链接跳转方式（true为iframe，false为href）
*/
function addTab(title, pageName, iconCls) {
   var href = "../src/"+pageName;
   var tabPanel = $('#tabs');
   if (!tabPanel.tabs('exists', title)) {
       var content = '<iframe scrolling="auto" frameborder="0"  src="' + href
               + '" style="width:100%;height:100%;"></iframe>';
        tabPanel.tabs('add', {
            title : title,
            content : content,
            iconCls : iconCls,
            fit : true,
            closable : true,
            border : false
        });
   } else {
       tabPanel.tabs('select', title);
   }
}

function filtrationJson(data,parentID){
    var returnData = new Array();
    var index = 0;
    $.each(data, function (i, e) {
        if(e.parentID==parentID){
            returnData[index] = e;
            index++;
        }
    });
    return returnData;
}