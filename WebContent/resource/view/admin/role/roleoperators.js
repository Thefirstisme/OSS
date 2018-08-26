Ext.define('OSS.view.RoleOperatorsRel', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;
        Ext.regModel('SourceTreeGgrid', {
            fields: [
                {name: 'id',     type: 'string'},
                {name: 'text',     type: 'string'},
                {name: 'field001', type: 'string'},
                {name: 'field002', type: 'string'},
                {name: 'field003', type: 'string'}
            ]
        });
        var storeRole =GetKeyValueStore('/OSS/admin/role/role_getRoleSelect');
        var storeTree = new Ext.data.TreeStore({
        	model: 'SourceTreeGgrid',
        	autoLoad: false,
        	proxy: {
                type: 'ajax',
                url: '/OSS/admin/source/source_getPermitDataSources'
            },
            root: {
                text: '资源权限列表',
                id: '0',
                expanded: true
            }
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'center',
                    title: '',
                    id: 'treePanelMain',
                    rootVisible: false,
                    store: storeTree,
                    viewConfig: {
                        loadingText: '正在加载权限数据,请稍等...'
                    },
                    columns: [
                        {
                            xtype: 'treecolumn',
                            dataIndex: 'text',
                            text: '资源',
                            width: 260,
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'field001',
                            text: '[菜单]可见',
                            align : 'center', 
                            renderer: function(v,v2,v3){
                            	//testParam(v,v2,v3,v4);
                            	if(v=='0'){
                            		return '<input type="checkbox" id="chk_'+v3.data.id+'_8" onchange="inputCheckUp(this);">';
                            	}
                            	else if(v=='1'){
                            		return '<input type="checkbox" id="chk_'+v3.data.id+'_8" onchange="inputCheckUp(this);"  checked="true">';
                            	}
                            	else{
                            		return '';
                            	}
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'field002',
                            text: '[页面]可见', 
                            renderer: function(v,v2,v3){
                            	if(v=='0'){
                            		return '<input type="checkbox" id="chk_'+v3.data.id+'_9"  onchange="inputCheckUp(this);">';
                            	}
                            	else if(v=='1'){
                            		return '<input type="checkbox" id="chk_'+v3.data.id+'_8" onchange="inputCheckUp(this);"  checked="true">';
                            	}
                            	else{
                            		return '';
                            	}
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'field003',
                            text: '[按钮]可见', 
                            renderer: function(v,v2,v3){
                            	if(v=='0'){
                            		return '<input type="checkbox" id="chk_'+v3.data.id+'_10"  onchange="inputCheckUp(this);">';
                            	}
                            	else if(v=='1'){
                            		return '<input type="checkbox" id="chk_'+v3.data.id+'_8" onchange="inputCheckUp(this);" checked="true">';
                            	}
                            	else{
                            		return '';
                            	}
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmbRoleOpList',
                                    width: 300,
                                    fieldLabel: '角色名称',
                                    labelWidth: 60,
                                    store: storeRole,
                                    displayField: 'name',
                                    valueField: 'id',
                                    editable: false,
                                    multiSelect: true,
                                    listConfig: {
                                        maxHeight: 360
                                    }
                                },
                                {
                                    xtype: 'hiddenfield',
                                    id: 'hidBasicList',
                                    fieldLabel: 'Label'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    id: 'hidUpdateList',
                                    fieldLabel: 'Label'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    id: 'hidActionIdList',
                                    fieldLabel: 'Label'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOpOk',
                                    iconCls: 'icon-databasesave',
                                    text: '提交',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOpOkClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ButtonOpCancel',
                                    iconCls: 'icon-doorout',
                                    text: '关闭',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonOpCancelClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onTreeGridAfterRender,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmbRoleOpListSelect: function(combo, records, eOpts) {
    	setTreeGridInit();
    },

    onButtonOpOkClick: function(button, e, eOpts) {
    	//alert(Ext.getCmp('hidUpdateList').getValue());
    	dataSubmit();
    },

    onButtonOpCancelClick: function(button, e, eOpts) {
    	setTimeout(function () { this.parent.window.winLoadExec.hide();}, 1);
    },
    
    onViewportAfterRender: function(component, eOpts) {
    	setTimeout(function () { PageUIDataInit();}, 500);
    	//onTreeGridAfterRender();
    },
    onTreeGridAfterRender: function(component, eOpts) {

    }

});
var InitRoleOperatorsRel=function(){
	Ext.tip.QuickTipManager.init();
	new OSS.view.RoleOperatorsRel();
};
var PageUIDataInit=function(){
	var id = OSS.getUrlParam('id');
	if(id!=null){
		Ext.getCmp("cmbRoleOpList").setValue(id);
		setTreeGridInit();
	}
	else{
		var roleStore=Ext.getCmp("cmbRoleOpList").store;
		roleStore.load({callback:function(s,options,success){
			if(success==true){
				Ext.getCmp("cmbRoleOpList").setValue(roleStore.getAt(0));
				setTreeGridInit();
			}
		 }});
	}
};
var setTreeGridInit=function(){
	var roleId=Ext.getCmp("cmbRoleOpList").getValue();
	//var roleText=Ext.getCmp("cmbRoleOpList").getRawValue();
	var tree=Ext.getCmp("treePanelMain");
	var tStore=tree.getStore();
	var myMask = new Ext.LoadMask(tree.body, { msg: '正在加载权限树,请稍等...' });
    myMask.show();
	tStore.load({
				params:{id:roleId},
				callback: function(records, options, success){ 
					myMask.hide(); 
					} 
			});
//	Ext.Ajax.request({ 
//		url: "/OSS/admin/source/source_getPermitBaseList",
//		method : 'post', 
//		params : {id: roleId},
//		success : function(response, options){ 
//			 var data = Ext.JSON.decode(response.responseText);   
//			 if(data && data.msg!='ERROR')
//			 {
//				 Ext.getCmp('hidBasicList').setValue(data.msg);
//			 }
//		 },
//		 failure : function(response){ 
//		 }
//	});
};
var dataSubmit=function(){
	var permitId=Ext.getCmp('hidUpdateList').getValue();
	if(permitId.length>0){
		Ext.Ajax.request({ 
			url: "/OSS/admin/source/source_setRoleaPermit",
			method : 'post', 
			params : {id: permitId},
			success : function(response, options){ 
				 var data = Ext.JSON.decode(response.responseText);   
				 if(data)
				 {
					 Ext.MessageBox.show({title : '事件信息',msg :data.msg,buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
				 }
			 },
			 failure : function(response){ 
				 Ext.MessageBox.show({title : '事件信息',msg :'数据提交失败！',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING}); 
			 }
		});
	}
	else{
		Ext.MessageBox.show({title : '事件信息',msg :'没有任何角色权限更改,提交取消！',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
	}
};
var SetParentChecked=function(obj) {
    var marray = obj.id.split("_");
    var moduleId = marray[1];
    var myMask = new Ext.LoadMask(Ext.getCmp("treePanelMain").body, { msg: '正在联动数据,请稍等...' });
    myMask.show();
    Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_getSourceParentIdBySourceId",
		method : 'post', 
		params : {id: moduleId},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data && data.msg!='ERROR')
			 {
				 var pIdArray = data.msg.split(",");
		            for (var i = 0; i < pIdArray.length; i++) {
		                var chId = "chk_" + pIdArray[i] + "_8";
		                var pobj = document.getElementById(chId);
		                if (pobj) {
		                    if (!pobj.checked) {
		                        pobj.checked = true;
		                        SetSelectValue(pobj);
		                    }
		                }
		            }
			 }
			 myMask.hide();
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
			 myMask.hide();
		 }
	});
};
var SetChlidUnChecked=function(obj) {
    var marray = obj.id.split("_");
    var moduleId = marray[1];
    var myMask = new Ext.LoadMask(Ext.getCmp("treePanelMain").body, { msg: '正在联动数据,请稍等...' });
    myMask.show();
    Ext.Ajax.request({ 
		url: "/OSS/admin/source/source_getSourceChildIdBySourceId",
		method : 'post', 
		params : {id: moduleId},
		success : function(response, options){ 
			 var data = Ext.JSON.decode(response.responseText);   
			 if(data && data.msg!='ERROR')
			 {
				var cIdArray = data.msg.split(",");
	            var actionIdArr ="8,9,10".split(","); //Ext.getCmp('hidActionIdList').getValue().split(",");
	            for (var i = 0; i < cIdArray.length; i++) {
	                for (var j = 0; j < actionIdArr.length; j++) {
	                    var chId = "chk_" + cIdArray[i] + "_" + actionIdArr[j];
	                    var cobj = document.getElementById(chId);
	                    if (cobj) {
	                        if (cobj.checked) {
	                            cobj.checked = false;
	                            SetSelectValue(cobj);
	                        }
	                    }
	                }
	            }
			 }
			 myMask.hide();
		 },
		 failure : function(response){ 
			 var c1 = Ext.JSON.decode(response.responseText);  
			 Ext.Msg.alert('信息',c1.success+'-'+c1.msg);  
			 myMask.hide();
		 }
	});
};
var inputCheckUp=function(obj) {
    if (obj.checked) {
        SetParentChecked(obj);
    }
    else {
        SetChlidUnChecked(obj);
    }
    SetSelectValue(obj);
};
var SetSelectValue=function(obj) {
    var marray = obj.id.split("_");
    var updateList = Ext.getCmp('hidUpdateList').getValue();
    var basicList = Ext.getCmp('hidBasicList').getValue();
    var roleId = Ext.getCmp('cmbRoleOpList').getValue();
    var updatestr = marray[1] + "_" + marray[2] + "_" + roleId;
    var updateItem;
    if (obj.checked) {
        updateItem = "1_" + updatestr;
    }
    else {
        updateItem = "0_" + updatestr;
    }
    if (updateList.indexOf("1_" + updatestr + ";") != -1) {
        updateList = updateList.replace("1_" + updatestr + ";", "");
    }
    else if (updateList.indexOf("1_" + updatestr) != -1) {
        updateList = updateList.replace("1_" + updatestr, "");
    }
    if (updateList.indexOf("0_" + updatestr + ";") != -1) {
        updateList = updateList.replace("0_" + updatestr + ";", "");
    }
    else if (updateList.indexOf("0_" + updatestr) != -1) {
        updateList = updateList.replace("0_" + updatestr, "");
    }
    if (basicList.indexOf(updateItem) == -1) {
        if (updateList.length > 0) {
            updateList += ";";
        }
        updateList += updateItem;
    }
    Ext.getCmp('hidUpdateList').setValue(updateList);
};
var myDelegateClick = function(e, t) {
    if (this.beforeEvent(e)) {
        if (e.getTarget('input[type=checkbox]', 1)) {
            //var checked = e.getTarget('input[type=checkbox]', 1).checked,
            //node = this.getNode(e);
        } else
            if (e.getTarget('.x-tree-ec-icon', 1)) {
            this.onIconClick(e, this.getNode(e));
        } else if (this.getNodeTarget(e)) {
            this.onNodeClick(e, this.getNode(e));
        }
    } else {
        this.checkContainerEvent(e, 'click');
    }
};
