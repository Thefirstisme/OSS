package com.topcheer.rpt.web;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Timer;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.jdbc.util.PropertiesUtil;
import com.topcheer.mq.EnvironmentInfo;
import com.topcheer.quartz.JDBC;
import com.topcheer.quartz.JobTaskBean;
import com.topcheer.rpt.bo.Tpublish;
import com.topcheer.rpt.service.TpublishService;

@SuppressWarnings("serial")
public class TpublishAction extends BaseAction{
	Timer timer = new Timer();
	public static EnvironmentInfo environmentInfo = new EnvironmentInfo();
	
	protected static Logger logger = Logger.getLogger(TpublishAction.class.getName());
	
	private TpublishService tPublishService;

	public void settPublishService(TpublishService tPublishService) {
		this.tPublishService = tPublishService;
	}

	@SuppressWarnings("unchecked")
	public void toList() throws Exception{
		String msgids=this.getStringParameter("msgids");
		String mode=this.getStringParameter("mode");
		String datatime=this.getStringParameter("datatime");
		if(datatime.isEmpty()){
			datatime = DateUtil.date2String(DateUtil.addDays(new Date(System.currentTimeMillis()), 0), DateUtil.FORMAT_DATE);
		}else{
			datatime =datatime.substring(0,10);
		} 
		Integer start = Integer.parseInt(getStringParameter("start")==""?"0":getStringParameter("start"));
		Integer limit =Integer.parseInt( getStringParameter("limit")==""?"20":getStringParameter("limit"));
		Integer endIndex=start+limit;
		StringBuffer sortString=new StringBuffer();
		sortString.append("create_dt DESC");
		String filterString="data_dt='"+datatime+"' ";
		
		if(mode.isEmpty()){
			mode="1";
		}
		if(!msgids.isEmpty()){
			msgids = msgids.replaceAll(",", "','");
			msgids="'"+msgids+"'";
			filterString += " and  msgid in (" + msgids +")"
						 + " and ispublish = '" +mode+"'"
						 + " and status != '4'"; 			
		}else{
			filterString += " and ispublish = '" +mode+"'"
					     + " and status != '4'";			

		}
		
		List<Tpublish> entList=(List<Tpublish>)tPublishService.getByPage(start, endIndex,filterString, sortString.toString());
//		if(entList.size()==0) {
//			entList.addAll((List<Tpublish>)tPublishService.getByPage(start, endIndex,"data_dt='"+datatime+"' "+" and status = '9'",sortString.toString()));
//		}
		
		int total = tPublishService.getPageRowCount(filterString.toString());
		returnJson(true, entList, "yyyy-MM-dd", total);
	}

	/**
	 * 将报文发送至MQ
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void toEdit() throws Exception{
		String msgids=this.getStringParameter("msgids");
		logger.debug("向人行发送的msgids--->" + msgids);
		if(!msgids.isEmpty()){
			synchronized(this){
				// 根据msgids获得需要上报的报文IDS
				List<Tpublish> entList=(List<Tpublish>)tPublishService.getList("1",msgids);	
				logger.debug("向人行发送的entList.size()--->" + entList.size());
				tPublishService.sendXmlToMQ(entList);
			}
		}
	}
	
	/**
	 *删除未上报的报文（根据状态是否为0） 
	 */
	public void toDelete()throws Exception{
		String msgids = this.getStringParameter("msgids");
		int result = tPublishService.deleteTPublish(msgids);
		if (result > 0) {
			this.returnJson(true, "删除成功！");
			this.log_act.log("删除未上报报文：成功");
		} else {
			this.returnJson(false, "删除失败！");
			this.log_act.log("删除未上报报文：失败");
		}
		
	}
	
	
	/**
	 * 
	 * @throws Exception
	 */
	public void toEnt() throws Exception{
		String msgId = this.getStringParameter("msgId");
		Tpublish tpublish = tPublishService.getpublishRpt(msgId);
		//JSONArray json = JSONArray.fromObject(tpublish.getXml(), JsonUtil.getJsonConfig());
		// 1 是发送的报文，2是返回的
		String t = this.getStringParameter("t");
		
		if("1".equals(t)){
			this.returnJson(tpublish.getXml());
		}else {
			this.returnJson(StringUtils.isEmpty(tpublish.getReXml()) ? "暂无返回信息" : tpublish.getReXml());
		}
		
	}
	
