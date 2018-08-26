package com.topcheer.rpt.web;

import com.topcheer.base.OSSLog4j.Log_action;
import com.topcheer.base.utils.DateUtil;
import com.topcheer.base.web.BaseAction;
import com.topcheer.jgb.utils.PoiCommon;
import com.topcheer.oss.utils.JsonUtil;
import com.topcheer.rpt.bo.TTradcurraccoOperTol;
import com.topcheer.rpt.service.TTradcurraccoOperDtlService;
import com.topcheer.rpt.service.TTradcurraccoOperTolService;
import com.topcheer.rpt.service.TpublishService;
import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import net.sf.json.JSONArray;
import org.apache.commons.lang.StringUtils;

public class TTradcurraccoOperTolAction extends BaseAction
{
  private TpublishService tPublishService;
  private TTradcurraccoOperTolService tTradcurraccoOperTolService;
  private TTradcurraccoOperDtlService tTradcurraccoOperDtlService;

  public void settPublishService(TpublishService tPublishService)
  {
    this.tPublishService = tPublishService;
  }

  public void settTradcurraccoOperDtlService(TTradcurraccoOperDtlService tTradcurraccoOperDtlService) {
    this.tTradcurraccoOperDtlService = tTradcurraccoOperDtlService;
  }

  public void settTradcurraccoOperTolService(TTradcurraccoOperTolService tTradcurraccoOperTolService) {
    this.tTradcurraccoOperTolService = tTradcurraccoOperTolService;
  }

  public void toList() throws Exception {
    Integer start = Integer.valueOf(Integer.parseInt((getStringParameter("start") == "") ? "0" : getStringParameter("start")));
    Integer limit = Integer.valueOf(Integer.parseInt((getStringParameter("limit") == "") ? "20" : getStringParameter("limit")));
    Integer endIndex = Integer.valueOf(start.intValue() + limit.intValue());
    StringBuffer sortString = new StringBuffer();
    String filterString = getFilterString(sortString);
    List entList = this.tTradcurraccoOperTolService.getByPage(start.intValue(), endIndex.intValue(), filterString, sortString.toString());
    int total = this.tTradcurraccoOperTolService.getPageRowCount(filterString.toString());
    returnJson(true, entList, "yyyy-MM-dd", Integer.valueOf(total));
  }

  public void toDown() throws Exception {
    String start = (getStringParameter("start") == "") ? "0" : getStringParameter("start");
    String colList = getStringParameter("col");
    StringBuffer sortString = new StringBuffer();
    String filterString = getFilterString(sortString);
    int total = this.tTradcurraccoOperTolService.getPageRowCount(filterString.toString());
    if ((total <= 65534) && (total > 0)) {
      List list = this.tTradcurraccoOperTolService.getByPage(Integer.parseInt(start), -1, filterString, sortString.toString());
      String downFileName = "/downfile/" + String.format("同业往来（运用方）-汇总%1$s.xls", new Object[] { DateUtil.timestamp2StringMillis(new Timestamp(System.currentTimeMillis())) });
      String fileName = getPath() + downFileName;
      FileOutputStream fos = new FileOutputStream(new File(fileName));
      PoiCommon.exportExcel("同业往来（运用方）-汇总", colList.split(";"), list, fos);
      fos.close();
      if (!(downFileName.isEmpty())) {
        returnJson(true, downFileName);
        this.log_act.log("下载文件：" + downFileName);
      } else {
        returnJson(false, "文件生成错误！");
      }
    } else if (total > 65534) {
      returnJson(false, "导出数据过大，请增加查询条件，查询后再导出！");
    } else {
      returnJson(false, "没有可导出的数据,请查询后再导出！");
    }
  }

  public void toAdd() throws Exception {
    TTradcurraccoOperTol obj = new TTradcurraccoOperTol();
    String oblkeyId = String.format("%1$s_%2$s", new Object[] { getStringParameter("acctId"), DateUtil.date2String(DateUtil.string2Date(getStringParameter("declareDt"), "yyyy-MM-dd"), "yyyyMMdd") });
    TTradcurraccoOperTol oldObj = this.tTradcurraccoOperTolService.getTTradcurraccoOperTol(oblkeyId);
    if ((oldObj != null) && (oldObj.getAcctId() != null)) {
      returnJson(false, "数据库已存在主键数据，请更改输入信息！");
      this.log_act.log("添加一条同业往来（运用方）-汇总: 失败");
    } else {
      obj.setAcctId(getStringParameter("acctId"));
      obj.setCurrencyCd(getStringParameter("currencyCd"));

      String dayBalFill = getStringParameter("dayBalFill");
      if (StringUtils.isNotEmpty(dayBalFill)) {
        obj.setDayBalFill(new BigDecimal(dayBalFill));
      }
      obj.setBalanceCd(getStringParameter("balanceCd"));
      obj.setDeclareDt(DateUtil.string2Date(getStringParameter("declareDt"), "yyyy-MM-dd"));
      obj.setTolRecord(getStringParameter("tolRecord"));
      obj.setBelongOrgId(getStringParameter("belongOrgId"));
      obj.setIfchecked(getStringParameter("ifchecked"));
      obj.setIfNeedChange("2");
      int result = this.tTradcurraccoOperTolService.addTTradcurraccoOperTol(obj);
      if (result > 0) {
        returnJson(true, "添加成功！");
        this.log_act.log("添加一条同业往来（运用方）-汇总：成功");
      } else {
        returnJson(false, "添加失败！");
        this.log_act.log("添加一条同业往来（运用方）-汇总: 失败");
      }
    }
  }

  public void toDel() throws Exception {
    String id = getStringParameter("id");
    int result = this.tTradcurraccoOperTolService.delTTradcurraccoOperTol(id);
    if (result > 0) {
      returnJson(true, "删除成功！");
      this.log_act.log("删除一条同业往来（运用方）-汇总：成功");
    } else {
      returnJson(false, "删除失败！");
      this.log_act.log("删除一条同业往来（运用方）-汇总：失败");
    }
  }

  public void toEnt() throws Exception {
    String id = getStringParameter("id");
    TTradcurraccoOperTol ent = this.tTradcurraccoOperTolService.getTTradcurraccoOperTol(id);
    JSONArray json = JSONArray.fromObject(ent, JsonUtil.getJsonConfig());
    returnJson(json.toString());
  }

  public void toEdit() throws Exception {
    String seq = getStringParameter("id");
    if (!(seq.isEmpty())) {
      TTradcurraccoOperTol obj = this.tTradcurraccoOperTolService.getTTradcurraccoOperTol(seq);
//      obj.setCurrencyCd(getStringParameter("currencyCd"));

      String dayBalFill = getStringParameter("dayBalFill");
      if (StringUtils.isNotEmpty(dayBalFill)) {
        obj.setDayBalFill(new BigDecimal(dayBalFill));
      }
      obj.setBalanceCd(getStringParameter("balanceCd"));
      obj.setTolRecord(getStringParameter("tolRecord"));
      obj.setBelongOrgId(getStringParameter("belongOrgId"));
      obj.setIfchecked(getStringParameter("ifchecked"));
      obj.setIfNeedChange("2");
      int result = this.tTradcurraccoOperTolService.setTTradcurraccoOperTol(obj);
      if (result > 0) {
        returnJson(true, "修改成功！");
        this.log_act.log("更新一条同业往来（运用方）-汇总：成功");
      } else {
        returnJson(false, "修改失败！");
        this.log_act.log("更新一条同业往来（运用方）-汇总：失败");
      }
    }
  }
}