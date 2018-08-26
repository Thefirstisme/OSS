Ext.define('OSS.view.SystemAbout', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'fit'
    },
    
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    id: 'frmAdd',
                    width: 400,
                    bodyPadding: 50,
                    border: false,
                    title: '',
                    fieldDefaults: 'labelWidth: 90,msgTarget: \'side\',autoFitErrors: false',
                    items: [
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '软件名称',
                            value: '上海银行上海自贸区人行信息报送系统'
                        },
                        {
                        	xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '使用单位',
                            value: '上海银行'	
                        },
                        {
                        	xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '设计单位',
                            value: '上海天正智能数据服务有限公司'
                        },
                        {
                        	xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '联系电话',
                            value: '021-61276677'
                        },
                        {
                        	xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '网　　址',
                            value: 'www.topcheer.com'
                        },
                        {
                        	xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '当前版本',
                            value: 'V5.0.5.0927'
                        },
                        {
                        	xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '发布日期',
                            value: '2013-09-13'
                        }
                        ],
                        dockedItems: [
                                      {
                                          xtype: 'toolbar',
                                          dock: 'bottom',
                                          id: 'toolsMain',
                                          items: [
                                              {
                                                  xtype: 'tbfill'
                                              },
                                              {
                                                  xtype: 'button',
                                                  id: 'btnCancel',
                                                  iconCls: 'icon-doorout',
                                                  text: '关闭',
                                                  listeners: {
                                                      click: {
                                                          fn: me.onBtnCancelClick,
                                                          scope: me
                                                      }
                                                  }
                                              }
                                          ]
                                      }
                                  ]
                }
            ]
        });

        me.callParent(arguments);
    },
    onBtnCancelClick: function(button, e, eOpts) {
    	setTimeout(function () { window.parent.changePdClose();}, 1);
    }

});
var InitSystemAbout=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.SystemAbout();
};
