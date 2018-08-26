package test;

import java.util.ArrayList;
import java.util.List;

import com.topcheer.base.utils.DateUtil;
import com.topcheer.jdbc.para.DbType;
import com.topcheer.jdbc.para.Parameter;
import com.topcheer.rpt.bo.TCorpdepoTol;

public class Test {
	private static StringBuffer sqlPageBuffer = new StringBuffer("  select keyId ")   
	.append(" ,STATIS_DT,ORG_ID,ORG_NAME,CUST_NAME,CUST_CD,CREDIT_LIMIT                                                                  ")
	.append(" ,bir.F_GETBIZPARADESC('%7$s','%8$s',INDUS_TYPE_CD) INDUS_TYPE                                                              ")
	.append(" ,INDUS_TYPE_CD                                                                                                             ")
	.append(" ,bir.F_GETBIZPARADESC('%9$s','%10$s',COMPANY_SCOPE_CD) COMPANY_SCOPE                                                       ")
	.append(" ,COMPANY_SCOPE_CD                                                                                                          ")
	.append(" ,LOAN_ACCT_NO || ' ' AS LOAN_ACCT_NO                                                                                       ")
	.append(" ,ADV_AMT,LOAN_BAL,LOAN_DELIV_DT,LOAN_EXPIRE_DT,LOAN_REPAY_DT                                                               ")
	.append(" ,bir.F_GETBIZPARADESC('%11$s','%12$s',GUARANT_MODE_CD) GUARANT_MODE                                                        ")
	.append(" ,GUARANT_MODE_CD                                                                                                           ")
	.append(" ,bir.F_GETBIZPARADESC('%13$s','%14$s',TEN_LEV_CAT_CD) TEN_LEV_CAT                                                          ")
	.append(" ,TEN_LEV_CAT_CD                                                                                                            ")
	.append(" ,bir.F_GETBIZPARADESC('%15$s','%16$s',FIVE_LEV_CAT_CD) FIVE_LEV_CAT                                                        ")
	.append(" ,FIVE_LEV_CAT_CD                                                                                                           ")
	.append(" ,bir.F_GETBIZPARADESC('%17$s','%18$s',ADJ_TEN_LEV_CD) ADJ_TEN_LEV                                                          ")
	.append(" ,ADJ_TEN_LEV_CD                                                                                                            ")
	.append(" ,XD_CUST_ID                                                                                                                ")
	.append(" ,ONSHEET_DI,OFFSHEET_DI,CAPITAL_DAYS,DI_DT,DI_DAYS,CREDIT_LEVEL,EXECUTE_RATE,LOAN_POSE,IDEN_NO                             ")
	.append(" ,JGB.F_GET_BUSINESS_TYPE_NAME(BUSINESS_TYPE) AS BUSINESS_TYPE                                                              ")
	.append(" ,JGB.F_GET_FNIE_KM_NAME(SUBJECT_CD) AS SUBJECT_CD                                                                          ")
	.append(" ,bir.F_GETBIZPARADESC('%5$s','%6$s',CURRENCY_CD) CURRENCY_CD                                                               ")
	.append(" from (                                                                                                                     ")
	.append(" select row_number() over(order by %1$s) as num                                                                             ")
	.append(" ,to_char(STATIS_DT,'yyyymmdd') || '_' || nvl(ORG_ID,'') || '_' || nvl(CUST_CD,'') || '_'|| nvl(LOAN_ACCT_NO,'') AS keyId   ")
	.append(" ,STATIS_DT,ORG_ID,ORG_NAME,CUST_NAME,CUST_CD,CREDIT_LIMIT,INDUS_TYPE,INDUS_TYPE_CD,COMPANY_SCOPE                           ")
	.append(" ,COMPANY_SCOPE_CD,LOAN_ACCT_NO,ADV_AMT,LOAN_BAL,LOAN_DELIV_DT,LOAN_EXPIRE_DT,LOAN_REPAY_DT,GUARANT_MODE                    ")
	.append(" ,GUARANT_MODE_CD,TEN_LEV_CAT,TEN_LEV_CAT_CD,FIVE_LEV_CAT,FIVE_LEV_CAT_CD,ADJ_TEN_LEV,ADJ_TEN_LEV_CD,CURRENCY_CD,XD_CUST_ID ")
	.append(" ,ONSHEET_DI,OFFSHEET_DI,CAPITAL_DAYS,DI_DT,DI_DAYS,CREDIT_LEVEL,SUBJECT_CD,EXECUTE_RATE,LOAN_POSE,IDEN_NO,BUSINESS_TYPE    ")
//	.append(" from JGB.J03_C_LOAN_INFO where %2$s fetch first %4$s rows only)                                                              ")
//	.append(" as a where num > %3$s and num <= %4$s                                                                                        ");
	.append(" from JGB.J03_C_LOAN_INFO whereFetchFilter )                                                                                 ")
	.append(" as a whereNumFilter                                                                                                         ");
	
	public static void main(String[] args) {
//		StringBuffer t = new StringBuffer("1234567890");
//
//		System.out.println("main 中初始化  t--->" +t);
//		
//		test(t);
//		System.out.println("main 中经过test(t)处理 t--->" +t);
//		String str = "   asd   ";
//        String ntr = ("A" + str).trim().substring(1);
//        System.out.println("str=\"" + str + "\"");
//        System.out.println("ntr=\"" + ntr + "\"");
		TCorpdepoTol ent = new TCorpdepoTol();
		ent.setDeclareDt(DateUtil.string2Date("2014-02-25", DateUtil.FORMAT_DATE));
		Parameter para = new Parameter("@Declare_Dt", DbType.Date, ent.getDeclareDt());
		
		System.out.println(new java.sql.Date(((java.util.Date)para.getM_Value()).getTime()));
	}
	
	
	
	public static List test(StringBuffer t){
		List L = new ArrayList();
		
		String m = t.toString().replaceAll("1", "aaaaa");
		
		System.out.println("test方法中的tttt--->" +m);
		return null;
	}

}
