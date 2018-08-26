package com.topcheer.rpt.service;

import com.topcheer.jdbc.JdbcOracleBaseService;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TTradcurraccoOperTol;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;

public class TTradcurraccoOperTolService extends JdbcOracleBaseService
{
  public List<?> findTTradcurraccoOperTolList(String querySql)
  {
    return getResultPojoList(querySql.toString(), "com.topcheer.rpt.bo.TTradcurraccoOperTol");
  }

  public List<?> findTTradcurraccoOperTolList(String querySql, List<Parameter> sqlParameterList) {
    return getResultPojoList(querySql.toString(), sqlParameterList, "com.topcheer.rpt.bo.TTradcurraccoOperTol");
  }

  public List<?> findTTradcurraccoOperTolList(String querySql, String classPath) {
    classPath = (StringUtils.isEmpty(classPath)) ? (classPath = "com.topcheer.rpt.bo.TTradcurraccoOperTol") : classPath;
    return getResultPojoList(querySql.toString(), classPath);
  }

  public List<?> getByPage(int startIndex, int endIndex, String filter, String sort)
  {
    if (filter.length() == 0) {
      filter = "1=1";
    }
    if (sort.length() == 0) {
      sort = " IF_NEED_CHANGE,Acct_Id,Declare_Dt  DESC";
    }
    String sql = "";
    if (endIndex != -1) {
      sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') || '_' || Currency_Cd AS ID, if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked FROM ZMQ_T_TradCurrAcco_Oper_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", new Object[] { sort, filter, Integer.valueOf(startIndex), Integer.valueOf(endIndex) });
    }
    else {
      sql = String.format("select if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked from ZMQ_T_TradCurrAcco_Oper_Tol where %2$s order by %1$s", new Object[] { sort, filter });
    }
    return findTTradcurraccoOperTolList(sql);
  }

  public List<?> getByPage(int startIndex, int endIndex, String filter, String sort, String classPath)
  {
    if (filter.length() == 0) {
      filter = "1=1";
    }
    if (sort.length() == 0) {
      sort = " IF_NEED_CHANGE,Acct_Id,Declare_Dt  DESC ";
    }
    String sql = "";
    if (endIndex != -1) {
      sql = String.format("SELECT Acct_Id || '_' || TO_CHAR (Declare_Dt, 'yyyyMMdd') AS ID, if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked FROM (SELECT a.*, ROWNUM rn FROM (SELECT if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked FROM ZMQ_T_TradCurrAcco_Oper_Tol WHERE %2$s order by %1$s) a WHERE ROWNUM <= %4$s) b  WHERE rn > %3$s", new Object[] { sort, filter, Integer.valueOf(startIndex), Integer.valueOf(endIndex) });
    }
    else {
      sql = String.format("select if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked from ZMQ_T_TradCurrAcco_Oper_Tol where %2$s order by %1$s", new Object[] { sort, filter });
    }
    return findTTradcurraccoOperTolList(sql, classPath);
  }

  public int getPageRowCount(String filter)
  {
    String sql = String.format("select count(*) from ZMQ_T_TradCurrAcco_Oper_Tol where %1$s ", new Object[] { filter });
    return getResultRow(sql);
  }

  public int setTTradcurraccoOperTol(TTradcurraccoOperTol ent)
  {
    String sql = "Update ZMQ_T_TradCurrAcco_Oper_Tol Set if_Need_Change=@if_Need_Change,Day_Bal_Fill=@Day_Bal_Fill, Balance_Cd=@Balance_Cd, tol_record=@tol_record, Belong_Org_Id=@Belong_Org_Id, ifChecked=@ifChecked Where  Acct_Id=@Acct_Id and Declare_Dt=@Declare_Dt and Currency_Cd=@Currency_Cd";
    return getCount(sql, getTTradcurraccoOperTolParameterList(ent));
  }

  public int addTTradcurraccoOperTol(TTradcurraccoOperTol ent)
  {
    String sql = "Insert Into ZMQ_T_TradCurrAcco_Oper_Tol  (if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked) Values(@if_Need_Change, @Acct_Id, @Currency_Cd, @Day_Bal_Fill, @Balance_Cd, @Declare_Dt, @tol_record, @Belong_Org_Id, @ifChecked)";
    return getCount(sql, getTTradcurraccoOperTolParameterList(ent));
  }

  public int delTTradcurraccoOperTol(String id)
  {
    int result = 0;
    if (!(id.isEmpty())) {
      String[] idList = id.split("_");
      if (idList.length == 3) {
        String sql = "delete from ZMQ_T_TradCurrAcco_Oper_Tol where Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Currency_Cd=@Currency_Cd";
        List sqlParameterList = new ArrayList();
        sqlParameterList.add(new Parameter("@Acct_Id", 16, idList[0]));
        sqlParameterList.add(new Parameter("@Declare_Dt", 16, idList[1]));
        sqlParameterList.add(new Parameter("@Currency_Cd", 16, idList[2]));
        result = getCount(sql, sqlParameterList);
      }
    }
    return result;
  }

  public TTradcurraccoOperTol getTTradcurraccoOperTol(String id)
  {
    TTradcurraccoOperTol result = null;
    if (!(id.isEmpty())) {
      String[] idList = id.split("_");
      if (idList.length == 3) {
        String sql = "select if_Need_Change,Acct_Id,Currency_Cd,Day_Bal_Fill,Balance_Cd,Declare_Dt,tol_record,Belong_Org_Id,ifChecked from ZMQ_T_TradCurrAcco_Oper_Tol WHERE Acct_Id = @Acct_Id and TO_CHAR (Declare_Dt, 'yyyyMMdd') = @Declare_Dt and Currency_Cd = @Currency_Cd";
        List sqlParameterList = new ArrayList();
        sqlParameterList.add(new Parameter("@Acct_Id", 16, idList[0]));
        sqlParameterList.add(new Parameter("@Declare_Dt", 16, idList[1]));
        sqlParameterList.add(new Parameter("@Currency_Cd", 16, idList[2]));
        List list = findTTradcurraccoOperTolList(sql, sqlParameterList);
        if ((list != null) && (list.size() > 0)) {
          result = (TTradcurraccoOperTol)list.get(0);
        }
      }
    }
    return result;
  }

  public List<Parameter> getTTradcurraccoOperTolParameterList(TTradcurraccoOperTol ent)
  {
    List sqlParameterList = new ArrayList();
    sqlParameterList.add(new Parameter("@if_Need_Change", 16, ent.getIfNeedChange()));
    sqlParameterList.add(new Parameter("@Acct_Id", 16, ent.getAcctId()));
    sqlParameterList.add(new Parameter("@Currency_Cd", 16, ent.getCurrencyCd()));
    sqlParameterList.add(new Parameter("@Day_Bal_Fill", 28, ent.getDayBalFill()));
    sqlParameterList.add(new Parameter("@Balance_Cd", 16, ent.getBalanceCd()));
    sqlParameterList.add(new Parameter("@Declare_Dt", 5, ent.getDeclareDt()));
    sqlParameterList.add(new Parameter("@tol_record", 16, ent.getTolRecord()));
    sqlParameterList.add(new Parameter("@Belong_Org_Id", 16, ent.getBelongOrgId()));
    sqlParameterList.add(new Parameter("@ifChecked", 16, ent.getIfchecked()));
    return sqlParameterList;
  }
}