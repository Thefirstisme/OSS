package com.topcheer.rpt.web;

import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONArray;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.jgb.utils.PoiCommon;
import com.topcheer.oss.utils.JsonUtil;
import com.topcheer.rpt.bo.TCentbankfinsavdepoDtl;
import com.topcheer.rpt.bo.TCentbankfinsavdepoTol;
import com.topcheer.rpt.service.TCentbankfinsavdepoDtlService;
import com.topcheer.rpt.service.TCentbankfinsavdepoTolService;
import com.topcheer.rpt.service.TpublishService;

public class TCentbankfinsavdepoDtlAction extends BaseAction{
	 private TpublishService tPublishService;
   private TCentbankfinsavdepoDtlService tCentbankfinsavdepoDtlService;
   private TCentbankfinsavdepoTolService tCentbankfinsavdepoTolService;

     public void settPublishService(TpublishService tPublishService) {
               this.tPublishService = tPublishService;
     }

     public void settCentbankfinsavdepoTolService(TCentbankfinsavdepoTolService tCentbankfinsavdepoTolService) {
               this.tCentbankfinsavdepoTolService = tCentbankfinsavdepoTolService;
     }

	public void settCentbankfinsavdepoDtlService(TCentbankfinsavdepoDtlService tCentbankfinsavdepoDtlService) {
		this.tCentbankfinsavdepoDtlService = tCentbankfinsavdepoDtlService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TCentbankfinsavdepoDtl> entList=(List<TCentbankfinsavdepoDtl>)tCentbankfinsavdepoDtlService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tCentbankfinsavdepoDtlService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tCentbankfinsavdepoDtlService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tCentbankfinsavdepoDtlService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("缴存中央银行财政性存款-明细%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("缴存中央银行财政性存款-明细",colList.split(";"),list,fos);
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
		TCentbankfinsavdepoDtl obj = new TCentbankfinsavdepoDtl();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("detailSeq"));
		TCentbankfinsavdepoDtl oldObj=tCentbankfinsavdepoDtlService.getTCentbankfinsavdepoDtl(oblkeyId);
		if(oldObj!=null && oldObj.getAcctId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条缴存中央银行财政性存款-明细: 失败");
		}else{
		obj.setAcctId(this.getStringParameter("acctId"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setDetailSeq(tPublishService.getDtlSeq("T_CentBankFinSavDepo_Dtl", obj.getAcctId(), DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
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
		//obj.setYieldRate(this.getStringParameter("yieldRate"));
		String yieldRate = this.getStringParameter("yieldRate");
		if(StringUtils.isNotEmpty(yieldRate)){
			obj.setYieldRate(new BigDecimal(yieldRate));
		}
		
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setIfNeedChange("2");
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tCentbankfinsavdepoDtlService.addTCentbankfinsavdepoDtl(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条缴存中央银行财政性存款-明细：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条缴存中央银行财政性存款-明细: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tCentbankfinsavdepoDtlService.delTCentbankfinsavdepoDtl(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条缴存中央银行财政性存款-明细：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条缴存中央银行财政性存款-明细：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TCentbankfinsavdepoDtl ent = tCentbankfinsavdepoDtlService.getTCentbankfinsavdepoDtl(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TCentbankfinsavdepoDtl obj = tCentbankfinsavdepoDtlService.getTCentbankfinsavdepoDtl(seq);
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
		//obj.setYieldRate(this.getStringParameter("yieldRate"));
		String yieldRate = this.getStringParameter("yieldRate");
		if(StringUtils.isNotEmpty(yieldRate)){
			obj.setYieldRate(new BigDecimal(yieldRate));
		}
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setIfNeedChange("2");
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tCentbankfinsavdepoDtlService.setTCentbankfinsavdepoDtl(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条缴存中央银行财政性存款-明细：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条缴存中央银行财政性存款-明细：失败");
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
			TCentbankfinsavdepoTol obj = tCentbankfinsavdepoTolService.getTCentbankfinsavdepoTol(seq);
			obj.setIfchecked("1");
			int result=tCentbankfinsavdepoTolService.setTCentbankfinsavdepoTol(obj);
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