 	/**
 	 * 检查是否有未确认上报的数据
 	 * @throws Exception
 	 */
 	public void getIfCheckTolCount()  throws Exception{
 		String[] tableName = this.getStringParameter("tableName").split(","); 		
 		String declareDt = this.getStringParameter("declareDt"); 
 		declareDt = (StringUtils.isNotEmpty(declareDt)&&declareDt.length()>10 ? declareDt.substring(0, 10):declareDt);
 		StringBuffer IfCheckEdCount = new StringBuffer("0");
 		// 先判断是否有字段长度、是否必填不满足要求的数据
 		// 如果有数据需要调整，则不进行余额连续性校验
 		for(String table:tableName) {
 			IfCheckEdCount = IfCheckEdCount.append((tPublishService.getIfCheckTolCount(table,declareDt)).equals("0")?"":(tPublishService.getIfCheckTolCount(table,declareDt)+"<br>"));
 		}
 		// 如果没有数据需要调整，则进行余额连续性校验
 		if("0".equals(IfCheckEdCount.toString())){
 	 		for(String table:tableName) {
 	 			String retStr = tPublishService.zmq_prc_chk_work_balance(declareDt, table);
 	 			System.out.println(table + "余额连续性校验结果--->" + retStr);
 	 			IfCheckEdCount = IfCheckEdCount.append((tPublishService.getIfCheckTolCount(table,declareDt)).equals("0")?"":(tPublishService.getIfCheckTolCount(table,declareDt)+"<br>"));
 	 		}
 		}

 		if(IfCheckEdCount.toString().contains("请修改")) {
 			this.returnJson(IfCheckEdCount.toString().substring(1, IfCheckEdCount.toString().indexOf("<br>"))+"");
 		} else {
 			this.returnJson(Integer.parseInt(IfCheckEdCount.toString())+"");
 		}
 	}
 	
	/**                                                                                                                                                                                                                       
  	 * 生成上报信息
  	 * @throws Exception
  	 */
  	public void toShangBao()  throws Exception{                                                                                                                                                                             
  		String declareDt = this.getStringParameter("declareDt").substring(0,10);                                                                                                                                                                 
  		String tableName = this.getStringParameter("tableName");   
        
		if(!tableName.startsWith("ZMQ_")){
			tableName = "ZMQ_"+tableName;
		}
		// 生成报文信息
		List<String> resultList= tPublishService.toCreateXml(declareDt, tableName);
			
		if(resultList!=null && resultList.size()>0){
			this.returnJson(true, "生成上报信息成功！");                                                                                                                                                                          
			this.log_act.log("生成上报信息成功");                                                                                                                                                                                 
		}else{
			String retStr = "申报日期为"+declareDt+",没有需要上报的数据，未生成报文";
  			this.returnJson(false, retStr);                                                                                                                                                                         
  			this.log_act.log(retStr);   
  		} 
  	}   
  	
  	/**                                                                                                                                                                                                                       
  	 * 一键生成所有报文信息
  	 * @throws Exception                                                                                                                                                                                                      
  	 */                                                                                                                                                                                                                       
  	 public void toOKShangBao()  throws Exception{
//  		Tpublish tpublish = tPublishService.getpublishRpt("100000000000201405190953589342");
//  		tPublishService.setpublisRptResult(tpublish);
  		String declareDt = this.getStringParameter("declareDt").substring(0,10); 
  		String tableName  = PropertiesUtil.getInstance().getProperty("tableName");
  		
		// 生成报文信息
		List<String> resultList= tPublishService.toCreateXml(declareDt, tableName);
			
		if(resultList!=null && resultList.size()>0){
			this.returnJson(true, "生成上报信息成功！");                                                                                                                                                                          
			this.log_act.log("生成上报信息成功");                                                                                                                                                                                 
		}else{
			String retStr = "申报日期为"+declareDt+",没有需要上报的数据，未生成报文";
  			this.returnJson(false, retStr);                                                                                                                                                                         
  			this.log_act.log(retStr);   
  		} 
  	}    
  	
