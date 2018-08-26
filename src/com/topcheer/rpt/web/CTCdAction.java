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
import com.topcheer.rpt.bo.CTCd;
import com.topcheer.rpt.service.CTCdService;

public class CTCdAction extends BaseAction{

	private CTCdService cTCdService;

	public void setcTCdService(CTCdService cTCdService) {
		this.cTCdService = cTCdService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<CTCd> entList=(List<CTCd>)cTCdService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = cTCdService.getPageRowCount(filterString.toString());
		returnJson(true, entList, "yyyy-MM-dd", total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = cTCdService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=cTCdService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("字典表%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("字典表",colList.split(";"),list,fos);
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


	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=cTCdService.delCTCd(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条字典表：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条字典表：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		CTCd ent = cTCdService.getCTCd(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			CTCd obj = cTCdService.getCTCd(seq);
		obj.setCd2(this.getStringParameter("cd2"));
		obj.setCd3(this.getStringParameter("cd3"));
		obj.setCd4(this.getStringParameter("cd4"));
		obj.setCd5(this.getStringParameter("cd5"));
		obj.setCdDesc(this.getStringParameter("cdDesc"));
			int result=cTCdService.setCTCd(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条字典表：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条字典表：失败");
		}
		}
	}

}
