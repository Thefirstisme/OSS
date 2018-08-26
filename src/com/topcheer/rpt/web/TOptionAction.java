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
import com.topcheer.rpt.bo.TOption;
import com.topcheer.rpt.service.TOptionService;

public class TOptionAction extends BaseAction{

	private TOptionService tOptionService;

	public void settOptionService(TOptionService tOptionService) {
		this.tOptionService = tOptionService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TOption> entList=(List<TOption>)tOptionService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tOptionService.getPageRowCount(filterString.toString());
		returnJson(true, entList, total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tOptionService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tOptionService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
			String downFileName="/downfile/"+String.format("期权%1$s.xls",DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())));
			String fileName = this.getPath() + downFileName;
			FileOutputStream fos = new FileOutputStream( new File(fileName));
			PoiCommon.exportExcel("期权",colList.split(";"),list,fos);
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
		TOption obj = new TOption();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("acctId"),DateUtil.date2String(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE), DateUtil.FORMAT_DATE2),this.getStringParameter("declareSeq"));
		TOption oldObj=tOptionService.getTOption(oblkeyId);
		if(oldObj!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条期权: 失败");
		}else{
		obj.setIfNeedChange("2");
		obj.setIfchecked(this.getStringParameter("ifchecked"));
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setDeclareSeq(this.getStringParameter("declareSeq"));
		obj.setDeclareDt(DateUtil.string2Date(this.getStringParameter("declareDt"), DateUtil.FORMAT_DATE));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setBuyCurrency(this.getStringParameter("buyCurrency"));
		obj.setBuyAmt(Double.parseDouble(this.getStringParameter("buyAmt")));
		obj.setBuyPrc(Double.parseDouble(this.getStringParameter("buyPrc")));
		obj.setSellCurrency(this.getStringParameter("sellCurrency"));
		obj.setSellAmt(Double.parseDouble(this.getStringParameter("sellAmt")));
		obj.setSellPrc(Double.parseDouble(this.getStringParameter("sellPrc")));
		obj.setMatureDt(DateUtil.string2Date(this.getStringParameter("matureDt"), DateUtil.FORMAT_DATE));
		obj.setDeliverydate(DateUtil.string2Date(this.getStringParameter("deliverydate"), DateUtil.FORMAT_DATE));
		obj.setOppositeAcctno(this.getStringParameter("oppositeAcctno"));
		obj.setOppositeAcctName(this.getStringParameter("oppositeAcctName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setCreateUser(this.getStringParameter("userId")) ;
		int result=tOptionService.addTOption(obj);
		if(result>0){
			this.returnJson(true, "添加成功！");
			this.log_act.log("添加一条期权：成功");
		}else{
			this.returnJson(false, "添加失败！");
			this.log_act.log("添加一条期权: 失败");
		}
		}
	}

	public void toDel() throws Exception{
		String id = this.getStringParameter("id");
		int result=tOptionService.delTOption(id);
		if(result>0){
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除一条期权：成功");
		}else{
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除一条期权：失败");
		}
	}

	public void toEnt() throws Exception{
		String id = this.getStringParameter("id");
		TOption ent = tOptionService.getTOption(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TOption obj = tOptionService.getTOption(seq);
		obj.setIfNeedChange("2");
		obj.setIfchecked(this.getStringParameter("ifchecked"));
		obj.setBelongOrgId(this.getStringParameter("belongOrgId"));
		obj.setBuyCurrency(this.getStringParameter("buyCurrency"));
		obj.setBuyAmt(Double.parseDouble(this.getStringParameter("buyAmt")));
		obj.setBuyPrc(Double.parseDouble(this.getStringParameter("buyPrc")));
		obj.setSellCurrency(this.getStringParameter("sellCurrency"));
		obj.setSellAmt(Double.parseDouble(this.getStringParameter("sellAmt")));
		obj.setSellPrc(Double.parseDouble(this.getStringParameter("sellPrc")));
		obj.setMatureDt(DateUtil.string2Date(this.getStringParameter("matureDt"), DateUtil.FORMAT_DATE));
		obj.setDeliverydate(DateUtil.string2Date(this.getStringParameter("deliverydate"), DateUtil.FORMAT_DATE));
		obj.setOppositeAcctno(this.getStringParameter("oppositeAcctno"));
		obj.setOppositeAcctName(this.getStringParameter("oppositeAcctName"));
		obj.setOppositeBankCd(this.getStringParameter("oppositeBankCd"));
		obj.setCountryCd(this.getStringParameter("countryCd"));
		obj.setDomechargeAreaCd(this.getStringParameter("domechargeAreaCd"));
		obj.setTxnAttri(this.getStringParameter("txnAttri"));
		obj.setModifiedUser(this.getStringParameter("userId"));
			int result=tOptionService.setTOption(obj);
		if(result>0){
			this.returnJson(true, "修改成功！");
			this.log_act.log("更新一条期权：成功");
		}else{
			this.returnJson(false, "修改失败！");
			this.log_act.log("更新一条期权：失败");
		}
		}
	}
}