  	/**
  	 * 关联账户信息下发时用到的处理关联账户信息下发的方法
  	 * @param msgID
  	 */
  	public void processCustinfo(String msgID){
  		tPublishService.processCustinfo(msgID);
  	}
  	
  	/**
  	 * 获得上报模式信息
  	 * @throws Exception
  	 */
  	public void selectModelInfo() throws Exception {
  		JobTaskBean[] beanList=JDBC.getJobTaskBean("select * from ZMQ_JOB_TASK where TASK_ID='1'", null);
  		String isAuto="0";
  		String hour="0"; 
  		String minute="0";
  		if(beanList.length>0){
  			JobTaskBean  bean=beanList[0];
  			String express=bean.getTaskExpress();
  			if(express.endsWith("2099")){
  				isAuto="1";
  			}else{
  				String[] strArray=express.split(" ");
  				hour=strArray[2];
  				minute=strArray[1];
  			}
  		}
  		String json=String.format("[{\"auto\":\"%1$s\",\"hour\":\"%2$s\",\"minute\":\"%3$s\"}]",isAuto,hour,minute);
		this.returnJson(json);
  	}
  	
  	/**
  	 * 选择上报模式方法
  	 * 其中O表示手动上报，A表示自动上报
  	 * 点击修改上报模式的时候，修改数据库表，
  	 * 如果是自动上报，则调用生成xml和发送mq的方法
  	 * @throws Exception
  	 */
  	public void selectModel() throws Exception {
  		//String msgids=this.getStringParameter("declareDt3");
		//String model1=this.getStringParameter("radio4");
		String model2=this.getStringParameter("radio5");
		String hour = this.getStringParameter("hour");
		String minute = this.getStringParameter("minute");
		// 默认为手工上报，设置执行年份为2099
		String task_express = "1 * * * * ?  2099";
		// 如果是自动上报
		if("true".equals(model2)){
			// 测试用的表达式
			//task_express = "1/5 * * * * ? *";
			
			task_express = "1 " + minute + " " + hour + " * * ? *";
		}
		// 构造当前日期加一天，只要STATE_DATE在当前日期的后面，定时器就会被重新加载
		Date date = DateUtil.addDays(new Date(System.currentTimeMillis()), 1);
		
		String sql = " update ZMQ_JOB_TASK set TASK_EXPRESS = '"+task_express+"',STATE_DATE = to_date('"+DateUtil.date2String(date, DateUtil.FORMAT_DATETIME)+"','yyyy-MM-dd HH24:mi:ss') where TASK_ID ='1' ";
		int t = tPublishService.getCount(sql, null);
		this.returnJson(String.format("[{\"t\":\"%1$s\"}]", t));
  	}
  	
  	/**
  	 * 检验数据的操作权限
  	 * @param dataId
  	 */
  	public void toJudgeAuthority()throws Exception{
  		String dataId = this.getStringParameter("dataId");
  		@SuppressWarnings("unchecked")
		List<Tpublish> list = (List<Tpublish>) tPublishService.getQueryPublishStatus(dataId);
  		//List<Tpublish> list = (List<Tpublish>) tPublishService.getQueryPublishStatus("55555_20140813_5555");
  		if(list.size()>1){
  			for(int i = 0;i<list.size();i++){
  				Tpublish publish = list.get(i);
  				if("1"==publish.getStatus() || "3"==publish.getStatus()){
  					this.returnJson(publish.getStatus());
  					System.out.println("一条数据存在多条报文不可以修改"+publish.getStatus());
  				}else{
  					this.returnJson(publish.getStatus());
  					System.out.println("一条数据存在多条报文可以修改"+publish.getStatus());
  				}
  				
  			}
  			
  		}else if(list.size()==1){
  			this.returnJson(list.get(0).getStatus());
  			System.out.println("一条数据只存在一个报文中："+list.get(0).getStatus());
  		}else{
  		    this.returnJson("0");
  		    System.out.println("没有生成报文");
  		}
  	}
  	
  	
}
