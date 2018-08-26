package com.topcheer.rpt.web;

import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.jgb.utils.PoiCommon;
import com.topcheer.oss.utils.JsonUtil;
import com.topcheer.rpt.bo.TCorpdepoTol;
import com.topcheer.rpt.service.TCorpdepoDtlService;
import com.topcheer.rpt.service.TCorpdepoTolService;
import com.topcheer.rpt.service.TpublishService;

@SuppressWarnings("serial")
public class TCorpdepoTolAction extends BaseAction {
	private TpublishService tPublishService;
	private TCorpdepoTolService tCorpdepoTolService;
	private TCorpdepoDtlService tCorpdepoDtlService;

	public void settPublishService(TpublishService tPublishService) {
		this.tPublishService = tPublishService;
	}

	public void settCorpdepoDtlService(TCorpdepoDtlService tCorpdepoDtlService) {
		this.tCorpdepoDtlService = tCorpdepoDtlService;
	}

	public void settCorpdepoTolService(TCorpdepoTolService tCorpdepoTolService) {
		this.tCorpdepoTolService = tCorpdepoTolService;
	}

	@SuppressWarnings("unchecked")
	public void toList() throws Exception {
		Integer start = Integer
				.parseInt(getStringParameter("start") == "" ? "0"
						: getStringParameter("start"));
		Integer limit = Integer
				.parseInt(getStringParameter("limit") == "" ? "20"
						: getStringParameter("limit"));
		Integer endIndex = start + limit;
		StringBuffer sortString = new StringBuffer();
		String filterString = getFilterString(sortString);
		List<TCorpdepoTol> entList = (List<TCorpdepoTol>) tCorpdepoTolService
				.getByPage(start, endIndex, filterString, sortString.toString());
		int total = tCorpdepoTolService
				.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception {
		String start = getStringParameter("start") == "" ? "0"
				: getStringParameter("start");
		String colList = getStringParameter("col");
		StringBuffer sortString = new StringBuffer();
		String filterString = getFilterString(sortString);
		int total = tCorpdepoTolService
				.getPageRowCount(filterString.toString());
		if (total <= 65534 && total > 0) {
			List<?> list = tCorpdepoTolService.getByPage(
					Integer.parseInt(start), -1, filterString,
					sortString.toString());
			String downFileName = "/downfile/"
					+ String.format("单位存款-汇总%1$s.xls", DateUtil
							.timestamp2StringMillis(new Timestamp(System
									.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream(new File(fileName));
			PoiCommon.exportExcel("单位存款-汇总", colList.split(";"), list, fos);
			fos.close();
			if (!downFileName.isEmpty()) {
				this.returnJson(true, downFileName);
				this.log_act.log("下载文件：" + downFileName);
			} else {
				this.returnJson(false, "文件生成错误！");
			}
		} else if (total > 65534) {
			this.returnJson(false, "导出数据过大，请增加查询条件，查询后再导出！");
		} else {
			this.returnJson(false, "没有可导出的数据,请查询后再导出！");
		}
	}

	public void toAdd() throws Exception {
		TCorpdepoTol obj = new TCorpdepoTol();
		String oblkeyId = String.format("%1$s_%2$s", this
				.getStringParameter("subaccountno"), DateUtil.date2String(DateUtil
				.string2Date(this.getStringParameter("declareDt"),
						DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2));
		TCorpdepoTol oldObj = tCorpdepoTolService.getTCorpdepoTol(oblkeyId);
		if (oldObj != null && oldObj.getSubaccountno() != null) {
			this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
			this.log_act.log("添加一条单位存款-汇总: 失败");
		} else {
			obj.setAcctId(this.getStringParameter("acctId"));
			obj.setFixDepoInd(this.getStringParameter("fixDepoInd"));
			obj.setCustNm(this.getStringParameter("custNm"));
			obj.setCateg(this.getStringParameter("categ")); 
			obj.setAcctId(this.getStringParameter("acctId"));
			
			String depoRate = this.getStringParameter("depoRate");
			if(StringUtils.isNotEmpty(depoRate)){
				obj.setDepoRate(new BigDecimal(depoRate));
			}
			
			obj.setCustType(this.getStringParameter("custType"));
			obj.setBalanceCd(this.getStringParameter("balanceCd"));
			obj.setIdenType(this.getStringParameter("idenType"));
			obj.setIdenNo(this.getStringParameter("idenNo"));
			obj.setCurrencyCd(this.getStringParameter("currencyCd"));
			
			String dayBalFill = this.getStringParameter("dayBalFill");
			if(StringUtils.isNotEmpty(dayBalFill)){
				obj.setDayBalFill(new BigDecimal(dayBalFill));
			}
			
			obj.setDeclareDt(DateUtil.string2Date(
					this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
			obj.setSubaccountno(this.getStringParameter("subaccountno"));
			obj.setTolRecord(this.getStringParameter("tolRecord"));
			obj.setOpenOrgId(this.getStringParameter("openOrgId"));
			obj.setIfchecked(this.getStringParameter("ifchecked"));
			obj.setCreateUser(this.getStringParameter("userId"));
			obj.setIfNeedChange("2");
			int result = tCorpdepoTolService.addTCorpdepoTol(obj);
			if (result > 0) {
				this.returnJson(true, "添加成功！");
				this.log_act.log("添加一条单位存款-汇总：成功");
			} else {
				this.returnJson(false, "添加失败！");
				this.log_act.log("添加一条单位存款-汇总: 失败");
			}
		}
	}

	public void toDel() throws Exception {
		String id = this.getStringParameter("id");
		int result = tCorpdepoTolService.delTCorpdepoTol(id);
		if (result > 0) {
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条单位存款-汇总：成功");
		} else {
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条单位存款-汇总：失败");
		}
	}

	public void toEnt() throws Exception {
		String id = this.getStringParameter("id");
		TCorpdepoTol ent = tCorpdepoTolService.getTCorpdepoTol(id);
		JSONArray json = JSONArray.fromObject(ent, JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception {
		String seq = this.getStringParameter("id");
		if (!seq.isEmpty()) {
			TCorpdepoTol obj = tCorpdepoTolService.getTCorpdepoTol(seq);
			obj.setFixDepoInd(this.getStringParameter("fixDepoInd"));
			obj.setCustNm(this.getStringParameter("custNm"));
			obj.setCateg(this.getStringParameter("categ"));
			//obj.setSubaccountno(this.getStringParameter("subaccountno"));
			obj.setAcctId(this.getStringParameter("acctId"));
			
			String depoRate = this.getStringParameter("depoRate");
			if(StringUtils.isNotEmpty(depoRate)){
				obj.setDepoRate(new BigDecimal(depoRate));
			}
			
			obj.setCustType(this.getStringParameter("custType"));
			obj.setBalanceCd(this.getStringParameter("balanceCd"));
			obj.setIdenType(this.getStringParameter("idenType"));
			obj.setIdenNo(this.getStringParameter("idenNo"));
			obj.setCurrencyCd(this.getStringParameter("currencyCd"));
			//obj.setDayBalFill(this.getStringParameter("dayBalFill"));
			String dayBalFill = this.getStringParameter("dayBalFill");
			if(StringUtils.isNotEmpty(dayBalFill)){
				obj.setDayBalFill(new BigDecimal(dayBalFill));
			}
			obj.setTolRecord(this.getStringParameter("tolRecord"));
			obj.setOpenOrgId(this.getStringParameter("openOrgId"));
			obj.setIfchecked(this.getStringParameter("ifchecked"));
			
			obj.setModifiedUser(this.getStringParameter("userId"));
			
			
//			obj.setmodifiedUser(OSS.getExtValue('userId'));
			obj.setIfNeedChange("2");
			int result = tCorpdepoTolService.setTCorpdepoTol(obj);
			if (result > 0) {
				this.returnJson(true, "修改成功！");
				this.log_act.log("更新一条单位存款-汇总：成功");
			} else {
				this.returnJson(false, "修改失败！");
				this.log_act.log("更新一条单位存款-汇总：失败");
			}
		}
	}
	
//	public void getUserMenuRoot() throws Exception {
//		String retStr = "[{\"createTime\":{\"date\":4,\"day\":3,\"hours\":22,\"minutes\":28,\"month\":11,\"nanos\":0,\"seconds\":51,\"time\":1386167331000,\"timezoneOffset\":-480,\"year\":113},\"depth\":1, \"iconCss\":\"icon-emailstart\",\"isPermit\":\"\",\"isWorkPlan\":\"0\",\"modifyTime\":{\"date\":20,\"day\":5,\"hours\":13,\"minutes\":49,\"month\":11,\"nanos\":0,\"seconds\":6, \"time\":1387518546000,\"timezoneOffset\":-480,\"year\":113},\"operatorId\":\"\",\"parentSourceId\":\"706\",\"sourceCode\":\"报表报送数据管理\",\"sourceFrom\":\"101\", \"sourceId\":\"87605\",\"sourceName\":\"上海银行自贸区\",\"sourceSort\":1,\"sourceTypeId\":\"5\",\"sourceUrl\":\"\",\"status\":\"2\",\"z010Permits\":[],\"z010Source\":null, \"z010SourceType\":null,\"z010Sources\":[]}]";
//		this.returnJson(retStr);
//	}
//	
//	public void getUserMenuItem() throws Exception {
//		String retStr = "[{\"children\":[{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88519\",\"qtip\":\"FTU 内部活动-金融债券\",\"remark\":\"\",\"text\":\"FTU 内部活动-金融债券\", \"webPath\":\"rpt/t_ftu_finabond_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88530\",\"qtip\":\"FTU 内部活动-中长期借款\",\"remark\":\"\", \"text\":\"FTU 内部活动-中长期借款\",\"webPath\":\"rpt/t_ftu_medlongborr_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88541\",\"qtip\":\"应付及暂收款\", \"remark\":\"\",\"text\":\"应付及暂收款\",\"webPath\":\"rpt/t_accopayatemp_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88552\",\"qtip\":\"卖出回购资产\", \"remark\":\"\",\"text\":\"卖出回购资产\",\"webPath\":\"rpt/t_assesoldrepu_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88563\",\"qtip\":\"向中央银行借款\", \"remark\":\"\",\"text\":\"向中央银行借款\",\"webPath\":\"rpt/t_borrcentbank_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88574\",\"qtip\":\"同业往来（来源方）\", \"remark\":\"\",\"text\":\"同业往来（来源方）\",\"webPath\":\"rpt/t_tradcurracco_sour_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88585\",\"qtip\":\"系统内资金往来\", \"remark\":\"\",\"text\":\"系统内资金往来\",\"webPath\":\"rpt/t_sysfinaflow_sour_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88596\",\"qtip\":\"外汇买卖（即期）\", \"remark\":\"\",\"text\":\"外汇买卖（即期）\",\"webPath\":\"rpt/t_forextradespot_sour_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88607\", \"qtip\":\"FTU 委托存款及委托投资基金（净）\",\"remark\":\"\",\"text\":\"FTU 委托存款及委托投资基金（净）\",\"webPath\":\"rpt/t_ftu_entrdsav_tol.jsp\"},{\"children\":[], \"iconCls\":\"icon-chartpie\",\"id\":\"88618\",\"qtip\":\"代理金融机构委托贷款基金\",\"remark\":\"\",\"text\":\"代理金融机构委托贷款基金\",\"webPath\":\"rpt/t_agententrdloanfund_tol.jsp\"}, {\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88629\",\"qtip\":\"各项准备\",\"remark\":\"\",\"text\":\"各项准备\",\"webPath\":\"rpt/t_totareserve_tol.jsp\"}, {\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"88508\",\"qtip\":\"单位存款\",\"remark\":\"\",\"text\":\"单位存款\",\"webPath\":\"rpt/t_corpdepo_tol.jsp\"}], \"iconCls\":\"icon-folder\",\"id\":\"87748\",\"qtip\":\"资金来源\",\"remark\":\"\",\"text\":\"资金来源\",\"webPath\":\"\"},{\"children\":[{\"children\":[],\"iconCls\":\"icon-chartpie\", \"id\":\"89474\",\"qtip\":\"各项贷款\",\"remark\":\"\",\"text\":\"各项贷款\",\"webPath\":\"rpt/t_totaloan_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89485\", \"qtip\":\"有价证券\",\"remark\":\"\",\"text\":\"有价证券\",\"webPath\":\"rpt/t_securitie_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89588\",\"qtip\":\"股权及其他投资\", \"remark\":\"\",\"text\":\"股权及其他投资\",\"webPath\":\"rpt/t_equityotherinvest_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89599\",\"qtip\":\"应收及预付款\", \"remark\":\"\",\"text\":\"应收及预付款\",\"webPath\":\"rpt/t_resvableprepayment_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89610\",\"qtip\":\"买入返售资产\", \"remark\":\"\",\"text\":\"买入返售资产\",\"webPath\":\"rpt/t_buybackassetacquired_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89621\",\"qtip\":\"存放中央准备金存款\", \"remark\":\"\",\"text\":\"存放中央准备金存款\",\"webPath\":\"rpt/t_centbankreserve_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89632\",\"qtip\":\"存放中央银行特种存款\", \"remark\":\"\",\"text\":\"存放中央银行特种存款\",\"webPath\":\"rpt/t_centbankspecdepo_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89643\", \"qtip\":\"缴存中央银行财政性存款\",\"remark\":\"\",\"text\":\"缴存中央银行财政性存款\",\"webPath\":\"rpt/t_centbankfinsavdepo_tol.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\", \"id\":\"89654\",\"qtip\":\"同业往来（运用方）\",\"remark\":\"\",\"text\":\"同业往来（运用方）\",\"webPath\":\"rpt/t_tradcurracco_oper_tol.jsp\"},{\"children\":[], \"iconCls\":\"icon-chartpie\",\"id\":\"89665\",\"qtip\":\"系统内资金往来\",\"remark\":\"\",\"text\":\"系统内资金往来\",\"webPath\":\"rpt/t_sysfinaflow_oper_tol.jsp\"}, {\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89676\",\"qtip\":\"库存现金\",\"remark\":\"\",\"text\":\"库存现金\",\"webPath\":\"rpt/t_vaultcash_tol.jsp\"}, {\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89687\",\"qtip\":\"外汇买卖\",\"remark\":\"\",\"text\":\"外汇买卖\",\"webPath\":\"rpt/t_forextradespot_oper_tol.jsp\"}], \"iconCls\":\"icon-folder\",\"id\":\"87759\",\"qtip\":\"资金运用\",\"remark\":\"\",\"text\":\"资金运用\",\"webPath\":\"\"},{\"children\":[{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"87694\",\"qtip\":\"代理发债\",\"remark\":\"\",\"text\":\"代理发债\",\"webPath\":\"rpt/t_agencybonds.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"87695\", \"qtip\":\"应付信用证（进口开证）\",\"remark\":\"\",\"text\":\"应付信用证（进口开证）\",\"webPath\":\"rpt/t_lc_pay.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\", \"id\":\"87696\",\"qtip\":\"应付保函/备用证（保函/备用证开立）\",\"remark\":\"\",\"text\":\"应付保函/备用证（保函/备用证开立）\",\"webPath\":\"rpt/t_lgstandby_pay.jsp\"}, {\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"87697\",\"qtip\":\"信用证保兑（进口应付信用证加保）\",\"remark\":\"\",\"text\":\"信用证保兑（进口应付信用证加保）\", \"webPath\":\"rpt/t_lcconfirm_imp.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89736\",\"qtip\":\"应付银行承兑汇票\",\"remark\":\"\",\"text\":\"应付银行承兑汇票\", \"webPath\":\"rpt/t_bankaccepbill_pay.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89747\",\"qtip\":\"应收信用证（出口交单）\",\"remark\":\"\", \"text\":\"应收信用证（出口交单）\",\"webPath\":\"rpt/t_lc_resv.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89758\", \"qtip\":\"应收保函/备用证（保函通知，收到境外保函）\",\"remark\":\"\",\"text\":\"应收保函/备用证（保函通知，收到境外保函）\",\"webPath\":\"rpt/t_lgstandby_resv.jsp\"}, {\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89769\",\"qtip\":\"信用证保兑（出口应收信用证加保）\",\"remark\":\"\",\"text\":\"信用证保兑（出口应收信用证加保）\", \"webPath\":\"rpt/t_lcconfirm_exp.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89780\",\"qtip\":\"应收银行承兑汇票\",\"remark\":\"\",\"text\":\"应收银行承兑汇票\", \"webPath\":\"rpt/t_bankaccepbill_resv.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89791\",\"qtip\":\"远期结售汇\",\"remark\":\"\",\"text\":\"远期结售汇\", \"webPath\":\"rpt/t_fwdexeslt.jsp\"},{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"89802\",\"qtip\":\"汇率掉期业务（远期未交割部分）\",\"remark\":\"\", \"text\":\"汇率掉期业务（远期未交割部分）\",\"webPath\":\"rpt/t_currswaps.jsp\"}],\"iconCls\":\"icon-folder\",\"id\":\"87668\",\"qtip\":\"表外或其它（表外理财除外）\", \"remark\":\"\",\"text\":\"表外或其它（表外理财除外）\",\"webPath\":\"\"},{\"children\":[{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"92488\",\"qtip\":\"表外理财\", \"remark\":\"\",\"text\":\"表外理财\",\"webPath\":\"rpt/t_offsheetfin_tol.jsp\"}],\"iconCls\":\"icon-folder\",\"id\":\"87770\",\"qtip\":\"表外理财\",\"remark\":\"\",\"text\":\"表外理财\", \"webPath\":\"\"},{\"children\":[{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"90168\",\"qtip\":\"FTE、FTN、FTU 账户信息报送\",\"remark\":\"\", \"text\":\"FTE、FTN、FTU 账户信息报送\",\"webPath\":\"rpt/t_fte_acctinfo.jsp\"}],\"iconCls\":\"icon-folder\",\"id\":\"87781\",\"qtip\":\"账户信息报送\", \"remark\":\"\",\"text\":\"账户信息报送\",\"webPath\":\"\"},{\"children\":[],\"iconCls\":\"icon-arrowjoin\",\"id\":\"89199\",\"qtip\":\"数据生成报送反馈\",\"remark\":\"\", \"text\":\"数据生成报送反馈\",\"webPath\":\"rpt/t_publish.jsp\"},{\"children\":[{\"children\":[],\"iconCls\":\"icon-chartpie\",\"id\":\"92580\",\"qtip\":\"关联账户信息下发\", \"remark\":\"\",\"text\":\"关联账户信息下发\",\"webPath\":\"rpt/t_custinfoissue_resv.jsp\"}],\"iconCls\":\"icon-folder\",\"id\":\"92554\",\"qtip\":\"关联账户信息下发\", \"remark\":\"\",\"text\":\"关联账户信息下发\",\"webPath\":\"\"}]";
//		this.returnJson(retStr);
//	}
	

}
