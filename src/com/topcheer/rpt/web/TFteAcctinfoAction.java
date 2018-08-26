package com.topcheer.rpt.web;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.util.List;

import net.sf.json.JSONArray;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.jgb.utils.PoiCommon;
import com.topcheer.oss.utils.JsonUtil;
import com.topcheer.rpt.bo.TFteAcctinfo;
import com.topcheer.rpt.service.TFteAcctinfoService;
import com.topcheer.rpt.service.TpublishService;

public class TFteAcctinfoAction extends BaseAction{

	private TpublishService tPublishService;
	private TFteAcctinfoService tFteAcctinfoService;

	public void settPublishService(TpublishService tPublishService) {
		this.tPublishService = tPublishService;
	}

	public void settFteAcctinfoService(TFteAcctinfoService tFteAcctinfoService) {
		this.tFteAcctinfoService = tFteAcctinfoService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TFteAcctinfo> entList=(List<TFteAcctinfo>)tFteAcctinfoService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tFteAcctinfoService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tFteAcctinfoService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tFteAcctinfoService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("",colList.split(";"),list,fos);
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
		TFteAcctinfo obj = new TFteAcctinfo();
		String oblkeyId=String.format("%1$s_%2$s_%3$s_%4$s",this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2), this.getStringParameter("reportId"),this.getStringParameter("subaccountno"));
		TFteAcctinfo oldObj=tFteAcctinfoService.getTFteAcctinfo(oblkeyId);
		//TFteAcctinfo oldObj =null;
		if(oldObj!=null && oldObj.getReportId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条: 失败");
		}else{
		obj.setIfNeedChange("2");
		obj.setAcctId(this.getStringParameter("acctId"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setCustNm(this.getStringParameter("custNm"));
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setBalanceCd(this.getStringParameter("balanceCd"));
		obj.setCateg(this.getStringParameter("categ"));
		obj.setIdenType(this.getStringParameter("idenType"));
		obj.setIdenNo(this.getStringParameter("idenNo"));
		obj.setOperType(this.getStringParameter("operType"));
		obj.setDepttype(this.getStringParameter("depttype"));
		obj.setSubaccountno(this.getStringParameter("subaccountno"));
		obj.setAccstatus(this.getStringParameter("accstatus"));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setIfchecked(this.getStringParameter("ifchecked"));
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tFteAcctinfoService.addTFteAcctinfo(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tFteAcctinfoService.delTFteAcctinfo(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TFteAcctinfo ent = tFteAcctinfoService.getTFteAcctinfo(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TFteAcctinfo obj = tFteAcctinfoService.getTFteAcctinfo(seq);
		obj.setIfNeedChange("2");
		obj.setCustNm(this.getStringParameter("custNm"));
		obj.setCurrencyCd(this.getStringParameter("currencyCd"));
		obj.setBalanceCd(this.getStringParameter("balanceCd"));
		obj.setCateg(this.getStringParameter("categ"));
		obj.setIdenType(this.getStringParameter("idenType"));
		obj.setIdenNo(this.getStringParameter("idenNo"));
		obj.setOperType(this.getStringParameter("operType"));
		obj.setDepttype(this.getStringParameter("depttype"));
		//obj.setSubaccountno(this.getStringParameter("subaccountno"));
		obj.setAccstatus(this.getStringParameter("accstatus"));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setIfchecked(this.getStringParameter("ifchecked"));
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tFteAcctinfoService.setTFteAcctinfo(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条：失败");
		}
		}
	}
}
