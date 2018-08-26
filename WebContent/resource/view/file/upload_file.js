Ext.onReady(function() {
			var fp = Ext.create('Ext.form.Panel', {
						fileUpload : true,
						items : [{
									xtype : 'textfield',
									name : 'caption',
									fieldLabel : '文件备注'
								}, {
									xtype : 'fileuploadfield',
									fieldLabel : '选择上传文件',
									width: '500px',
									name : 'upload',
									allowBlank : true,
									buttonText : '选择文件'

								}],
						buttons : [{
							text : '保存',
							handler : function() {
								var form = this.up('form').getForm();
								form.submit({
											//url : 'fileupload.action',
											url :'/OSS/file/rptUploadFile_toUploadFile',
											waitMsg : '正在上传...',
											// //{"resultMsg":"ok","success":true}
											success : function(fp, o) {
												Ext.Msg.alert('上传成功!',
														o.result.resultMsg);
											},
											failure : function(fp, o) {
												Ext.Msg.alert('上传失败!',
														o.result.resultMsg);
											}
										});
							}
						}]
					});
			var fw = Ext.create('Ext.Window', {
						layout : 'fit',
						title : '文件上传',
						width : 500,
						defaults : {
							scope : this
						},
						items : [fp]
					});
			fw.show();
		});
