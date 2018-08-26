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
import com.topcheer.rpt.bo.TBorrcentbankTol;
import com.topcheer.rpt.service.TBorrcentbankDtlService;
import com.topcheer.rpt.service.TBorrcentbankTolService;
import com.topcheer.rpt.service.TpublishService;

public class TBorrcentbankTolAction extends BaseAction{
	 private TpublishService tPublishService;
   private TBorrcentbankTolService tBorrcentbankTolService;
   private TBorrcentbankDtlService tBorrcentbankDtlService;

     public void settPublishService(TpublishService tPublishService) {
               this.tPublishService = tPublishService;
     }

     public void settBorrcentbankDtlService(TBorrcentbankDtlService tBorrcentbankDtlService) {
               this.tBorrcentbankDtlService = tBorrcentbankDtlService;
     }

	public void settBorrcentbankTolService(TBorrcentbankTolService tBorrcentbankTolService) {
		this.tBorrcentbankTolService = tBorrcentbankTolService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TBorrcentbankTol> entList=(List<TBorrcentbankTol>)tBorrcentbankTolService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tBorrcentbankTolService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tBorrcentbankTolService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tBorrcentbankTolService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("向中央银行借款-汇总%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("向中央银行借款-汇总",colList.split(";"),list,fos);
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
		TBorrcentbankTol obj = new TBorrcentbankTol();
		String oblkeyId=String.format("%1$s_%2$s", this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2));
		TBorrcentbankTol oldObj=tBorrcentbankTolService.getTBorrcentbankTol(oblkeyId);
		if(oldObj!=null && oldObj.getAcctId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条向中央银行借款-汇总: 失败");
		}else{
		obj.setAcctId(this.getStringParameter("acctId"));
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		//obj.setDayBalFill(this.getStringParameter("dayBalFill"));
		String dayBalFill = this.getStringParameter("dayBalFill");
		if(StringUtils.isNotEmpty(dayBalFill)){
			obj.setDayBalFill(new BigDecimal(dayBalFill));
		}
		obj.setBalanceCd(this.getStringParameter("balanceCd"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setTolRecord(this.getStringParameter("tolRecord"));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setIfchecked(this.getStringParameter("ifchecked"));
		obj.setCreateUser(this.getStringParameter("userId")) ;
		obj.setIfNeedChange("2");
		int result=tBorrcentbankTolService.addTBorrcentbankTol(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条向中央银行借款-汇总：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条向中央银行借款-汇总: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tBorrcentbankTolService.delTBorrcentbankTol(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条向中央银行借款-汇总：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条向中央银行借款-汇总：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TBorrcentbankTol ent = tBorrcentbankTolService.getTBorrcentbankTol(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TBorrcentbankTol obj = tBorrcentbankTolService.getTBorrcentbankTol(seq);
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		//obj.setDayBalFill(this.getStringParameter("dayBalFill"));
		String dayBalFill = this.getStringParameter("dayBalFill");
		if(StringUtils.isNotEmpty(dayBalFill)){
			obj.setDayBalFill(new BigDecimal(dayBalFill));
		}
		obj.setBalanceCd(this.getStringParameter("balanceCd"));
		obj.setTolRecord(this.getStringParameter("tolRecord"));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setIfchecked(this.getStringParameter("ifchecked"));
		obj.setModifiedUser(this.getStringParameter("userId"));
		obj.setIfNeedChange("2");
			int result=tBorrcentbankTolService.setTBorrcentbankTol(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条向中央银行借款-汇总：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条向中央银行借款-汇总：失败");
		}
		}
	}
}
