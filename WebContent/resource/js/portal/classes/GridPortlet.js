
Ext.define('Ext.app.GridPortlet', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.gridportlet',
    height: 200,
    myData: [
        ['系统公告','系统已上线，请查看系统使用说明书','管理员','']
    ],

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    change: function(val) {
    	var str=encodeURI(encodeURI('downfile/sys/商业银行一站式服务平台操作手册 V2.0.doc'));
    	
    	return '<a href="javascript:void(0);" onclick="FileDown(\''+str+'\')">下载</a>';
    },

    initComponent: function(){

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'title', type: 'string'},
               {name: 'content',     type: 'string'},
               {name: 'person',     type: 'string'},
               {name: 'file',     type: 'string'}
            ],
            data: this.myData
        });

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            columns: [{
                text   : '公告标题',
                width: 100,
                sortable : true,
                dataIndex: 'title'
            },{
                text   : '公告内容',
                width    : 75,
                sortable : true,
                flex: 1,
                dataIndex: 'content'
            },{
                text   : '发布者',
                width    : 75,
                sortable : true,
                dataIndex: 'person'
            },{
                text   : '附件下载',
                width    : 75,
                sortable : true,
                dataIndex: 'file',
                renderer : this.change
            }]
        });

        this.callParent(arguments);
    }
});
function FileDown(URL) {
    //parent.location.href = URL;
	window.open('jgb/TemplateFileDown.jsp?id='+URL+'','_self');
};

