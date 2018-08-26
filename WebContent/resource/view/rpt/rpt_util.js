Ext.apply(Ext.form.VTypes, {
	// 当出入账标志为3或4时，原始交易日期为强制项，且栏位值小于等于记账日期
//	custOutInAcctIndRegex : function(val, field) {
//		var isRegex = true;
//		var dicId = val.substring(0,1);
//		if (field.confirmTo) {
//			//var obj = Ext.getCmp(field.confirmTo);
//			//var cType = obj.getValue();
//			if (dicId == '3' || dicId == '4') {
//				// 
//				Ext.getCmp('origTxnDt').allowBlank=false;
//				// 原始交易日期
//				var origTxnDt = new Date(Ext.getCmp("origTxnDt").getValue());
//				if ('Thu Jan 01 1970 08:00:00 GMT+0800' == origTxnDt) {
//					isRegex = false;
//				} else {
//					var acctingDt;
//					// 记帐日期
//					var acctDt = Ext.getCmp("acctDt");
//					if(acctDt){
//						acctingDt = new Date(Ext.getCmp("acctDt").getValue());
//					}else{
//						acctingDt = new Date(Ext.getCmp("acctingDt").getValue());
//					}
//
//					isRegex = (origTxnDt <= acctingDt ? true : false);
//				}
//			}else if (dicId == '1' || dicId == '2') {
//				Ext.getCmp('origTxnDt').allowBlank=true;
//				isRegex = true;
//			}
//		}
//		return isRegex;
//	},
	//原始交易日期,默认为空；若该字段有值，则出入账标志必须为3或4,且栏位值小于等于记账日期
	custOutInAcctIndRegex : function(val, field) {
		var isRegex = true;
		var dicId = val.substring(0,1);
		
		if (field.confirmTo) { 
			// 原始交易日期
			var origTxnDt = new Date(Ext.getCmp("origTxnDt").getValue());

			if (dicId == '3' || dicId == '4') {
				Ext.getCmp('origTxnDt').allowBlank = false;
				var acctingDt;
				// 记帐日期
				var acctDt = Ext.getCmp("acctDt");
				if(acctDt){
					acctingDt = new Date(Ext.getCmp("acctDt").getValue());
				}else{
					acctingDt = new Date(Ext.getCmp("acctingDt").getValue());
				}
				isRegex = (origTxnDt <= acctingDt ? true : false);
			} else {
				//isRegex = false;
			} 
			
		} 
		return isRegex;
	},
	 
	
	origTxnDtRegex : function(val,field){
		var isRegex = true;
		if(field.confirmTo){
			if(Ext.getCmp('outInAcctInd').getRawValue()=='3--出账业务冲正' || 
					Ext.getCmp('outInAcctInd').getRawValue()=='4--入账业务冲正'){
				Ext.getCmp('origTxnDt').allowBlank = false;
				//isRegex=false;
			}else{
				Ext.getCmp('origTxnDt').allowBlank = true;
				//isRegex=true;
			}
		}
		return isRegex;
	},
	
	// “证件类型”栏位值为11或12，“客户类型”必须为1；
	// “证件类型”栏位值为21或22，“客户类型”必须为2。
	custIdenType : function(val, field) {
		var isRegex = false;
		var custType = Ext.getCmp("custType").getValue();
		if (field.confirmTo) {
			if ((val.indexOf("11")==0 || val.indexOf("12")==0)) {
				if((custType.indexOf("1")==0)){
					Ext.getCmp('idenNo').vtype = '';
					isRegex = true;
				}
			}else if(val.indexOf("21")==0 ) {
				if(custType.indexOf("2")==0){
					//Ext.getCmp('idenNo').regex = /^(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}))$/;
					//Ext.getCmp('idenNo').regexText = '请正确输入身份证号';
					Ext.getCmp('idenNo').vtype = 'IDCard';
					Ext.getCmp('idenNo').vtypeText = '该输入项目必须是身份证号码格式，例如：32082919860817201x';
					isRegex = true;
				}
			}else if( val.indexOf("22")==0) {
				if(custType.indexOf("2")==0){
					Ext.getCmp('idenNo').vtype = '';
					isRegex = true;
				}
			}else if(val.indexOf("31")==0) {
				Ext.getCmp('idenNo').vtype = '';
				isRegex = true;
			}
		}
		return isRegex;
	},
	
	//验证身份证号码
	"IDCard" : function(_v) {
		   var area = {
		    11 : "北京",
		    12 : "天津",
		    13 : "河北",
		    14 : "山西",
		    15 : "内蒙古",
		    21 : "辽宁",
		    22 : "吉林",
		    23 : "黑龙江",
		    31 : "上海",
		    32 : "江苏",
		    33 : "浙江",
		    34 : "安徽",
		    35 : "福建",
		    36 : "江西",
		    37 : "山东",
		    41 : "河南",
		    42 : "湖北",
		    43 : "湖南",
		    44 : "广东",
		    45 : "广西",
		    46 : "海南",
		    50 : "重庆",
		    51 : "四川",
		    52 : "贵州",
		    53 : "云南",
		    54 : "西藏",
		    61 : "陕西",
		    62 : "甘肃",
		    63 : "青海",
		    64 : "宁夏",
		    65 : "新疆",
		    71 : "台湾",
		    81 : "香港",
		    82 : "澳门",
		    91 : "国外"
		   };
		   var Y, JYM;
		   var S, M;
		   var idcard_array = new Array();
		   idcard_array = _v.split("");
		   // 地区检验
		   if (area[parseInt(_v.substr(0, 2))] == null) {
		    //this.IDCardText = "身份证号码地区非法!!,格式例如:32";
		    return false;
		   }
		   // 身份号码位数及格式检验
		   switch (_v.length) {
		    case 15 :
		     if ((parseInt(_v.substr(6, 2)) + 1900) % 4 == 0
		       || ((parseInt(_v.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(_v
		         .substr(6, 2)) + 1900)
		         % 4 == 0)) {
		      ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
		     } else {
		      ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
		     }
		     if (ereg.test(_v))
		      return true;
		     else {
		      //this.IDCardText = "身份证号码出生日期超出范围,格式例如:19860817";
		      return false;
		     }
		     break;
		    case 18 :
		     // 18位身份号码检测
		     // 出生日期的合法性检查
		     // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		     // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
		     if (parseInt(_v.substr(6, 4)) % 4 == 0
		       || (parseInt(_v.substr(6, 4)) % 100 == 0 && parseInt(_v
		         .substr(6, 4))
		         % 4 == 0)) {
		      ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
		     } else {
		      ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
		     }
		     if (ereg.test(_v)) {// 测试出生日期的合法性
		      // 计算校验位
		      S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
		        * 7
		        + (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
		        * 9
		        + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
		        * 10
		        + (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
		        * 5
		        + (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
		        * 8
		        + (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
		        * 4
		        + (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
		        * 2
		        + parseInt(idcard_array[7])
		        * 1
		        + parseInt(idcard_array[8])
		        * 6
		        + parseInt(idcard_array[9]) * 3;
		      Y = S % 11;
		      M = "F";
		      JYM = "10X98765432";
		      M = JYM.substr(Y, 1);// 判断校验位
		      // alert(idcard_array[17]);
		      if (M == idcard_array[17]) {
		       return true; // 检测ID的校验位
		      } else {
		       //this.IDCardText = "身份证号码末位校验位校验出错,请注意x的大小写,格式例如:201X";
		       return false;
		      }
		     } else {
		     // this.IDCardText = "身份证号码出生日期超出范围,格式例如:19860817";
		      return false;
		     }
		     break;
		    default :
		    // this.IDCardText = "身份证号码位数不对,应该为15位或是18位";
		     return false;
		     break;
		   }
		},

	
	
	//根据账号验证类别和客户类型
	custacctId : function(val){
		var isRegex = false;
		
		var storeCateg = Ext.getCmp('categ').store;
		var Tore=storeCateg.load({   
			       params: {start:0,limit:20},   
			       callback: function(records, options, success){  
			           //Ext.Msg.alert('info', '加载完毕');   
		      },   
			       scope: storeCateg,   
			       add: true  
		   });
		
		var storeCustType = Ext.getCmp('custType').store;
		var Store=storeCustType.load({   
			       params: {start:0,limit:20},   
			       callback: function(records, options, success){  
			           //Ext.Msg.alert('info', '加载完毕');   
		      },   
			       scope: storeCustType,   
			       add: true  
		   });
		
		if(val.substring(0,3)=="FTE"){
			
//			Ext.getCmp('categ').allowBlank = true;
//			valueField = Ext.getCmp('categ').valueField='01';
//			Ext.getCmp('categ').setValue(valueField);
			
			//alert(Ext.getCmp('categ').getValue());
			//Ext.getCmp('categ').value = '01';
			Ext.getCmp('categ').setValue('01');
			Ext.getCmp('categ').readOnly = true;
			Ext.getCmp('categ').store = Tore;
			
			
//			Ext.getCmp('categ').setRawValue('01--FTE');
//			Ext.getCmp('categ').hiddenName= '01';
			
//			 win.form.getForm().findField('assistInfo.pid.id')
//		        .setValue(01);
//		    Ext.fly('assistInfo.pid.id').dom.value='01--FTE';


			//Ext.getCmp('categ').setValue = 01;
//			alert(Ext.getCmp('categ').getValue());
			Ext.getCmp('subaccountno').regex = /^\d{11}$/;
			Ext.getCmp('subaccountno').regexText = '只能输入11位';
//			Ext.getCmp('custType').hiddenName = '1';
//			Ext.getCmp('custType').setRawValue('1--单位');
			
			Ext.getCmp('custType').setValue('1');
			Ext.getCmp('custType').readOnly = true;
			Ext.getCmp('custType').store = Store;
			
			isRegex = true;
		}
		else if(val.substring(0,3)=="FTN"){
			Ext.getCmp('categ').setValue('02');
			Ext.getCmp('categ').readOnly = true;
			Ext.getCmp('categ').store = Tore;
			Ext.getCmp('subaccountno').regex = /^\d{11}$/;
			Ext.getCmp('subaccountno').regexText = '只能输入11位';
			Ext.getCmp('custType').setValue('1');
			Ext.getCmp('custType').readOnly = true;
			Ext.getCmp('custType').store = Store;
			isRegex = true;
		}else if(val.substring(0,3)=="FTU"){
			Ext.getCmp('categ').setValue('03');
			Ext.getCmp('categ').readOnly = true;
			Ext.getCmp('categ').store = Tore;
			Ext.getCmp('subaccountno').regex = /^\d{11}$/;
			Ext.getCmp('subaccountno').regexText = '只能输入11位';
			Ext.getCmp('custType').setValue('1');
			Ext.getCmp('custType').readOnly = true;
			Ext.getCmp('custType').store = Store;
			isRegex = true;
		}else if(val.substring(0,3)=="FTI"){
			Ext.getCmp('categ').setValue('04');
			Ext.getCmp('categ').readOnly = true;
			Ext.getCmp('categ').store = Tore;
			Ext.getCmp('subaccountno').regex = /^\d{1,20}$/;
			Ext.getCmp('subaccountno').regexText = '只能输入1-20位'; 
			Ext.getCmp('custType').setValue('2');
			Ext.getCmp('custType').readOnly = true;
			Ext.getCmp('custType').store = Store;
			isRegex = true;
		}else if(val.substring(0,3)=="FTF"){
			Ext.getCmp('categ').setValue('05');
			Ext.getCmp('categ').readOnly = true;
			Ext.getCmp('categ').store = Tore;
			Ext.getCmp('subaccountno').regex = /^\d{1,20}$/;
			Ext.getCmp('subaccountno').regexText = '只能输入1-20位'; 
			Ext.getCmp('custType').setValue('2');
			Ext.getCmp('custType').readOnly = true;
			Ext.getCmp('custType').store = Store;
			isRegex = true;
		}
		else{
			Ext.getCmp('subaccountno').regex = /^\d{1,20}$/;
			Ext.getCmp('subaccountno').regexText = '只能输入1-20位'; 
			isRegex = true;
		}
      return isRegex;
	},
	
	//对日元的校验
	currencyCd : function(val){
		var isRegex = false;
				if(Ext.getCmp('currencyCd').getRawValue()=="JPY--日元"){
					if(Ext.getCmp('dayBalFill')){
						Ext.getCmp('dayBalFill').regex = /^\d{1,25}$/;
						Ext.getCmp('dayBalFill').regexText = '日元不能输入小数';	
					}else{
						Ext.getCmp('bal').regex = /^\d{1,25}$/;
						Ext.getCmp('bal').regexText = '日元不能输入小数';	
					}
					
					isRegex = true;
				}else{
					if(Ext.getCmp('dayBalFill')){
						Ext.getCmp('dayBalFill').regex = /^[+-]?\d{1,22}(?:\.\d{1,2})?$/;
						Ext.getCmp('dayBalFill').regexText = '只能输入数字,且整数位最大22位,小数位2位';
					}else{
						Ext.getCmp('bal').regex = /^[+-]?\d{1,22}(?:\.\d{1,2})?$/;
						Ext.getCmp('bal').regexText = '只能输入数字,且整数位最大22位,小数位2位';
					}
					
					isRegex = true;
				}
		return isRegex;
	},
	
	
	//“类别”为01(FTE)时，“账号”、“户名” 必须以FTE起始；
	//“类别”为02(FTN)时，“账号”、“户名”均必须以FTN起始；
	//“类别”为03(FTU)时，“账号”、“户名”均必须以FTU起始；
	//“类别”为04(FTI)时，“账号”、“户名”均必须以FTI起始；
	//“类别”为05(FTF)时，“账号”、“户名”均必须以FTF起始；

	//“类别”为11时，“账号”、“户名”均不起始于FT。
	
	// 类别为0开始时，子帐号/序号为必输项目

	
	custCateg : function(val, field) {
		var isRegex = true;
		var dicId = val.substring(0,2);
		//alert(dicId);
		// 账号
		var acctId = Ext.getCmp("acctId").getValue();
		// 户名
		var custNm = Ext.getCmp("custNm").getValue();
		
		if (field.confirmTo) {
			if (dicId == '11') {
				//if(acctId.indexOf("FT")==0 || custNm.indexOf("FT")==0 ){ 去除户名验证
				if(acctId.indexOf("FT")==0  ){	
					Ext.getCmp('subaccountno').allowBlank=true;
					Ext.getCmp('depoRate').allowBlank=true;
					isRegex = false;
				}
			}else if(dicId == '01'){
				if(acctId.indexOf("FTE")!=0  ){
					Ext.getCmp('subaccountno').allowBlank=false;
					Ext.getCmp('depoRate').allowBlank=false;
//					Ext.getCmp('categ').value = '01--FTE';
//					Ext.getCmp('subaccountno').maxLength = 11;
//					Ext.getCmp('custType').value = '01--单位';alert(Ext.getCmp('subaccountno').maxLength);
					isRegex = false;
				}
			}else if(dicId == '02'){
				if(acctId.indexOf("FTN")!=0  ){
					Ext.getCmp('subaccountno').allowBlank=false;
					Ext.getCmp('depoRate').allowBlank=false;
//					Ext.getCmp('categ').value = '02--FTN';
//					Ext.getCmp('subaccountno').maxLength = 11;
//					Ext.getCmp('custType').value = '01--单位';
					isRegex = false;
				}
			}else if(dicId == '03'){
				if(acctId.indexOf("FTU")!=0 ){
					Ext.getCmp('subaccountno').allowBlank=false;
					Ext.getCmp('depoRate').allowBlank=false;
//					Ext.getCmp('categ').value = '03--FTU';
//					Ext.getCmp('subaccountno').maxLength = 11;
//					Ext.getCmp('custType').value = '01--单位';
					isRegex = false;
				}
			}else if(dicId == '04'){
				if(acctId.indexOf("FTI")!=0 ){
					Ext.getCmp('subaccountno').allowBlank=false;
					Ext.getCmp('depoRate').allowBlank=false;
//					Ext.getCmp('categ').value = '04--FTI';
//					Ext.getCmp('subaccountno').maxLength = 20; 
//					Ext.getCmp('custType').value = '02--个人';
					isRegex = false;
				}
			}else if(dicId == '05'){
				if(acctId.indexOf("FTF")!=0 ){
					Ext.getCmp('subaccountno').allowBlank=false;
					Ext.getCmp('depoRate').allowBlank=false;
//					Ext.getCmp('categ').value = '05--FTF';
//					Ext.getCmp('subaccountno').maxLength = 20; 
//					Ext.getCmp('custType').value = '02--个人';
					isRegex = false;
				}
			}
		}

		var depoRate =  Ext.getCmp('depoRate').getValue();
		if(""==depoRate){
			Ext.getCmp('depoRate').setValue("0");
		}
		
		return isRegex;
	},
	// 定期存款时，期限长度 必填
	custPeriodLen: function(val, field) {
		var isRegex = false;
		var fixDepoInd = Ext.getCmp("fixDepoInd").getValue();
		var periodLen = Ext.getCmp("periodLen").getValue();
		if (field.confirmTo) {
			if (fixDepoInd=='1' && periodLen !=''){
				isRegex = true;
			}
			if (fixDepoInd=='0') {
				Ext.getCmp('periodLen').allowBlank=true;
				isRegex = true;
			}
		}
		return isRegex;
	},
	
	// 定期存款时，期限单位必填
	custPeriodUnit: function(val, field) {
		var isRegex = false;
		var fixDepoInd = Ext.getCmp("fixDepoInd").getValue();
		var periodUnit = Ext.getCmp("periodUnit").getValue();
		
		if (field.confirmTo) {
			if (fixDepoInd=='1' && periodUnit !=''){
				isRegex = true;
			}
			if (fixDepoInd=='0') {
				Ext.getCmp('periodUnit').allowBlank=true;
				isRegex = true;
			}
		}
		return isRegex;
	},
	
	// 定期存款时，到期日 必填
	custMatureDt: function(val, field) {
		var isRegex = false;
		var fixDepoInd = Ext.getCmp("fixDepoInd").getValue();
		var matureDt = Ext.getCmp("matureDt").getValue();
		if (field.confirmTo) {
			if (fixDepoInd=='1' && matureDt !=''){
				isRegex = true;
			}
			if (fixDepoInd=='0') {
				Ext.getCmp('matureDt').allowBlank=true;
				isRegex = true;
			}
		}
		return isRegex;
	},
	// 对方机构为境外机构时，国内地区码可空
	custDomechargeAreaCd: function(val, field) {
		var isRegex = true;
		var countryCd =val.substring(0,3);
		var domechargeAreaCd = Ext.getCmp("domechargeAreaCd").getValue();
		if (field.confirmTo) {
			if (countryCd=='CHN' ||countryCd=='HKG' ||countryCd=='MAC' ||countryCd=='TWN'){
				Ext.getCmp('domechargeAreaCd').allowBlank=true;
				if(domechargeAreaCd =='-1' || domechargeAreaCd==null){
					isRegex = false;
					
				}
			}else{
				Ext.getCmp('domechargeAreaCd').allowBlank=true;
				Ext.getCmp('domechargeAreaCd').setValue("");
			}
		}
		return isRegex;
	},
	// 受益人国别代码时，受益人国内地区代码可空
	custBenefDomeAreaCd: function(val, field) {
		var isRegex = true;
		var countryCd =val.substring(0,3);
		var domechargeAreaCd = Ext.getCmp("benefDomeAreaCd").getValue();
		if (field.confirmTo) {
			if (countryCd=='CHN' ||countryCd=='HKG' ||countryCd=='MAC' ||countryCd=='TWN'){
				Ext.getCmp('benefDomeAreaCd').allowBlank=false;
				if(domechargeAreaCd =='-1' || domechargeAreaCd==null){
					isRegex = false;
					
				}
			}else{
				Ext.getCmp('benefDomeAreaCd').allowBlank=true;
			}
		}
		return isRegex;
	},
	
	// 债务人国别代码时，债务人国内地区代码可空
	custDebtorDomeAreaCd: function(val, field) {
		var isRegex = true;
		var countryCd =val.substring(0,3);
		var domechargeAreaCd = Ext.getCmp("debtorDomeAreaCd").getValue();
		if (field.confirmTo) {
			if (countryCd=='CHN' ||countryCd=='HKG' ||countryCd=='MAC' ||countryCd=='TWN'){
				Ext.getCmp('debtorDomeAreaCd').allowBlank=false;
				if(domechargeAreaCd =='-1' || domechargeAreaCd==null){
					isRegex = false;
					
				}
			}else{
				Ext.getCmp('debtorDomeAreaCd').allowBlank=true;
			}
		}
		return isRegex;
	},
	
	// 担保权人国别代码时，担保权人国内地区代码可空
	custSecuredPartyDomeAreaCd: function(val, field) {
		var isRegex = true;
		var countryCd =val.substring(0,3);
		var domechargeAreaCd = Ext.getCmp("securedPartyDomeAreaCd").getValue();
		if (field.confirmTo) {
			if (countryCd=='CHN' ||countryCd=='HKG' ||countryCd=='MAC' ||countryCd=='TWN'){
				Ext.getCmp('securedPartyDomeAreaCd').allowBlank=false;
				if(domechargeAreaCd =='-1' || domechargeAreaCd==null){
					isRegex = false;
					
				}
			}else{
				Ext.getCmp('securedPartyDomeAreaCd').allowBlank=true;
			}
		}
		return isRegex;
	},
	
	
	
	// 申请人国别代码为境外机构时，国内地区码可空
	custApplicantCountryCd: function(val, field) {
		var isRegex = true;
		var countryCd =val.substring(0,3);
		var domechargeAreaCd = Ext.getCmp("applicantDomeAreaCd").getValue();
		if (field.confirmTo) {
			if (countryCd=='CHN' ||countryCd=='HKG' ||countryCd=='MAC' ||countryCd=='TWN'){
				Ext.getCmp('applicantDomeAreaCd').allowBlank=false;
				if(domechargeAreaCd =='-1' || domechargeAreaCd==null){
					isRegex = false;
					
				}
			}else{
				Ext.getCmp('applicantDomeAreaCd').allowBlank=true;
			}
		}
		return isRegex;
	},
	
	// 出/入账标志 为 1或2时，对方账号、对方户名和对方银行或机构代码必填
	custOutInAcctIndRegexAll : function(val, field) {
		var isRegex = true;
		var dicId = val.substring(0,1);
		if (field.confirmTo) {
			//var obj = Ext.getCmp(field.confirmTo);
			//var cType = obj.getValue();
			if (dicId == '3' || dicId == '4') {
				Ext.getCmp('oppositeAcctno').allowBlank=true;
				Ext.getCmp('oppositeAcctName').allowBlank=true;
				if(Ext.getCmp('oppositeBankCd')){
					Ext.getCmp('oppositeBankCd').allowBlank=true;
				}
				// 原始交易日期
				var origTxnDt = new Date(Ext.getCmp("origTxnDt").getValue());
				if ('Thu Jan 01 1970 08:00:00 GMT+0800' == origTxnDt) {
					isRegex = false;
				} else {
					var acctingDt;
					// 记帐日期
					var acctDt = Ext.getCmp("acctDt");
					if(acctDt){
						acctingDt = new Date(Ext.getCmp("acctDt").getValue());
					}else{
						acctingDt = new Date(Ext.getCmp("acctingDt").getValue());
					}

					isRegex = (origTxnDt <= acctingDt ? true : false);
				}
			}else if(dicId == '1' || dicId == '2'){
				Ext.getCmp('oppositeAcctno').allowBlank=false;
				Ext.getCmp('oppositeAcctName').allowBlank=false;
				if(Ext.getCmp('oppositeBankCd')){
					Ext.getCmp('oppositeBankCd').allowBlank=false;
				}
			}
		}
		return isRegex;
	},
	
	//检查输入字符串的长度是否小于128
		oppositeAcctName : function(_v){
			var len = 0;
			 var arr = _v.split("");
			 for (var i=0;i<arr.length;i++) {
				 if (arr[i].charCodeAt(0)<299) {
					   len++;
					  } else {
					   len+=2;
					  }
			 }
			if(len<=128){
				return true;
			}else{
				return false;
			}
		}
		
	
});

 

function toSubmitTol(declareDt,tableName,tPath) {
	var myMask = new Ext.LoadMask(Ext.getBody(), {msg : '正在执行操作,请稍等...'});
    myMask.show();
	var actionPath = OSS.getAppName + "/rpt/rptpublish_getIfCheckTolCount";
	Ext.Ajax.request({
				url : actionPath,
				method : 'post',
				params : {
					tableName : tableName,
					declareDt: declareDt
				},
				success : function(response, options) {
					var message = response.responseText;
					if (message == '0') {
						toQRSubmitTol(declareDt,tableName, getMsgNo(tableName), tPath);
					} else { 
						//new OSS.view.UpdateView3().show();
							OSS.AlertInfo(message); 
						//a.show();//jpf
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					myMask.hide();
				}
			});
}

var toUpdateModel = function() {
	var myMask = new Ext.LoadMask(Ext.getBody(), {
				msg : '正在修改上报模式,请稍等...'
			});
	myMask.show();
	Ext.Ajax.request({
				url : OSS.getAppName + "/rpt/rptpublish_selectModel",
				method : 'post',
				params : {
					declareDt3 : OSS.getExtValue('declareDt3'),
					radio4 : OSS.getExtValue('radio4'),
					radio5 : OSS.getExtValue('radio5'),
					hour   : OSS.getExtValue('hour'),
					minute : OSS.getExtValue('minute')
				},
				success : function(response, options) {
					var message = response.responseText;
					if (message == '0') {
						OSS.AlertInfo("选择上报模式成功！");
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					myMask.hide();
				}
			});
};


// 检查某一条数据的明细信息是否能上报
function toCheckDtlClick(tableName, dtlPK, tPath) {
	var myMask = new Ext.LoadMask(Ext.getBody(), {msg : '正在执行操作,请稍等...'});
    myMask.show();
	var actionPath = OSS.getAppName + "/rpt/rpt" + tPath
			+ "_getIfCheckDtlCount";
			
	Ext.Ajax.request({
				// url : "/OSS/rpt/rptTFtuFinabondDtl_toList",
				url : actionPath,
				method : 'post',
				params : {
					tableName : tableName,
					dtlPK : dtlPK
				},
				success : function(response, options) {
					var c1 = Ext.JSON.decode(response.responseText);
					if (c1 == '0') {
						toQRSubmitDtl(tableName, dtlPK, tPath);
					} else {
						OSS.AlertInfo("部分数据未达到上报要求，请修改后再上报");
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					myMask.hide();
				}
			});
}
// 上报明细
function toQRSubmitDtl(tableName, msgNo, tPath) {
	var myMask = new Ext.LoadMask(Ext.getBody(), {msg : '正在执行操作,请稍等...'});
    myMask.show();
	Ext.Ajax.request({
				url : OSS.getAppName + "/rpt/rpt" + tPath + "_toShangBaoDtl",
				method : 'post',
				params : {
					id : msgNo
				},
				success : function(response, options) {
					var c1 = Ext.JSON.decode(response.responseText);
					if (c1 == '0') {
						OSS.AlertInfo("明细数据上报成功！");
					} else {
						OSS.AlertInfo("明细数据上报成功！");
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					myMask.hide();
				}
			});
}
// 生成XML内容
function toQRSubmitTol(declareDt,tableName, msgNo, tPath) {
	Ext.MessageBox.show({
				title : '信息',
				msg : "您确定要生成上报内容吗？",
				buttons : Ext.MessageBox.YESNO,
				fn : function(btn) {
					// 选择【是】
					if (btn == 'yes') {
						// 判断是否是一键生成所有报文
						var OKShbRH = OSS.getExtValue('OKShbRH');
						if(OKShbRH == 'yes') {
							okSubmitTol(declareDt,tableName, msgNo, tPath);
						} else {
							submitTol(declareDt,tableName, msgNo, tPath);
						}
					}
				},
				animEl : 'mb4',
				icon : Ext.MessageBox.QUESTION
			});
}

var submitTol = function(declareDt,tableName, msgNo, tPath) {
	var myMask = new Ext.LoadMask(Ext.getBody(), {
				msg : '正在生成上报信息,请稍等...'
			});
	myMask.show();
	Ext.Ajax.request({
				url : OSS.getAppName + "/rpt/rptpublish_toShangBao",
				method : 'post',
				params : {
					declareDt : declareDt,
					tableName : tableName,
					msgNo : msgNo
				},
				success : function(response, options) {
					var c1 = Ext.JSON.decode(response.responseText);
					if (c1.success) {
						OSS.AlertInfo(c1.msg, refreshGriPanel);
					} else {
						OSS.AlertInfo(c1.msg);
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					myMask.hide();
				}
			});
};

//一键生成所有报文信息
var okSubmitTol = function(declareDt,tableName, msgNo, tPath) {
	var myMask = new Ext.LoadMask(Ext.getBody(), {
				msg : '正在生成上报信息,请稍等...'
			});
	myMask.show();
	Ext.Ajax.request({
				url : OSS.getAppName + "/rpt/rptpublish_toOKShangBao",
				//url : OSS.getAppName + "/rpt/rptpublish_processCustinfo",
				method : 'post',
				params : {
					declareDt : declareDt,
					tableName : tableName,
					msgNo : msgNo
				},
				success : function(response, options) {
					var c1 = Ext.JSON.decode(response.responseText);
					if (c1.success) {
						OSS.AlertInfo(c1.msg, refreshGriPanel);
					} else {
						OSS.AlertInfo(c1.msg);
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					myMask.hide();
				}
			});
};

// 确认明细上报
function toSubmitDal() {
	Ext.MessageBox.show({
				title : '信息',
				msg : "您确定要上报吗？",
				buttons : Ext.MessageBox.YESNO,
				fn : function(btn) {
					if (btn == 'yes') {
					}
				},
				animEl : 'mb4',
				icon : Ext.MessageBox.QUESTION
			});
}

// 是否需要修改
var ifNeedChangeDic = function(value) {
	if (value == '0') {
		return "";
	} else if (value == '2') {
		return "否";
	} else if (value == '1') {
		return "是";
	}
};
// 是否需要修改
var ifNeedChangeStore = Ext.create('Ext.data.Store', {
			fields : kValFields,
			data : [{
						"id" : "2",
						"name" : "否"
					}, {
						"id" : "1",
						"name" : "是"
					}]
		});
		
//根据起息日，期限长度，期限单位算到期日 
function setMatureDt(intStartDtField, periodLenField,periodUnitField,matureDtField) {
		var intStartDt=OSS.getExtValue(intStartDtField);
		var periodLen=OSS.getExtValue(periodLenField);
		var periodUnit=OSS.getExtValue(periodUnitField); 
		var result=new Date();
		//起息日，期限长度，期限单位若有空值则返回默认值
		if(intStartDt&&periodLen&&periodUnit)
		{ 
			result=intStartDt.DateAdd(CastDateType(periodUnit),parseInt(periodLen));
		
		} 
		OSS.setExtValue(matureDtField,result);
		
	}
Date.prototype.DateAdd = function(strInterval, Number) {  
     var dtTmp = this;  
 switch (strInterval) {  
         case 's' : return new Date(dtTmp.getTime() + (1000 * Number));  
         case 'n' : return new Date(dtTmp.getTime() + (60000 * Number));  
         case 'h' : return new Date(dtTmp.getTime() + (3600000 * Number));  
         case 'd' : return new Date(dtTmp.getTime() + (86400000 * Number));  
         case 'w' : return new Date(dtTmp.getTime() + ((86400000 * 7) * Number));  
         case 'q' : return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
         case 'm' : return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
         case 'y' : return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
     }  
 }

 //日期类型转换
function CastDateType(dateType)
{
   switch(dateType){
     case  "1" : { 
                     return  "y";
                     break;
                }
     case  "2" : { 
                     return  "m";
                     break;
                }
      case  "3" : { 
                     return  "d";
                     break;
                } 
   }
}
 
function   DateAdd(interval,number,date)
{
/*
  *   功能:实现DateAdd功能.
  *   参数:interval,字符串表达式，表示要添加的时间间隔.
  *   参数:number,数值表达式，表示要添加的时间间隔的个数.
  *   参数:date,时间对象.
  *   返回:新的时间对象.
  *   var   now   =   new   Date();
  *   var   newDate   =   Da;
  *   teAdd( "d ",5,now);
  *---------------   DateAdd(interval,number,date)   -----------------
  */
        switch(interval)
        {
                case   "y"   :   {
                        date.setFullYear(date.getFullYear()+number);
                        return   date;
                        break;
                }
                case   "q"   :   {
                        date.setMonth(date.getMonth()+number*3);
                        return   date;
                        break;
                }
                case   "m"   :   {
                        date.setMonth(date.getMonth()+number);
                        return   date;
                        break;
                }
                case   "w"   :   {
                        date.setDate(date.getDate()+number*7);
                        return   date;
                        break;
                }
                case   "d"   :   {
                        date.setDate(date.getDate()+number);
                        return   date;
                        break;
                }
                case   "h"   :   {
                        date.setHours(date.getHours()+number);
                        return   date;
                        break;
                }
                case   "M"   :   {
                        date.setMinutes(date.getMinutes()+number);
                        return   date;
                        break;
                }
                case   "s"   :   {
                        date.setSeconds(date.getSeconds()+number);
                        return   date;
                        break;
                }
                default   :   {
                        date.setDate(d.getDate()+number);
                        return   date;
                        break;
                }
        }
}

//日期字符串转换为年月日格式
var stringToDate = function(value){
	
	if(null!=value && ""!=value){
		return value.substring(0,10);
	}
}

//千位符显示及格式处理
var BalChange=function(value){
	var val = value;
	var str = ""+val;
//	Ext.util.Format.thousandSeparator = ',';
//	Ext.util.Format.decimalSeparator = '.';
	if(str.length>18){
		var xiaoShu = str.indexOf(".");
		if(xiaoShu>0){
			var num1 =  str.substring(str.length-18, xiaoShu);
			var num2 =  str.substring(0, str.length-18);
			return ""+Ext.util.Format.number(num2, '0,000')+","+Ext.util.Format.number(num1, '0,000')+str.substring(xiaoShu,str.length); 
		}else{
			var num1 =  str.substring(str.length-18, str.length);
			var num2 =  str.substring(0, str.length-18);
			return ""+Ext.util.Format.number(num2, '0,000')+","+Ext.util.Format.number(num1, '0,000.00'); 
		}
	}else if(str.length>15){
		var xiaoShu = str.indexOf(".");
		if(xiaoShu>0){
			var num1 =  str.substring(str.length-15, xiaoShu);
			var num2 =  str.substring(0, str.length-15);
			return ""+Ext.util.Format.number(num2, '0,000')+","+Ext.util.Format.number(num1, '0,000')+str.substring(xiaoShu,str.length); 
		}else{
			var num1 =  str.substring(str.length-15, str.length);
			var num2 =  str.substring(0, str.length-15);
			return ""+Ext.util.Format.number(num2, '0,000')+","+Ext.util.Format.number(num1, '0,000.00'); 
		}
	}else{
		//var num =  (value).toFixed(2);
		return ""+Ext.util.Format.number(value, '0,000.00'); 
	}
	
}



//var status;
//判断操作权限
 function JudgeAuthority(value) {
	 var status="0";
	Ext.Ajax.request({
				url : OSS.getAppName + "/rpt/rptpublish_toJudgeAuthority",
				method : 'post',
				async: false, 
				params : {
					dataId : value
				},
				success : function(response, options) {
					var d = response.responseText;
					if(d=="1" || d=="3"){
					 status=d;	
					}else{
					 status="0";
					}
				},
				failure : function(response) {
				},
				callback : function(o, r, n) {
					
				}
			});
	
	return status;
}

// 根据定期标识，初始化期限长度、期限单位和到期日是否是必填
function initByFixDepoInd(){
	var fixDepoInd = Ext.getCmp("fixDepoInd").getValue();

	if (fixDepoInd=='1'){
		Ext.getCmp('periodLen').allowBlank=false;
		Ext.getCmp('periodUnit').allowBlank=false;
		Ext.getCmp('matureDt').allowBlank=false;
	}
	if (fixDepoInd=='0') {
		Ext.getCmp('periodLen').allowBlank=true;
		Ext.getCmp('periodUnit').allowBlank=true;
		Ext.getCmp('matureDt').allowBlank=true;
	}
}

Ext.define('OSS.view.ShangBaoView', {
	extend : 'Ext.window.Window',
	animCollapse : true,
	modal : true,
	resizable : false,
	closeAction : 'destroy',
	height : 200,
	width : 300,
	iconCls : 'icon-tabedit',
	title : '上报确认--选择申报日期',
	layout : {
		type : 'border'
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
					items : [{
								xtype : 'form',
								title : '',
								region : 'center',
								id : 'editFormShangBao',
								bodyPadding : 10,
								border : false,
								autoScroll : true,
								bodyStyle : 'background-color: #DFE8F6;',
								fieldDefaults : 'labelWidth: 100',
								items : [{
											xtype : 'datefield',
											id : 'declareDt',
											name : 'declareDt',
											width : 240,
											fieldLabel : '申报日期',
											blankText : '您未输入申报日期',
											emptyText : '请输入申报日期',
											allowBlank : false,
											editable : false,
											value : ServerDate,
											maxValue:maxValue,
											minValue:minValue,
											format : 'Y-m-d'
										}, {
											xtype : 'hiddenfield',
											id : 'tableName',
											name : 'tableName'
										}, {
											xtype : 'hiddenfield',
											id : 'tPath',
											name : 'tPath'
										}, {
											xtype : 'hiddenfield',
											id : 'OKShbRH',
											name : 'OKShbRH'
										}]
							}],
					dockedItems : {
						xtype : 'toolbar',
						dock : 'bottom',
						items : [ {
									xtype : 'tbfill'
								}, {
									xtype : 'button',
									id : 'ButtonOk32Shangbao',
									iconCls : 'icon-databasesave',
									text : '提交',
									listeners : {
										click : {
											fn : me.onButtonOkClick,
											scope : me
										}
									}
								}, {
									xtype : 'button',
									id : 'ButtonCancel32Shangbao',
									iconCls : 'icon-doorout',
									text : '关闭',
									listeners : {
										click : {
											fn : me.onButtonCancelClick,
											scope : me
										}
									}
								}]
					}
				});

		me.callParent(arguments);
	},
	onWindowShow : function(component, eOpts) {
		initWin = this;
		//setTimeout(function() {getTCorpdepoTolInfo();}, 100);
	},
	onButtonCancelClick : function(component, eOpts) {
		this.destroy();
	},
	onButtonOkClick : function(component, eOpts) {
		var declareDt = OSS.getExtValue("declareDt");
		var tableName = OSS.getExtValue("tableName");
		var tPath = OSS.getExtValue("tPath");
		toSubmitTol(declareDt,tableName, tPath);
	}
});


// 根据表明获得相应的报文编号
function getMsgNo(value) {
	if (value == 'T_CorpDepo_Tol') {
		return "210101";
	} else if (value == 'T_FTU_FinaBond_Tol') {
		return "210102";
	} else if (value == 'T_FTU_MedLongBorr_Tol') {
		return "210103";
	} else if (value == 'T_AccoPayaTemp_Tol') {
		return "210104";
	} else if (value == 'T_AsseSoldRepu_Tol') {
		return "210105";
	} else if (value == 'T_BorrCentBank_Tol') {
		return "210106";
	} else if (value == 'T_TradCurrAcco_Sour_Tol') {
		return "210107";
	} else if (value == 'T_SysFinaFlow_Sour_Tol') {
		return "210108";
	} else if (value == 'T_FOREXTradeSpot_Sour_Tol') {
		return "210109";
	} else if (value == 'T_FTU_EntrdSav_Tol') {
		return "210110";
	} else if (value == 'T_AgentEntrdLoanFund_Tol') {
		return "210111";
	} else if (value == 'T_TotaReserve_Tol') {
		return "210112";
	} else if (value == 'T_TotaLoan_Tol') {
		return "210201";
	} else if (value == 'T_Securitie_Tol') {
		return "210202";
	} else if (value == 'T_EquityOtherInvest_Tol') {
		return "210203";
	} else if (value == 'T_ResvablePrepayment_Tol') {
		return "210204";
	} else if (value == 'T_BuyBackAssetAcquired_Tol') {
		return "210205";
	} else if (value == 'T_CentBankReserve_Tol') {
		return "210206";
	} else if (value == 'T_CentBankSpecDepo_Tol') {
		return "210207";
	} else if (value == 'T_CentBankFinSavDepo_Tol') {
		return "210208";
	} else if (value == 'T_TradCurrAcco_Oper_Tol') {
		return "210209";
	} else if (value == 'T_SysFinaFlow_Oper_Tol') {
		return "210210";
	} else if (value == 'T_VaultCash_Tol') {
		return "210211";
	} else if (value == 'T_FOREXTradeSpot_Oper_Tol') {
		return "210212";
	} else if (value == 'T_AgencyBonds') {
		return "210301";
	} else if (value == 'T_Lc_Pay') {
		return "210302";
	} else if (value == 'T_LgStandBy_Pay') {
		return "210303";
	} else if (value == 'T_LCConfirm_Imp') {
		return "210304";
	} else if (value == 'T_BankAccepBill_Pay') {
		return "210305";
	} else if (value == 'T_Lc_Resv') {
		return "210306";
	} else if (value == 'T_LgStandBy_Resv') {
		return "210307";
	} else if (value == 'T_LCConfirm_Exp') {
		return "210308";
	} else if (value == 'T_BankAccepBill_Resv') {
		return "210309";
	} else if (value == 'T_FwdExeSlt') {
		return "210310";
	} else if (value == 'T_CurrSwaps') {
		return "210311";
	} else if (value == 'T_OffsheetFin_Tol') {
		return "210401";
	} else if (value == 'T_FTE_AcctInfo') {
		return "210501";
	}
}
