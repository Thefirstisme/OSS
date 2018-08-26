package com.topcheer.rpt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RptUtil {
	private static Map<String, String> tableMap = new HashMap<String, String>();

	static {
		tableMap.put("210101", "单位存款");
		tableMap.put("210102", "FTU内部活动-金融债券");
		tableMap.put("210103", "FTU内部活动-中长期借款");
		tableMap.put("210104", "应付及暂收款");
		tableMap.put("210105", "卖出回购资产");
		tableMap.put("210106", "向中央银行借款");
		tableMap.put("210107", "同业往来（来源方）");
		tableMap.put("210108", "系统内资金往来（来源方）");
		tableMap.put("210109", "外汇买卖（来源方）");
		tableMap.put("210110", "FTU委托存款及委托投资基金 ");
		tableMap.put("210111", "代理金融机构委托贷款基金");
		tableMap.put("210112", "各项准备");
		tableMap.put("210201", "各项贷款");
		tableMap.put("210202", "有价证券");
		tableMap.put("210203", "股权及其他投资");
		tableMap.put("210204", "应收及预付款");
		tableMap.put("210205", "买入返售资产");
		tableMap.put("210206", "存放中央准备金存款");
		tableMap.put("210207", "存放中央银行特种存款");
		tableMap.put("210208", "缴存中央银行财政性存款");
		tableMap.put("210209", "同业往来（运用方）");
		tableMap.put("210210", "系统内资金往来（运用方）");
		tableMap.put("210211", "库存现金");
		tableMap.put("210212", "外汇买卖（运用方）");
		tableMap.put("210301", "代理发债");
		tableMap.put("210302", "应付信用证（进口开证）");
		tableMap.put("210303", "应付保函/备用证（保函/备用证开立）");
		tableMap.put("210304", "信用证保兑（进口应付信用证加保）");
		tableMap.put("210305", "应付银行承兑汇票");
		tableMap.put("210306", "应收信用证（出口交单）");
		tableMap.put("210307", "应收保函/备用证（保函通知，收到境外保函） ");
		tableMap.put("210308", "信用证保兑（出口应收信用证加保）");
		tableMap.put("210309", "应收银行承兑汇票");
		tableMap.put("210310", "远期结售汇");
		tableMap.put("210311", "汇率掉期业务（远期未交割部分）");
		tableMap.put("210401", "表外理财");
		tableMap.put("210501", "FTE、FTN、FTU 账户信息报送");
  		tableMap.put("zmq_t_corpdepo_tol", "210101");
		tableMap.put("zmq_t_ftu_finabond_tol", "210102");
		tableMap.put("zmq_t_ftu_medlongborr_tol", "210103");
		tableMap.put("zmq_t_accopayatemp_tol", "210104");
		tableMap.put("zmq_t_assesoldrepu_tol", "210105");
		tableMap.put("zmq_t_borrcentbank_tol", "210106");
		tableMap.put("zmq_t_tradcurracco_sour_tol", "210107");
		tableMap.put("zmq_t_sysfinaflow_sour_tol", "210108");
		tableMap.put("zmq_t_forextradespot_sour_tol", "210109");
		tableMap.put("zmq_t_ftu_entrdsav_tol", "210110");
		tableMap.put("zmq_t_agententrdloanfund_tol", "210111");
		tableMap.put("zmq_t_totareserve_tol", "210112");
		tableMap.put("zmq_t_totaloan_tol", "210201");
		tableMap.put("zmq_t_securitie_tol", "210202");
		tableMap.put("zmq_t_equityotherinvest_tol", "210203");
		tableMap.put("zmq_t_resvableprepayment_tol", "210204");
		tableMap.put("zmq_t_buybackassetacquired_tol", "210205");
		tableMap.put("zmq_t_centbankreserve_tol", "210206");
		tableMap.put("zmq_t_centbankspecdepo_tol", "210207");
		tableMap.put("zmq_t_centbankfinsavdepo_tol", "210208");
		tableMap.put("zmq_t_tradcurracco_oper_tol", "210209");
		tableMap.put("zmq_t_sysfinaflow_oper_tol", "210210");
		tableMap.put("zmq_t_vaultcash_tol", "210211");
		tableMap.put("zmq_t_forextradespot_oper_tol", "210212");
		tableMap.put("zmq_t_agencybonds", "210301");
		tableMap.put("zmq_t_lc_pay", "210302");
		tableMap.put("zmq_t_lgstandby_pay", "210303");
		tableMap.put("zmq_t_lcconfirm_imp", "210304");
		tableMap.put("zmq_t_bankaccepbill_pay", "210305");
		tableMap.put("zmq_t_lc_resv", "210306");
		tableMap.put("zmq_t_lgstandby_resv", "210307");
		tableMap.put("zmq_t_lcconfirm_exp", "210308");
		tableMap.put("zmq_t_bankaccepbill_resv", "210309");
		tableMap.put("zmq_t_fwdexeslt", "210310");
		tableMap.put("zmq_t_currswaps", "210311");
		tableMap.put("zmq_t_offsheetfin_tol", "210401");
		tableMap.put("zmq_t_fte_acctinfo", "210501");
	}
	
	/**
	 * 将以“_Tol”结尾的表明，换成“_Dtl”
	 * @param tableName
	 * @return
	 */
	public static String replacLastTolToDal(String tableName) {
		if("_tol".equals(tableName.substring(tableName.length()-4, tableName.length()).toLowerCase())){
			tableName = tableName.substring(0, tableName.length()-4) + "_Dtl";
		}
		return tableName;
	}

	/**
	 * 将以“_Dtl”结尾的表明，换成“_Tol”
	 * @param tableName
	 * @return
	 */
	public static String replacLastDalToTol(String tableName) {
		if("_dtl".equals(tableName.substring(tableName.length()-4, tableName.length()).toLowerCase())){
			tableName = tableName.substring(0, tableName.length()-4) + "_Tol";
		}
		return tableName;
	}
	
	public static String getTableName(String msgNo) {
		return tableMap.get(msgNo.toLowerCase());
	}
	
	public static String listToString(List<String> list){
		String retStr = "";
		if(list != null && list.size()>0){
			int size = list.size();
			for(int i = 0; i < size; i++){
				if( i < size-1 ){
					retStr += list.get(i) + ",";
				}else{
					retStr += list.get(i);
				}
			}
		}
		return retStr;
	}
	
	public static void main(String[] args) {
		System.out.println(RptUtil.getTableName("210111"));
		System.out.println("1".toLowerCase());
	}
}
