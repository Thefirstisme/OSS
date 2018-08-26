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
import com.topcheer.rpt.bo.TTotareserveDtl;
import com.topcheer.rpt.bo.TTotareserveTol;
import com.topcheer.rpt.service.TTotareserveDtlService;
import com.topcheer.rpt.service.TTotareserveTolService;
import com.topcheer.rpt.service.TpublishService;

public class TTotareserveDtlAction extends BaseAction{
	 private TpublishService tPublishService;
   private TTotareserveDtlService tTotareserveDtlService;
   private TTotareserveTolService tTotareserveTolService;

     public void settPublishService(TpublishService tPublishService) {
               this.tPublishService = tPublishService;
     }

     public void settTotareserveTolService(TTotareserveTolService tTotareserveTolService) {
               this.tTotareserveTolService = tTotareserveTolService;
     }

	public void settTotareserveDtlService(TTotareserveDtlService tTotareserveDtlService) {
		this.tTotareserveDtlService = tTotareserveDtlService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TTotareserveDtl> entList=(List<TTotareserveDtl>)tTotareserveDtlService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tTotareserveDtlService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tTotareserveDtlService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tTotareserveDtlService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("各项准备-明细%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("各项准备-明细",colList.split(";"),list,fos);
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
		TTotareserveDtl obj = new TTotareserveDtl();
		String oblkeyId=String.format("%1$s_%2$s", this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2));
		TTotareserveDtl oldObj=tTotareserveDtlService.getTTotareserveDtl(oblkeyId);
		if(oldObj!=null && oldObj.getAcctId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条各项准备-明细: 失败");
		}else{
		obj.setAcctId(this.getStringParameter("acctId"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		//obj.setDetailSeq(tPublishService.getDtlSeq("T_TotaReserve_Dtl", obj.getAcctId(), DateUtil.date2String(obj.getDeclareDt(), DateUtil.FORMAT_DATE2)));
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		//obj.setNettingBal(this.getStringParameter("nettingBal"));
		String nettingBal = this.getStringParameter("nettingBal");
		if(StringUtils.isNotEmpty(nettingBal)){
			obj.setNettingBal(new BigDecimal(nettingBal));
		}

		obj.setIfNeedChange("2");
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tTotareserveDtlService.addTTotareserveDtl(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条各项准备-明细：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条各项准备-明细: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tTotareserveDtlService.delTTotareserveDtl(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条各项准备-明细：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条各项准备-明细：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TTotareserveDtl ent = tTotareserveDtlService.getTTotareserveDtl(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TTotareserveDtl obj = tTotareserveDtlService.getTTotareserveDtl(seq);
		obj.setOutInAcctInd(this.getStringParameter("outInAcctInd"));
		//obj.setNettingBal(this.getStringParameter("nettingBal"));
		String nettingBal = this.getStringParameter("nettingBal");
		if(StringUtils.isNotEmpty(nettingBal)){
			obj.setNettingBal(new BigDecimal(nettingBal));
		}

		obj.setIfNeedChange("2");
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tTotareserveDtlService.setTTotareserveDtl(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条各项准备-明细：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条各项准备-明细：失败");
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
			TTotareserveTol obj = tTotareserveTolService.getTTotareserveTol(seq);
			obj.setIfchecked("1");
			int result=tTotareserveTolService.setTTotareserveTol(obj);
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
