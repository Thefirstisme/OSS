package com.topcheer.rpt.web;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONArray;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.jgb.utils.PoiCommon;
import com.topcheer.mq.XmlUtil;
import com.topcheer.oss.utils.JsonUtil;
import com.topcheer.rpt.bo.TCustinfoissueResv;
import com.topcheer.rpt.service.TCustinfoissueResvService;

public class TCustinfoissueResvAction extends BaseAction{

	private TCustinfoissueResvService tCustinfoissueResvService;

	public void settCustinfoissueResvService(TCustinfoissueResvService tCustinfoissueResvService) {
		this.tCustinfoissueResvService = tCustinfoissueResvService;
	}

	public void toList() throws Exception{
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		List<TCustinfoissueResv> entList=(List<TCustinfoissueResv>)tCustinfoissueResvService.getByPage(start, endIndex,filterString, sortString.toString());
		int total = tCustinfoissueResvService.getPageRowCount(filterString.toString());
		returnJson(true, entList, "yyyy-MM-dd", total);
	}

	public void toDown() throws Exception{
		String start = getStringParameter("start")==""?"0":getStringParameter("start");
		String colList=getStringParameter("col");
		StringBuffer sortString=new StringBuffer();
		String filterString=this.getFilterString(sortString);
		int total = tCustinfoissueResvService.getPageRowCount(filterString.toString());
		if(total<=65534 && total>0){
			List<?> list=tCustinfoissueResvService.getByPage(Integer.parseInt(start), -1,filterString, sortString.toString());
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
//		String mess = "<?xml version=\"1.0\" encoding=\"GBK\"?>"
//				+"<CFX>"
//				+ "<HEAD> "
//				+ "<VER>1.0</VER>"
//				+ " <SRC>102100009980</SRC>"
//				+ " <DES>100000000000</DES> "
//				+ " <APP>FTZMIS</APP> "
//				+ " <MsgNo>310101</MsgNo>"
//				+ " <MsgID>20051024092733000550</MsgID>"
//				+ " <MsgRef>20051024092733000550</MsgRef>"
//				+ " <WorkDate>20051024</WorkDate>"
//				+ " <EditFlag>1</EditFlag>"
//				+ " <Reserve>String</Reserve> "
//				+ "</HEAD> "
//				+"<MSG>"
//					+"<FTZ310101>"
//						+"<ReportCode>310101</ReportCode>"
//						+"<AccOrgCode>11</AccOrgCode>"
//						+"<AccountName>12345678901234567890</AccountName>"
//						+"<AccountNo>测试用户001</AccountNo>"
//					  +"<OperType>1</OperType>"
//						+"<SubmitDate>20140225</SubmitDate>"
//						
//					+"</FTZ310101>"
//				+ "</MSG></CFX>"
//				;
//			String msgID = XmlUtil.getResMsgRef(mess);
//			String msgNo = XmlUtil.getResMsgNo(mess);
//			XmlUtil.setpublisRpt(service, msgID,msgNo, mess);
		TCustinfoissueResv obj = new TCustinfoissueResv();
		String oblkeyId=String.format("%1$s_%2$s_%3$s", this.getStringParameter("reportId"),this.getStringParameter("idenType"),this.getStringParameter("idenNo"));
		TCustinfoissueResv oldObj=tCustinfoissueResvService.getTCustinfoissueResv(oblkeyId);
		if(oldObj!=null && oldObj.getReportId()!=null){
		this.returnJson(false, "数据库已存在主键数据，请更改输入信息！");
		this.log_act.log("添加一条: 失败");
		}else{
		obj.setReportId(this.getStringParameter("reportId"));
		obj.setOrgId(this.getStringParameter("orgId"));
		obj.setCustNm(this.getStringParameter("custNm"));
		obj.setCustNo(this.getStringParameter("custNo"));
		obj.setOperType(this.getStringParameter("operType"));
		//obj.setDeclareDt(this.getStringParameter("declareDt"));
		String declareDt = this.getStringParameter("declareDt");
		if(StringUtils.isNotEmpty(declareDt)){
			obj.setDeclareDt(DateUtil.string2Date(declareDt, DateUtil.FORMAT_DATE));
			// 关户时，将关户日期设置为declareDt
			if("3".equals(obj.getOperType())){
				obj.setCloseDt(DateUtil.string2Date(declareDt, DateUtil.FORMAT_DATE));
			}else if("1".equals(obj.getOperType())){
				// 开户时，将开户日期设置为declareDt
				obj.setOpenDt(DateUtil.string2Date(declareDt, DateUtil.FORMAT_DATE));
			}
		}
		 
		//int result=tCustinfoissueResvService.addTCustinfoissueResv(obj);
		int result =1;
		XmlUtil.toCastTCustinfoissueResvByXml("");
		 
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
		int result=tCustinfoissueResvService.delTCustinfoissueResv(id);
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
		TCustinfoissueResv ent = tCustinfoissueResvService.getTCustinfoissueResv(id);
		JSONArray json = JSONArray.fromObject(ent,JsonUtil.getJsonConfig());
		this.returnJson(json.toString());
	}

	public void toEdit() throws Exception{
		String seq=this.getStringParameter("id");
		if(!seq.isEmpty()){
			TCustinfoissueResv obj = tCustinfoissueResvService.getTCustinfoissueResv(seq);
		obj.setCustNm(this.getStringParameter("custNm"));
		//obj.setCateg(this.getStringParameter("categ"));
		obj.setOperType(this.getStringParameter("operType"));
		//obj.setDeclareDt(this.getStringParameter("declareDt"));
		String declareDt = this.getStringParameter("declareDt");
		if(StringUtils.isNotEmpty(declareDt)){
			obj.setDeclareDt(DateUtil.string2Date(declareDt, DateUtil.FORMAT_DATE));
			// 关户时，将关户日期设置为declareDt
			if("3".equals(obj.getOperType())){ 
				obj.setCloseDt(DateUtil.string2Date(declareDt, DateUtil.FORMAT_DATE));
			}else if("1".equals(obj.getOperType())){
				// 开户时，将开户日期设置为declareDt
				obj.setOpenDt(DateUtil.string2Date(declareDt, DateUtil.FORMAT_DATE));
			} 
		} 
		
		
		
			int result=tCustinfoissueResvService.setTCustinfoissueResv(obj);
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
