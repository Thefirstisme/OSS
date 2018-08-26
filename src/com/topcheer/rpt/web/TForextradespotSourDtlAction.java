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
import com.topcheer.rpt.bo.TForextradespotSourDtl;
import com.topcheer.rpt.bo.TForextradespotSourTol;
import com.topcheer.rpt.service.TForextradespotSourDtlService;
import com.topcheer.rpt.service.TForextradespotSourTolService;
import com.topcheer.rpt.service.TpublishService;

public class TForextradespotSourDtlAction extends BaseAction{
	 private TpublishService tPublishService;
   private TForextradespotSourDtlService tForextradespotSourDtlService;
   private TForextradespotSourTolService tForextradespotSourTolService;

     public void settPublishService(TpublishService tPublishService) {
               this.tPublishService = tPublishService;
     }

     public void settForextradespotSourTolService(TForextradespotSourTolService tForextradespotSourTolService) {
               this.tForextradespotSourTolService = tForextradespotSourTolService;
     }

	public void settForextradespotSourDtlService(TForextradespotSourDtlService tForextradespotSourDtlService) {
		this.tForextradespotSourDtlService = tForextradespotSourDtlService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TForextradespotSourDtl> entList=(List<TForextradespotSourDtl>)tForextradespotSourDtlService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tForextradespotSourDtlService.getPageRowCount(filterString.toString());
		returnJson(true, entList,  total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tForextradespotSourDtlService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tForextradespotSourDtlService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("外汇买卖（即期）-明细%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("外汇买卖（即期）-明细",colList.split(";"),list,fos);
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
		TForextradespotSourDtl obj = new TForextradespotSourDtl();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("detailSeq"));
		TForextradespotSourDtl oldObj=tForextradespotSourDtlService.getTForextradespotSourDtl(oblkeyId);
		if(oldObj!=null && oldObj.getAcctId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条外汇买卖（即期）-明细: 失败");
		}else{
		obj.setAcctId(this.getStringParameter("acctId"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setDetailSeq(tPublishService.getDtlSeq("T_FOREXTradeSpot_Sour_Dtl", obj.getAcctId(), DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		obj.setAcctingDt(DateUtil.string2Date(this.getStringParameter("acctingDt"), DateUtil.FORMAT_DATE));
		obj.setOrigTxnDt(DateUtil.string2Date(this.getStringParameter("origTxnDt"), DateUtil.FORMAT_DATE));
		obj.setFxTradeType(this.getStringParameter("fxTradeType"));
		obj.setBuyCurrency(this.getStringParameter("buyCurrency"));
		//obj.setBuyAmt(this.getStringParameter("buyAmt"));
		String buyAmt = this.getStringParameter("buyAmt");
		if(StringUtils.isNotEmpty(buyAmt)){
			obj.setBuyAmt(new BigDecimal(buyAmt));
		}
		//obj.setBuyPrc(this.getStringParameter("buyPrc"));
		String buyPrc = this.getStringParameter("buyPrc");
		if(StringUtils.isNotEmpty(buyPrc)){
			obj.setBuyPrc(new BigDecimal(buyPrc));
		}
		obj.setSellCurrency(this.getStringParameter("sellCurrency"));
		//obj.setSellAmt(this.getStringParameter("sellAmt"));
		String sellAmt = this.getStringParameter("sellAmt");
		if(StringUtils.isNotEmpty(sellAmt)){
			obj.setSellAmt(new BigDecimal(sellAmt));
		}
		//obj.setSellPrc(this.getStringParameter("sellPrc"));
		String sellPrc = this.getStringParameter("sellPrc");
		if(StringUtils.isNotEmpty(sellPrc)){
			obj.setSellPrc(new BigDecimal(sellPrc));
		}
		//obj.setDeliverydate(DateUtil.string2Date(this.getStringParameter("deliverydate"), DateUtil.FORMAT_DATE));
		obj.setOppositeAcctno(this.getStringParameter("oppositeAcctno"));
		obj.setOppositeAcctName(this.getStringParameter("oppositeAcctName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setIfNeedChange("2");
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tForextradespotSourDtlService.addTForextradespotSourDtl(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条外汇买卖（即期）-明细：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条外汇买卖（即期）-明细: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tForextradespotSourDtlService.delTForextradespotSourDtl(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条外汇买卖（即期）-明细：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条外汇买卖（即期）-明细：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TForextradespotSourDtl ent = tForextradespotSourDtlService.getTForextradespotSourDtl(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TForextradespotSourDtl obj = tForextradespotSourDtlService.getTForextradespotSourDtl(seq);
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		obj.setAcctingDt(DateUtil.string2Date(this.getStringParameter("acctingDt"), DateUtil.FORMAT_DATE));
		obj.setOrigTxnDt(DateUtil.string2Date(this.getStringParameter("origTxnDt"), DateUtil.FORMAT_DATE));
		obj.setFxTradeType(this.getStringParameter("fxTradeType"));
		obj.setBuyCurrency(this.getStringParameter("buyCurrency"));
		//obj.setBuyAmt(this.getStringParameter("buyAmt"));
		String buyAmt = this.getStringParameter("buyAmt");
		if(StringUtils.isNotEmpty(buyAmt)){
			obj.setBuyAmt(new BigDecimal(buyAmt));
		}
		//obj.setBuyPrc(this.getStringParameter("buyPrc"));
		String buyPrc = this.getStringParameter("buyPrc");
		if(StringUtils.isNotEmpty(buyPrc)){
			obj.setBuyPrc(new BigDecimal(buyPrc));
		}
		obj.setSellCurrency(this.getStringParameter("sellCurrency"));
		//obj.setSellAmt(this.getStringParameter("sellAmt"));
		String sellAmt = this.getStringParameter("sellAmt");
		if(StringUtils.isNotEmpty(sellAmt)){
			obj.setSellAmt(new BigDecimal(sellAmt));
		}
		//obj.setSellPrc(this.getStringParameter("sellPrc"));
		String sellPrc = this.getStringParameter("sellPrc");
		if(StringUtils.isNotEmpty(sellPrc)){
			obj.setSellPrc(new BigDecimal(sellPrc));
		}
		//obj.setDeliverydate(DateUtil.string2Date(this.getStringParameter("deliverydate"), DateUtil.FORMAT_DATE));
		obj.setOppositeAcctno(this.getStringParameter("oppositeAcctno"));
		obj.setOppositeAcctName(this.getStringParameter("oppositeAcctName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setIfNeedChange("2");
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tForextradespotSourDtlService.setTForextradespotSourDtl(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条外汇买卖（即期）-明细：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条外汇买卖（即期）-明细：失败");
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
			TForextradespotSourTol obj = tForextradespotSourTolService.getTForextradespotSourTol(seq);
			obj.setIfchecked("1");
			int result=tForextradespotSourTolService.setTForextradespotSourTol(obj);
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
