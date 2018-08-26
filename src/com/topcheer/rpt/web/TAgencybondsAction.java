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
import com.topcheer.rpt.bo.TAgencybonds;
import com.topcheer.rpt.service.TAgencybondsService;
import com.topcheer.rpt.service.TpublishService;
 
public class TAgencybondsAction extends BaseAction{

	private TAgencybondsService tAgencybondsService;

	 private TpublishService tPublishService;

     public void settPublishService(TpublishService tPublishService) {
               this.tPublishService = tPublishService;
     }
     
	public void settAgencybondsService(TAgencybondsService tAgencybondsService) {
		this.tAgencybondsService = tAgencybondsService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TAgencybonds> entList=(List<TAgencybonds>)tAgencybondsService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tAgencybondsService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tAgencybondsService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tAgencybondsService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("代理发债%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("代理发债",colList.split(";"),list,fos);
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
		TAgencybonds obj = new TAgencybonds();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("reportId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("declareSeq"));
		TAgencybonds oldObj=tAgencybondsService.getTAgencybonds(oblkeyId);
		if(oldObj!=null && oldObj.getReportId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条代理发债: 失败");
		}else{
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setBondId(this.getStringParameter("bondId"));
		obj.setBondNm(this.getStringParameter("bondNm"));
		obj.setIssuCorpAcct(this.getStringParameter("issuCorpAcct"));
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setTxnOrgId(this.getStringParameter("txnOrgId"));
		obj.setSltDt(DateUtil.string2Date(this.getStringParameter("sltDt"), DateUtil.FORMAT_DATE));
		obj.setPeriodLen(this.getStringParameter("periodLen"));
		obj.setPeriodUnit(this.getStringParameter("periodUnit"));
		obj.setMatureDt(DateUtil.string2Date(this.getStringParameter("matureDt"), DateUtil.FORMAT_DATE));
		//obj.setNobondsissued(this.getStringParameter("nobondsissued"));
		String nobondsissued = this.getStringParameter("nobondsissued");
		if(StringUtils.isNotEmpty(nobondsissued)){
			obj.setNobondsissued(new BigDecimal(nobondsissued));
		}
		
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setRateType(this.getStringParameter("rateType"));
		//obj.setFixRate(this.getStringParameter("fixRate"));
		String fixRate = this.getStringParameter("fixRate");
		if(StringUtils.isNotEmpty(fixRate)){
			obj.setFixRate(new BigDecimal(fixRate));
		}
		
		obj.setPriceDatum(this.getStringParameter("priceDatum"));
		//obj.setFloatSpread(this.getStringParameter("floatSpread"));
		String floatSpread = this.getStringParameter("floatSpread");
		if(StringUtils.isNotEmpty(floatSpread)){
			obj.setFloatSpread(new BigDecimal(floatSpread));
		}
		
		obj.setDeclareSeq(tPublishService.getDeclareSeq("T_AgencyBonds",obj.getReportId(),DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
		obj.setCreateUser(this.getStringParameter("userId")) ;
		obj.setIfNeedChange("2");
		int result=tAgencybondsService.addTAgencybonds(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条代理发债：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条代理发债: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tAgencybondsService.delTAgencybonds(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条代理发债：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条代理发债：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TAgencybonds ent = tAgencybondsService.getTAgencybonds(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TAgencybonds obj = tAgencybondsService.getTAgencybonds(seq);
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setBondId(this.getStringParameter("bondId"));
		obj.setBondNm(this.getStringParameter("bondNm"));
		obj.setIssuCorpAcct(this.getStringParameter("issuCorpAcct"));
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setTxnOrgId(this.getStringParameter("txnOrgId"));
		obj.setSltDt(DateUtil.string2Date(this.getStringParameter("sltDt"), DateUtil.FORMAT_DATE));
		obj.setPeriodLen(this.getStringParameter("periodLen"));
		obj.setPeriodUnit(this.getStringParameter("periodUnit"));
		obj.setMatureDt(DateUtil.string2Date(this.getStringParameter("matureDt"), DateUtil.FORMAT_DATE));
		//obj.setNobondsissued(this.getStringParameter("nobondsissued"));
		String nobondsissued = this.getStringParameter("nobondsissued");
		if(StringUtils.isNotEmpty(nobondsissued)){
			obj.setNobondsissued(new BigDecimal(nobondsissued));
		}
		
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setRateType(this.getStringParameter("rateType"));
		//obj.setFixRate(this.getStringParameter("fixRate"));
		String fixRate = this.getStringParameter("fixRate");
		if(StringUtils.isNotEmpty(fixRate)){
			obj.setFixRate(new BigDecimal(fixRate));
		}
		obj.setPriceDatum(this.getStringParameter("priceDatum"));
		//obj.setFloatSpread(this.getStringParameter("floatSpread"));
		String floatSpread = this.getStringParameter("floatSpread");
		if(StringUtils.isNotEmpty(floatSpread)){
			obj.setFloatSpread(new BigDecimal(floatSpread));
		}
		obj.setIfNeedChange("2");
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tAgencybondsService.setTAgencybonds(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条代理发债：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条代理发债：失败");
		}
		}
	}
}
