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
import com.topcheer.rpt.bo.TAccopayatempDtl;
import com.topcheer.rpt.bo.TAccopayatempTol;
import com.topcheer.rpt.service.TAccopayatempDtlService;
import com.topcheer.rpt.service.TAccopayatempTolService;
import com.topcheer.rpt.service.TpublishService;

public class TAccopayatempDtlAction extends BaseAction{
	 private TpublishService tPublishService;
   private TAccopayatempDtlService tAccopayatempDtlService;
   private TAccopayatempTolService tAccopayatempTolService;

     public void settPublishService(TpublishService tPublishService) {
               this.tPublishService = tPublishService;
     }

     public void settAccopayatempTolService(TAccopayatempTolService tAccopayatempTolService) {
               this.tAccopayatempTolService = tAccopayatempTolService;
     }

	public void settAccopayatempDtlService(TAccopayatempDtlService tAccopayatempDtlService) {
		this.tAccopayatempDtlService = tAccopayatempDtlService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TAccopayatempDtl> entList=(List<TAccopayatempDtl>)tAccopayatempDtlService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tAccopayatempDtlService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tAccopayatempDtlService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tAccopayatempDtlService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("应付及暂收款-明细%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("应付及暂收款-明细",colList.split(";"),list,fos);
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
		TAccopayatempDtl obj = new TAccopayatempDtl();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("detailSeq"),this.getStringParameter("currencyCd"),this.getStringParameter("belongOrgId"));
		TAccopayatempDtl oldObj=tAccopayatempDtlService.getTAccopayatempDtl(oblkeyId);
		if(oldObj!=null && oldObj.getAcctId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条应付及暂收款-明细: 失败");
		}else{
		obj.setAcctId(this.getStringParameter("acctId"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setDetailSeq(tPublishService.getDtlSeq("T_AccoPayaTemp_Dtl", obj.getAcctId(), DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		obj.setAcctingDt(DateUtil.string2Date(this.getStringParameter("acctingDt"), DateUtil.FORMAT_DATE));
		obj.setOrigTxnDt(DateUtil.string2Date(this.getStringParameter("origTxnDt"), DateUtil.FORMAT_DATE));
		//zoobj.setBal(this.getStringParameter("bal"));
		String bal = this.getStringParameter("bal");
		if(StringUtils.isNotEmpty(bal)){
			obj.setBal(new BigDecimal(bal));
		}

		obj.setOppositeName(this.getStringParameter("oppositeName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setOppositeCountryCd(this.getStringParameter("oppositeCountryCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setCreateUser(this.getStringParameter("userId"));
		obj.setNbId(this.getStringParameter("nbId"));
		obj.setIfNeedChange("2");
		int result=tAccopayatempDtlService.addTAccopayatempDtl(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条应付及暂收款-明细：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条应付及暂收款-明细: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tAccopayatempDtlService.delTAccopayatempDtl(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条应付及暂收款-明细：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条应付及暂收款-明细：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TAccopayatempDtl ent = tAccopayatempDtlService.getTAccopayatempDtl(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TAccopayatempDtl obj = tAccopayatempDtlService.getTAccopayatempDtl(seq);
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		obj.setAcctingDt(DateUtil.string2Date(this.getStringParameter("acctingDt"), DateUtil.FORMAT_DATE));
		obj.setOrigTxnDt(DateUtil.string2Date(this.getStringParameter("origTxnDt"), DateUtil.FORMAT_DATE));
		//obj.setBal(this.getStringParameter("bal"));
		String bal = this.getStringParameter("bal");
		if(StringUtils.isNotEmpty(bal)){
			obj.setBal(new BigDecimal(bal));
		}
		obj.setOppositeName(this.getStringParameter("oppositeName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setOppositeCountryCd(this.getStringParameter("oppositeCountryCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setModifiedUser(this.getStringParameter("userId"));
		obj.setNbId(this.getStringParameter("nbId"));
		obj.setIfNeedChange("2");
			int result=tAccopayatempDtlService.setTAccopayatempDtl(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条应付及暂收款-明细：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条应付及暂收款-明细：失败");
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
			TAccopayatempTol obj = tAccopayatempTolService.getTAccopayatempTol(seq);
			obj.setIfchecked("1");
			int result=tAccopayatempTolService.setTAccopayatempTol(obj);
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
