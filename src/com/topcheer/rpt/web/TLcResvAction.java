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
import com.topcheer.rpt.bo.TLcResv;
import com.topcheer.rpt.service.TLcResvService;
import com.topcheer.rpt.service.TpublishService;

public class TLcResvAction extends BaseAction{

	private TLcResvService tLcResvService;

	private TpublishService tPublishService;

    public void settPublishService(TpublishService tPublishService) {
              this.tPublishService = tPublishService;
    }
    
	public void settLcResvService(TLcResvService tLcResvService) {
		this.tLcResvService = tLcResvService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TLcResv> entList=(List<TLcResv>)tLcResvService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tLcResvService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tLcResvService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tLcResvService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("应收信用证（出口交单）%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("应收信用证（出口交单）",colList.split(";"),list,fos);
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
		TLcResv obj = new TLcResv();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("reportId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("declareSeq"));
		TLcResv oldObj=tLcResvService.getTLcResv(oblkeyId);
		if(oldObj!=null && oldObj.getReportId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条应收信用证（出口交单）: 失败");
		}else{
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setDeclareSeq(tPublishService.getDeclareSeq("T_Lc_Resv",obj.getReportId(),DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		//obj.setBal(this.getStringParameter("bal"));
		String bal = this.getStringParameter("bal");
		if(StringUtils.isNotEmpty(bal)){
			obj.setBal(new BigDecimal(bal));
		}		
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setAbroadOppBankId(this.getStringParameter("abroadOppBankId"));
		obj.setBenefCorpNm(this.getStringParameter("benefCorpNm"));
		obj.setBenefCorpOrgId(this.getStringParameter("benefCorpOrgId"));
		obj.setBenefCountryCd(this.getStringParameter("benefCountryCd"));
		obj.setBenefDomeAreaCd(this.getStringParameter("benefDomeAreaCd"));
		obj.setBisMatureDt(DateUtil.string2Date(this.getStringParameter("bisMatureDt"), DateUtil.FORMAT_DATE));
		obj.setLcMatureDt(DateUtil.string2Date(this.getStringParameter("lcMatureDt"), DateUtil.FORMAT_DATE));
		obj.setPeriodCon(this.getStringParameter("periodCon"));
		obj.setPeriodLen(this.getStringParameter("periodLen"));
		obj.setPeriodUnit(this.getStringParameter("periodUnit"));
		obj.setIfNeedChange("2");
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tLcResvService.addTLcResv(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条应收信用证（出口交单）：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条应收信用证（出口交单）: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tLcResvService.delTLcResv(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条应收信用证（出口交单）：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条应收信用证（出口交单）：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TLcResv ent = tLcResvService.getTLcResv(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TLcResv obj = tLcResvService.getTLcResv(seq);
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		//obj.setBal(this.getStringParameter("bal"));
		String bal = this.getStringParameter("bal");
		if(StringUtils.isNotEmpty(bal)){
			obj.setBal(new BigDecimal(bal));
		}		
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setAbroadOppBankId(this.getStringParameter("abroadOppBankId"));
		obj.setBenefCorpNm(this.getStringParameter("benefCorpNm"));
		obj.setBenefCorpOrgId(this.getStringParameter("benefCorpOrgId"));
		obj.setBenefCountryCd(this.getStringParameter("benefCountryCd"));
		obj.setBenefDomeAreaCd(this.getStringParameter("benefDomeAreaCd"));
		obj.setBisMatureDt(DateUtil.string2Date(this.getStringParameter("bisMatureDt"), DateUtil.FORMAT_DATE));
		obj.setLcMatureDt(DateUtil.string2Date(this.getStringParameter("lcMatureDt"), DateUtil.FORMAT_DATE));
		obj.setPeriodCon(this.getStringParameter("periodCon"));
		obj.setPeriodLen(this.getStringParameter("periodLen"));
		obj.setPeriodUnit(this.getStringParameter("periodUnit"));
		obj.setIfNeedChange("2");
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tLcResvService.setTLcResv(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条应收信用证（出口交单）：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条应收信用证（出口交单）：失败");
		}
		}
	}
}
