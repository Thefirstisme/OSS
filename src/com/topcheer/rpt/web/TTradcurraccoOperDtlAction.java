package com.topcheer.rpt.web;

import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.jgb.utils.PoiCommon;
import com.topcheer.oss.utils.JsonUtil;
import com.topcheer.rpt.bo.TTradcurraccoOperDtl;
import com.topcheer.rpt.bo.TTradcurraccoOperTol;
import com.topcheer.rpt.service.TTradcurraccoOperDtlService;
import com.topcheer.rpt.service.TTradcurraccoOperTolService;
import com.topcheer.rpt.service.TpublishService;

public class TTradcurraccoOperDtlAction extends BaseAction{
	 private TpublishService tPublishService;
   private TTradcurraccoOperDtlService tTradcurraccoOperDtlService;
   private TTradcurraccoOperTolService tTradcurraccoOperTolService;

     public void settPublishService(TpublishService tPublishService) {
               this.tPublishService = tPublishService;
     }

     public void settTradcurraccoOperTolService(TTradcurraccoOperTolService tTradcurraccoOperTolService) {
               this.tTradcurraccoOperTolService = tTradcurraccoOperTolService;
     }

	public void settTradcurraccoOperDtlService(TTradcurraccoOperDtlService tTradcurraccoOperDtlService) {
		this.tTradcurraccoOperDtlService = tTradcurraccoOperDtlService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TTradcurraccoOperDtl> entList=(List<TTradcurraccoOperDtl>)tTradcurraccoOperDtlService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tTradcurraccoOperDtlService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tTradcurraccoOperDtlService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tTradcurraccoOperDtlService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("同业往来（运用方）-明细%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("同业往来（运用方）-明细",colList.split(";"),list,fos);
			fos.close();
			if(!downFileName.isEmpty()){
				this.returnJson(true, downFileName);
				this.log_act.log("下载文件："+downFileName);
			}else{
				this.returnJson(false, "文件生成错误！");
			}
			}else if(total>65534){
				this.returnJson(false, "导出数据过大，请增加查询条件，查询后再导出！");
			}else{
				this.returnJson(false, "没有可导出的数据,请查询后再导出！");
		}
	}

	public void toAdd() throws Exception{
		TTradcurraccoOperDtl obj = new TTradcurraccoOperDtl();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("detailSeq"));
		TTradcurraccoOperDtl oldObj=tTradcurraccoOperDtlService.getTTradcurraccoOperDtl(oblkeyId);
		if(oldObj!=null && oldObj.getAcctId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条同业往来（运用方）-明细: 失败");
		}else{
		obj.setAcctId(this.getStringParameter("acctId"));
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setDetailSeq(tPublishService.getDtlSeq("T_TradCurrAcco_Oper_Dtl", obj.getAcctId(), DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		obj.setAcctDt(DateUtil.string2Date(this.getStringParameter("acctDt"), DateUtil.FORMAT_DATE));
		obj.setOrigTxnDt(DateUtil.string2Date(this.getStringParameter("origTxnDt"), DateUtil.FORMAT_DATE));
		//obj.setBal(this.getStringParameter("bal"));
		String bal = this.getStringParameter("bal");
		if(StringUtils.isNotEmpty(bal)){
			obj.setBal(new BigDecimal(bal));
		}		
		obj.setPeriodLen(this.getStringParameter("periodLen"));
		obj.setPeriodUnit(this.getStringParameter("periodUnit"));
		obj.setIntStartDt(DateUtil.string2Date(this.getStringParameter("intStartDt"), DateUtil.FORMAT_DATE));
		obj.setMatureDt(DateUtil.string2Date(this.getStringParameter("matureDt"), DateUtil.FORMAT_DATE));
		//obj.setRate(this.getStringParameter("rate"));
		String rate = this.getStringParameter("rate");
		if(StringUtils.isNotEmpty(rate)){
			obj.setRate(new BigDecimal(rate));
		}
		obj.setOppositeAcctno(this.getStringParameter("oppositeAcctno"));
		obj.setOppositeAcctName(this.getStringParameter("oppositeAcctName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setIfNeedChange("2");
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tTradcurraccoOperDtlService.addTTradcurraccoOperDtl(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条同业往来（运用方）-明细：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条同业往来（运用方）-明细: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tTradcurraccoOperDtlService.delTTradcurraccoOperDtl(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条同业往来（运用方）-明细：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条同业往来（运用方）-明细：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TTradcurraccoOperDtl ent = tTradcurraccoOperDtlService.getTTradcurraccoOperDtl(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TTradcurraccoOperDtl obj = tTradcurraccoOperDtlService.getTTradcurraccoOperDtl(seq);
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		obj.setAcctDt(DateUtil.string2Date(this.getStringParameter("acctDt"), DateUtil.FORMAT_DATE));
		obj.setOrigTxnDt(DateUtil.string2Date(this.getStringParameter("origTxnDt"), DateUtil.FORMAT_DATE));
		//obj.setBal(this.getStringParameter("bal"));
		String bal = this.getStringParameter("bal");
		if(StringUtils.isNotEmpty(bal)){
			obj.setBal(new BigDecimal(bal));
		}		
		obj.setPeriodLen(this.getStringParameter("periodLen"));
		obj.setPeriodUnit(this.getStringParameter("periodUnit"));
		obj.setIntStartDt(DateUtil.string2Date(this.getStringParameter("intStartDt"), DateUtil.FORMAT_DATE));
		obj.setMatureDt(DateUtil.string2Date(this.getStringParameter("matureDt"), DateUtil.FORMAT_DATE));
		//obj.setRate(this.getStringParameter("rate"));
		String rate = this.getStringParameter("rate");
		if(StringUtils.isNotEmpty(rate)){
			obj.setRate(new BigDecimal(rate));
		}
		obj.setOppositeAcctno(this.getStringParameter("oppositeAcctno"));
		obj.setOppositeAcctName(this.getStringParameter("oppositeAcctName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setIfNeedChange("2");
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tTradcurraccoOperDtlService.setTTradcurraccoOperDtl(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条同业往来（运用方）-明细：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条同业往来（运用方）-明细：失败");
		}
		}
	}
	/**
	 * 检查是否有未确认上报的数据
	 * 
	 * @throws Exception
	 */
	public void getIfCheckDtlCount() throws Exception {
		String tableName = this.getStringParameter("tableName");
 		String dtlPK = this.getStringParameter("dtlPK");
		int IfCheckEdCount = tPublishService.getIfCheckDtlCount(tableName, dtlPK);
		this.returnJson(IfCheckEdCount + "");
	}
	/**
	 * 上报明细
	 * @throws Exception
	 */
	public void toShangBaoDtl() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TTradcurraccoOperTol obj = tTradcurraccoOperTolService.getTTradcurraccoOperTol(seq);
			obj.setIfchecked("1");
			int result=tTradcurraccoOperTolService.setTTradcurraccoOperTol(obj);
			if(result>0){
				this.returnJson(true, "上报明细成功！");
				this.log_act.log("上报明细: 成功");
			}else{
				this.returnJson(false, "上报明细失败！");
				this.log_act.log("上报明细：失败");
			}
		}
	}
	
}
