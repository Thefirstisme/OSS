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
import com.topcheer.rpt.bo.TBankaccepbillResv;
import com.topcheer.rpt.service.TBankaccepbillResvService;
import com.topcheer.rpt.service.TpublishService;

public class TBankaccepbillResvAction extends BaseAction{

	private TBankaccepbillResvService tBankaccepbillResvService;

	private TpublishService tPublishService;

    public void settPublishService(TpublishService tPublishService) {
              this.tPublishService = tPublishService;
    }
    
	public void settBankaccepbillResvService(TBankaccepbillResvService tBankaccepbillResvService) {
		this.tBankaccepbillResvService = tBankaccepbillResvService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TBankaccepbillResv> entList=(List<TBankaccepbillResv>)tBankaccepbillResvService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tBankaccepbillResvService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tBankaccepbillResvService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tBankaccepbillResvService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("应收银行承兑汇票%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("应收银行承兑汇票",colList.split(";"),list,fos);
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
		TBankaccepbillResv obj = new TBankaccepbillResv();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("reportId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("declareSeq"));
		TBankaccepbillResv oldObj=tBankaccepbillResvService.getTBankaccepbillResv(oblkeyId);
		if(oldObj!=null && oldObj.getReportId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条应收银行承兑汇票: 失败");
		}else{
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setDeclareSeq(tPublishService.getDeclareSeq("T_BankAccepBill_Resv",obj.getReportId(),DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
		obj.setCollDt(DateUtil.string2Date(this.getStringParameter("collDt"), DateUtil.FORMAT_DATE));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setAcptMatureDt(DateUtil.string2Date(this.getStringParameter("acptMatureDt"), DateUtil.FORMAT_DATE));
		//obj.setAcptAmt(this.getStringParameter("acptAmt"));
		String acptAmt = this.getStringParameter("acptAmt");
		if(StringUtils.isNotEmpty(acptAmt)){
			obj.setAcptAmt(new BigDecimal(acptAmt));
		}
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setAcptOrgNm(this.getStringParameter("acptOrgNm"));
		obj.setAcptOrgId(this.getStringParameter("acptOrgId"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setIfNeedChange("2");
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tBankaccepbillResvService.addTBankaccepbillResv(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条应收银行承兑汇票：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条应收银行承兑汇票: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tBankaccepbillResvService.delTBankaccepbillResv(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条应收银行承兑汇票：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条应收银行承兑汇票：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TBankaccepbillResv ent = tBankaccepbillResvService.getTBankaccepbillResv(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TBankaccepbillResv obj = tBankaccepbillResvService.getTBankaccepbillResv(seq);
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setCollDt(DateUtil.string2Date(this.getStringParameter("collDt"), DateUtil.FORMAT_DATE));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setAcptMatureDt(DateUtil.string2Date(this.getStringParameter("acptMatureDt"), DateUtil.FORMAT_DATE));
		//obj.setAcptAmt(this.getStringParameter("acptAmt"));
		String acptAmt = this.getStringParameter("acptAmt");
		if(StringUtils.isNotEmpty(acptAmt)){
			obj.setAcptAmt(new BigDecimal(acptAmt));
		}
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setAcptOrgNm(this.getStringParameter("acptOrgNm"));
		obj.setAcptOrgId(this.getStringParameter("acptOrgId"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setIfNeedChange("2");
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tBankaccepbillResvService.setTBankaccepbillResv(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条应收银行承兑汇票：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条应收银行承兑汇票：失败");
		}
		}
	}
}
