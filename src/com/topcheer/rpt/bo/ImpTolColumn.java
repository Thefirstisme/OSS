package com.topcheer.rpt.bo;

import java.util.Date;

/**
* 校验表名
* @author Administrator
*
*/
public class ImpTolColumn {
	public static void main(String[] args) {
		String t = "String accountNo;String accountName;String accType;String depositRate;String customType;String balanceCode;String documentType;String documentNo;String currency;String balance;String submitDate;String totalCount;String seqNo;String cDFlag;String tranDate;String orgTranDate;String amount;String oppAccount;String oppName;String oppBankCode;String countryCode;String districtCode;String tranType;String termLength;String termUnit;String expireDate;String abroadOppBankId;String accountno;String accstatus;Date acctingDt;Date acctDt;String acctId;Double acptAmt;Date acptDt;Date acptMatureDt;String acptOrgId;String acptOrgNm;String applicantCorpNm;String applicantCorpOrgId;String applicantCountryCd;String applicantDomeAreaCd;String applicantNm;String applicantOrgId;Double assetTotalVal;Double bal;String balanceCd;String belongOrgId;String benefCorpNm;String benefCorpOrgId;String benefCountryCd;String benefDomeAreaCd;Date bisMatureDt;String bondId;String bondNm;Double buyAmt;String buyAssetType;String buyCurrency;Double buyPrc;String categ;String catCd;Date collDt;Date confirmMatureDt;String corpAcctId;String corpId;String corpNm;String countryCd;String currencyCd;String custNm;String custType;Double dayBalFill;String debtorCountryCd;String debtorDomeAreaCd;String debtorNm;String debtorOrgId;Date declareDt;String declareSeq;Date deliverydate;Date delivDt1;Date delivDt2;Double depoRate;String depttype;String detailSeq;String domechargeAreaCd;String fixDepoInd;Double fixRate;String floatSpread;String fxTradeType;String idenNo;String idenType;String ifchecked;String ifNeedChange;Date intStartDt;String issuCorpAcct;Date lcMatureDt;Date lgMatureDt;String lgType;Date matureDt;Double nettingBal;Double nobondsissued;String openOrgId;String operType;String oppositeAcctno;String oppositeAcctName;String oppositeBankCd;String oppositeBankName;String oppositeCountryCd;String oppositeCustAttri;String oppositeName;Double origAssetTotalVal;String origPeriodLen;String origPeriodUnit;Date origTxnDt;String outInAcctInd;String overdue;String periodCon;String periodLen;String periodUnit;String priceDatum;Double rate;String rateType;Date releaseDt;String reportId;String repoPeriodLen;String repoPeriodUnit;String saleAssetType;String securedPartyCountryCd;String securedPartyDomeAreaCd;String securedPartyNm;String securedPartyOrgId;String securitiescode;String secuType;Double sellAmt;String sellCurrency;Double sellPrc;Date sltDt;String subaccountno;Double tolRecord;String txnAttri;String txnOrgId;String txnType;Double yieldRate;String accOrgCode;";
		String[] cls = t.split(";");
		for(int i=0; i<cls.length; i++){
			String[] tt = cls[i].split(" ");
			String info = (String)tt[1];
			String str = info.substring(0,1).toUpperCase()+info.substring(1);
			if("String".equals(tt[0])){
				System.out.println("batch.set"+str+"(\""+str+"\");");
			}
			if("Date".equals(tt[0])){
				System.out.println("batch.set"+str+"(new Date(System.currentTimeMillis()));");
			}
			if("Double".equals(tt[0])){
				System.out.println("batch.set"+str+"(1.012);");
			}
		}
		
			// sb[i].substring(0,1).toUpperCase()+sb[i].substring(1); 
	}
	private String id;

	private String abroadOppBankId;
	private String accountno;
	private String accstatus;
	private Date acctingDt;
	private Date acctDt;
	private String acctId;
	private Double acptAmt;
	private Date acptDt;
	private Date acptMatureDt;
	private String acptOrgId;
	private String acptOrgNm;
	private String applicantCorpNm;
	private String applicantCorpOrgId;
	private String applicantCountryCd;
	private String applicantDomeAreaCd;
	private String applicantNm;
	private String applicantOrgId;
	private Double assetTotalVal;
	private Double bal;
	private String balanceCd;
	private String belongOrgId;
	private String benefCorpNm;
	private String benefCorpOrgId;
	private String benefCountryCd;
	private String benefDomeAreaCd;
	private Date bisMatureDt;
	private String bondId;
	private String bondNm;
	private Double buyAmt;
	private String buyAssetType;
	private String buyCurrency;
	private Double buyPrc;
	private String categ;
	private String catCd;
	private Date collDt;
	private Date confirmMatureDt;
	private String corpAcctId;
	private String corpId;
	private String corpNm;
	private String countryCd;
	private String currencyCd;
	private String custNm;
	private String custType;
	private Double dayBalFill;
	private String debtorCountryCd;
	private String debtorDomeAreaCd;
	private String debtorNm;
	private String debtorOrgId;
	private Date declareDt;
	private String declareSeq;
	private Date deliverydate;
	private Date delivDt1;
	private Date delivDt2;
	private Double depoRate;
	private String depttype;
	private String detailSeq;
	private String domechargeAreaCd;
	private String fixDepoInd;
	private Double fixRate;
	private String floatSpread;
	private String fxTradeType;
	private String idenNo;
	private String idenType;
	private String ifchecked;
	private String ifNeedChange;
	private Date intStartDt;
	private String issuCorpAcct;
	private Date lcMatureDt;
	private Date lgMatureDt;
	private String lgType;
	private Date matureDt;
	private Double nettingBal;
	private Double nobondsissued;
	private String openOrgId;
	private String operType;
	private String oppositeAcctno;
	private String oppositeAcctName;
	private String oppositeBankCd;
	private String oppositeBankName;
	private String oppositeCountryCd;
	private String oppositeCustAttri;
	private String oppositeName;
	private Double origAssetTotalVal;
	private String origPeriodLen;
	private String origPeriodUnit;
	private Date origTxnDt;
	private String outInAcctInd;
	private String overdue;
	private String periodCon;
	private String periodLen;
	private String periodUnit;
	private String priceDatum;
	private Double rate;
	private String rateType;
	private Date releaseDt;
	private String reportId;
	private String repoPeriodLen;
	private String repoPeriodUnit;
	private String saleAssetType;
	private String securedPartyCountryCd;
	private String securedPartyDomeAreaCd;
	private String securedPartyNm;
	private String securedPartyOrgId;
	private String securitiescode;
	private String secuType;
	private Double sellAmt;
	private String sellCurrency;
	private Double sellPrc;
	private Date sltDt;
	private String subaccountno;
	private Double tolRecord;
	private String txnAttri;
	private String txnOrgId;
	private String txnType;
	private Double yieldRate;
	public ImpTolColumn(){}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
			this.id = id;
	}
	/**
	*列名
	* @return
	*/
	public String getAbroadOppBankId() {
		return abroadOppBankId;
	}
	/**
	*列名
	* @param abroadOppBankId
	*/
	public void setAbroadOppBankId(String abroadOppBankId) {
		this.abroadOppBankId = abroadOppBankId;
	}

	/**
	*列名
	* @return
	*/
	public String getAccountno() {
		return accountno;
	}
	/**
	*列名
	* @param accountno
	*/
	public void setAccountno(String accountno) {
		this.accountno = accountno;
	}

	/**
	*列名
	* @return
	*/
	public String getAccstatus() {
		return accstatus;
	}
	/**
	*列名
	* @param accstatus
	*/
	public void setAccstatus(String accstatus) {
		this.accstatus = accstatus;
	}

	/**
	*列名
	* @return
	*/
	public Date getAcctingDt() {
		return acctingDt;
	}
	/**
	*列名
	* @param acctingDt
	*/
	public void setAcctingDt(Date acctingDt) {
		this.acctingDt = acctingDt;
	}

	/**
	*列名
	* @return
	*/
	public Date getAcctDt() {
		return acctDt;
	}
	/**
	*列名
	* @param acctDt
	*/
	public void setAcctDt(Date acctDt) {
		this.acctDt = acctDt;
	}

	/**
	*列名
	* @return
	*/
	public String getAcctId() {
		return acctId;
	}
	/**
	*列名
	* @param acctId
	*/
	public void setAcctId(String acctId) {
		this.acctId = acctId;
	}

	/**
	*列名
	* @return
	*/
	public Double getAcptAmt() {
		return acptAmt;
	}
	/**
	*列名
	* @param acptAmt
	*/
	public void setAcptAmt(Double acptAmt) {
		this.acptAmt = acptAmt;
	}

	/**
	*列名
	* @return
	*/
	public Date getAcptDt() {
		return acptDt;
	}
	/**
	*列名
	* @param acptDt
	*/
	public void setAcptDt(Date acptDt) {
		this.acptDt = acptDt;
	}

	/**
	*列名
	* @return
	*/
	public Date getAcptMatureDt() {
		return acptMatureDt;
	}
	/**
	*列名
	* @param acptMatureDt
	*/
	public void setAcptMatureDt(Date acptMatureDt) {
		this.acptMatureDt = acptMatureDt;
	}

	/**
	*列名
	* @return
	*/
	public String getAcptOrgId() {
		return acptOrgId;
	}
	/**
	*列名
	* @param acptOrgId
	*/
	public void setAcptOrgId(String acptOrgId) {
		this.acptOrgId = acptOrgId;
	}

	/**
	*列名
	* @return
	*/
	public String getAcptOrgNm() {
		return acptOrgNm;
	}
	/**
	*列名
	* @param acptOrgNm
	*/
	public void setAcptOrgNm(String acptOrgNm) {
		this.acptOrgNm = acptOrgNm;
	}

	/**
	*列名
	* @return
	*/
	public String getApplicantCorpNm() {
		return applicantCorpNm;
	}
	/**
	*列名
	* @param applicantCorpNm
	*/
	public void setApplicantCorpNm(String applicantCorpNm) {
		this.applicantCorpNm = applicantCorpNm;
	}

	/**
	*列名
	* @return
	*/
	public String getApplicantCorpOrgId() {
		return applicantCorpOrgId;
	}
	/**
	*列名
	* @param applicantCorpOrgId
	*/
	public void setApplicantCorpOrgId(String applicantCorpOrgId) {
		this.applicantCorpOrgId = applicantCorpOrgId;
	}

	/**
	*列名
	* @return
	*/
	public String getApplicantCountryCd() {
		return applicantCountryCd;
	}
	/**
	*列名
	* @param applicantCountryCd
	*/
	public void setApplicantCountryCd(String applicantCountryCd) {
		this.applicantCountryCd = applicantCountryCd;
	}

	/**
	*列名
	* @return
	*/
	public String getApplicantDomeAreaCd() {
		return applicantDomeAreaCd;
	}
	/**
	*列名
	* @param applicantDomeAreaCd
	*/
	public void setApplicantDomeAreaCd(String applicantDomeAreaCd) {
		this.applicantDomeAreaCd = applicantDomeAreaCd;
	}

	/**
	*列名
	* @return
	*/
	public String getApplicantNm() {
		return applicantNm;
	}
	/**
	*列名
	* @param applicantNm
	*/
	public void setApplicantNm(String applicantNm) {
		this.applicantNm = applicantNm;
	}

	/**
	*列名
	* @return
	*/
	public String getApplicantOrgId() {
		return applicantOrgId;
	}
	/**
	*列名
	* @param applicantOrgId
	*/
	public void setApplicantOrgId(String applicantOrgId) {
		this.applicantOrgId = applicantOrgId;
	}

	/**
	*列名
	* @return
	*/
	public Double getAssetTotalVal() {
		return assetTotalVal;
	}
	/**
	*列名
	* @param assetTotalVal
	*/
	public void setAssetTotalVal(Double assetTotalVal) {
		this.assetTotalVal = assetTotalVal;
	}

	/**
	*列名
	* @return
	*/
	public Double getBal() {
		return bal;
	}
	/**
	*列名
	* @param bal
	*/
	public void setBal(Double bal) {
		this.bal = bal;
	}

	/**
	*列名
	* @return
	*/
	public String getBalanceCd() {
		return balanceCd;
	}
	/**
	*列名
	* @param balanceCd
	*/
	public void setBalanceCd(String balanceCd) {
		this.balanceCd = balanceCd;
	}

	/**
	*列名
	* @return
	*/
	public String getBelongOrgId() {
		return belongOrgId;
	}
	/**
	*列名
	* @param belongOrgId
	*/
	public void setBelongOrgId(String belongOrgId) {
		this.belongOrgId = belongOrgId;
	}

	/**
	*列名
	* @return
	*/
	public String getBenefCorpNm() {
		return benefCorpNm;
	}
	/**
	*列名
	* @param benefCorpNm
	*/
	public void setBenefCorpNm(String benefCorpNm) {
		this.benefCorpNm = benefCorpNm;
	}

	/**
	*列名
	* @return
	*/
	public String getBenefCorpOrgId() {
		return benefCorpOrgId;
	}
	/**
	*列名
	* @param benefCorpOrgId
	*/
	public void setBenefCorpOrgId(String benefCorpOrgId) {
		this.benefCorpOrgId = benefCorpOrgId;
	}

	/**
	*列名
	* @return
	*/
	public String getBenefCountryCd() {
		return benefCountryCd;
	}
	/**
	*列名
	* @param benefCountryCd
	*/
	public void setBenefCountryCd(String benefCountryCd) {
		this.benefCountryCd = benefCountryCd;
	}

	/**
	*列名
	* @return
	*/
	public String getBenefDomeAreaCd() {
		return benefDomeAreaCd;
	}
	/**
	*列名
	* @param benefDomeAreaCd
	*/
	public void setBenefDomeAreaCd(String benefDomeAreaCd) {
		this.benefDomeAreaCd = benefDomeAreaCd;
	}

	/**
	*列名
	* @return
	*/
	public Date getBisMatureDt() {
		return bisMatureDt;
	}
	/**
	*列名
	* @param bisMatureDt
	*/
	public void setBisMatureDt(Date bisMatureDt) {
		this.bisMatureDt = bisMatureDt;
	}

	/**
	*列名
	* @return
	*/
	public String getBondId() {
		return bondId;
	}
	/**
	*列名
	* @param bondId
	*/
	public void setBondId(String bondId) {
		this.bondId = bondId;
	}

	/**
	*列名
	* @return
	*/
	public String getBondNm() {
		return bondNm;
	}
	/**
	*列名
	* @param bondNm
	*/
	public void setBondNm(String bondNm) {
		this.bondNm = bondNm;
	}

	/**
	*列名
	* @return
	*/
	public Double getBuyAmt() {
		return buyAmt;
	}
	/**
	*列名
	* @param buyAmt
	*/
	public void setBuyAmt(Double buyAmt) {
		this.buyAmt = buyAmt;
	}

	/**
	*列名
	* @return
	*/
	public String getBuyAssetType() {
		return buyAssetType;
	}
	/**
	*列名
	* @param buyAssetType
	*/
	public void setBuyAssetType(String buyAssetType) {
		this.buyAssetType = buyAssetType;
	}

	/**
	*列名
	* @return
	*/
	public String getBuyCurrency() {
		return buyCurrency;
	}
	/**
	*列名
	* @param buyCurrency
	*/
	public void setBuyCurrency(String buyCurrency) {
		this.buyCurrency = buyCurrency;
	}

	/**
	*列名
	* @return
	*/
	public Double getBuyPrc() {
		return buyPrc;
	}
	/**
	*列名
	* @param buyPrc
	*/
	public void setBuyPrc(Double buyPrc) {
		this.buyPrc = buyPrc;
	}

	/**
	*列名
	* @return
	*/
	public String getCateg() {
		return categ;
	}
	/**
	*列名
	* @param categ
	*/
	public void setCateg(String categ) {
		this.categ = categ;
	}

	/**
	*列名
	* @return
	*/
	public String getCatCd() {
		return catCd;
	}
	/**
	*列名
	* @param catCd
	*/
	public void setCatCd(String catCd) {
		this.catCd = catCd;
	}

	/**
	*列名
	* @return
	*/
	public Date getCollDt() {
		return collDt;
	}
	/**
	*列名
	* @param collDt
	*/
	public void setCollDt(Date collDt) {
		this.collDt = collDt;
	}

	/**
	*列名
	* @return
	*/
	public Date getConfirmMatureDt() {
		return confirmMatureDt;
	}
	/**
	*列名
	* @param confirmMatureDt
	*/
	public void setConfirmMatureDt(Date confirmMatureDt) {
		this.confirmMatureDt = confirmMatureDt;
	}

	/**
	*列名
	* @return
	*/
	public String getCorpAcctId() {
		return corpAcctId;
	}
	/**
	*列名
	* @param corpAcctId
	*/
	public void setCorpAcctId(String corpAcctId) {
		this.corpAcctId = corpAcctId;
	}

	/**
	*列名
	* @return
	*/
	public String getCorpId() {
		return corpId;
	}
	/**
	*列名
	* @param corpId
	*/
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	/**
	*列名
	* @return
	*/
	public String getCorpNm() {
		return corpNm;
	}
	/**
	*列名
	* @param corpNm
	*/
	public void setCorpNm(String corpNm) {
		this.corpNm = corpNm;
	}

	/**
	*列名
	* @return
	*/
	public String getCountryCd() {
		return countryCd;
	}
	/**
	*列名
	* @param countryCd
	*/
	public void setCountryCd(String countryCd) {
		this.countryCd = countryCd;
	}

	/**
	*列名
	* @return
	*/
	public String getCurrencyCd() {
		return currencyCd;
	}
	/**
	*列名
	* @param currencyCd
	*/
	public void setCurrencyCd(String currencyCd) {
		this.currencyCd = currencyCd;
	}

	/**
	*列名
	* @return
	*/
	public String getCustNm() {
		return custNm;
	}
	/**
	*列名
	* @param custNm
	*/
	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

	/**
	*列名
	* @return
	*/
	public String getCustType() {
		return custType;
	}
	/**
	*列名
	* @param custType
	*/
	public void setCustType(String custType) {
		this.custType = custType;
	}

	/**
	*列名
	* @return
	*/
	public Double getDayBalFill() {
		return dayBalFill;
	}
	/**
	*列名
	* @param dayBalFill
	*/
	public void setDayBalFill(Double dayBalFill) {
		this.dayBalFill = dayBalFill;
	}

	/**
	*列名
	* @return
	*/
	public String getDebtorCountryCd() {
		return debtorCountryCd;
	}
	/**
	*列名
	* @param debtorCountryCd
	*/
	public void setDebtorCountryCd(String debtorCountryCd) {
		this.debtorCountryCd = debtorCountryCd;
	}

	/**
	*列名
	* @return
	*/
	public String getDebtorDomeAreaCd() {
		return debtorDomeAreaCd;
	}
	/**
	*列名
	* @param debtorDomeAreaCd
	*/
	public void setDebtorDomeAreaCd(String debtorDomeAreaCd) {
		this.debtorDomeAreaCd = debtorDomeAreaCd;
	}

	/**
	*列名
	* @return
	*/
	public String getDebtorNm() {
		return debtorNm;
	}
	/**
	*列名
	* @param debtorNm
	*/
	public void setDebtorNm(String debtorNm) {
		this.debtorNm = debtorNm;
	}

	/**
	*列名
	* @return
	*/
	public String getDebtorOrgId() {
		return debtorOrgId;
	}
	/**
	*列名
	* @param debtorOrgId
	*/
	public void setDebtorOrgId(String debtorOrgId) {
		this.debtorOrgId = debtorOrgId;
	}

	/**
	*列名
	* @return
	*/
	public Date getDeclareDt() {
		return declareDt;
	}
	/**
	*列名
	* @param declareDt
	*/
	public void setDeclareDt(Date declareDt) {
		this.declareDt = declareDt;
	}

	/**
	*列名
	* @return
	*/
	public String getDeclareSeq() {
		return declareSeq;
	}
	/**
	*列名
	* @param declareSeq
	*/
	public void setDeclareSeq(String declareSeq) {
		this.declareSeq = declareSeq;
	}

	/**
	*列名
	* @return
	*/
	public Date getDeliverydate() {
		return deliverydate;
	}
	/**
	*列名
	* @param deliverydate
	*/
	public void setDeliverydate(Date deliverydate) {
		this.deliverydate = deliverydate;
	}

	/**
	*列名
	* @return
	*/
	public Date getDelivDt1() {
		return delivDt1;
	}
	/**
	*列名
	* @param delivDt1
	*/
	public void setDelivDt1(Date delivDt1) {
		this.delivDt1 = delivDt1;
	}

	/**
	*列名
	* @return
	*/
	public Date getDelivDt2() {
		return delivDt2;
	}
	/**
	*列名
	* @param delivDt2
	*/
	public void setDelivDt2(Date delivDt2) {
		this.delivDt2 = delivDt2;
	}

	/**
	*列名
	* @return
	*/
	public Double getDepoRate() {
		return depoRate;
	}
	/**
	*列名
	* @param depoRate
	*/
	public void setDepoRate(Double depoRate) {
		this.depoRate = depoRate;
	}

	/**
	*列名
	* @return
	*/
	public String getDepttype() {
		return depttype;
	}
	/**
	*列名
	* @param depttype
	*/
	public void setDepttype(String depttype) {
		this.depttype = depttype;
	}

	/**
	*列名
	* @return
	*/
	public String getDetailSeq() {
		return detailSeq;
	}
	/**
	*列名
	* @param detailSeq
	*/
	public void setDetailSeq(String detailSeq) {
		this.detailSeq = detailSeq;
	}

	/**
	*列名
	* @return
	*/
	public String getDomechargeAreaCd() {
		return domechargeAreaCd;
	}
	/**
	*列名
	* @param domechargeAreaCd
	*/
	public void setDomechargeAreaCd(String domechargeAreaCd) {
		this.domechargeAreaCd = domechargeAreaCd;
	}

	/**
	*列名
	* @return
	*/
	public String getFixDepoInd() {
		return fixDepoInd;
	}
	/**
	*列名
	* @param fixDepoInd
	*/
	public void setFixDepoInd(String fixDepoInd) {
		this.fixDepoInd = fixDepoInd;
	}

	/**
	*列名
	* @return
	*/
	public Double getFixRate() {
		return fixRate;
	}
	/**
	*列名
	* @param fixRate
	*/
	public void setFixRate(Double fixRate) {
		this.fixRate = fixRate;
	}

	/**
	*列名
	* @return
	*/
	public String getFloatSpread() {
		return floatSpread;
	}
	/**
	*列名
	* @param floatSpread
	*/
	public void setFloatSpread(String floatSpread) {
		this.floatSpread = floatSpread;
	}

	/**
	*列名
	* @return
	*/
	public String getFxTradeType() {
		return fxTradeType;
	}
	/**
	*列名
	* @param fxTradeType
	*/
	public void setFxTradeType(String fxTradeType) {
		this.fxTradeType = fxTradeType;
	}

	/**
	*列名
	* @return
	*/
	public String getIdenNo() {
		return idenNo;
	}
	/**
	*列名
	* @param idenNo
	*/
	public void setIdenNo(String idenNo) {
		this.idenNo = idenNo;
	}

	/**
	*列名
	* @return
	*/
	public String getIdenType() {
		return idenType;
	}
	/**
	*列名
	* @param idenType
	*/
	public void setIdenType(String idenType) {
		this.idenType = idenType;
	}

	/**
	*列名
	* @return
	*/
	public String getIfchecked() {
		return ifchecked;
	}
	/**
	*列名
	* @param ifchecked
	*/
	public void setIfchecked(String ifchecked) {
		this.ifchecked = ifchecked;
	}

	/**
	*列名
	* @return
	*/
	public String getIfNeedChange() {
		return ifNeedChange;
	}
	/**
	*列名
	* @param ifNeedChange
	*/
	public void setIfNeedChange(String ifNeedChange) {
		this.ifNeedChange = ifNeedChange;
	}

	/**
	*列名
	* @return
	*/
	public Date getIntStartDt() {
		return intStartDt;
	}
	/**
	*列名
	* @param intStartDt
	*/
	public void setIntStartDt(Date intStartDt) {
		this.intStartDt = intStartDt;
	}

	/**
	*列名
	* @return
	*/
	public String getIssuCorpAcct() {
		return issuCorpAcct;
	}
	/**
	*列名
	* @param issuCorpAcct
	*/
	public void setIssuCorpAcct(String issuCorpAcct) {
		this.issuCorpAcct = issuCorpAcct;
	}

	/**
	*列名
	* @return
	*/
	public Date getLcMatureDt() {
		return lcMatureDt;
	}
	/**
	*列名
	* @param lcMatureDt
	*/
	public void setLcMatureDt(Date lcMatureDt) {
		this.lcMatureDt = lcMatureDt;
	}

	/**
	*列名
	* @return
	*/
	public Date getLgMatureDt() {
		return lgMatureDt;
	}
	/**
	*列名
	* @param lgMatureDt
	*/
	public void setLgMatureDt(Date lgMatureDt) {
		this.lgMatureDt = lgMatureDt;
	}

	/**
	*列名
	* @return
	*/
	public String getLgType() {
		return lgType;
	}
	/**
	*列名
	* @param lgType
	*/
	public void setLgType(String lgType) {
		this.lgType = lgType;
	}

	/**
	*列名
	* @return
	*/
	public Date getMatureDt() {
		return matureDt;
	}
	/**
	*列名
	* @param matureDt
	*/
	public void setMatureDt(Date matureDt) {
		this.matureDt = matureDt;
	}

	/**
	*列名
	* @return
	*/
	public Double getNettingBal() {
		return nettingBal;
	}
	/**
	*列名
	* @param nettingBal
	*/
	public void setNettingBal(Double nettingBal) {
		this.nettingBal = nettingBal;
	}

	/**
	*列名
	* @return
	*/
	public Double getNobondsissued() {
		return nobondsissued;
	}
	/**
	*列名
	* @param nobondsissued
	*/
	public void setNobondsissued(Double nobondsissued) {
		this.nobondsissued = nobondsissued;
	}

	/**
	*列名
	* @return
	*/
	public String getOpenOrgId() {
		return openOrgId;
	}
	/**
	*列名
	* @param openOrgId
	*/
	public void setOpenOrgId(String openOrgId) {
		this.openOrgId = openOrgId;
	}

	/**
	*列名
	* @return
	*/
	public String getOperType() {
		return operType;
	}
	/**
	*列名
	* @param operType
	*/
	public void setOperType(String operType) {
		this.operType = operType;
	}

	/**
	*列名
	* @return
	*/
	public String getOppositeAcctno() {
		return oppositeAcctno;
	}
	/**
	*列名
	* @param oppositeAcctno
	*/
	public void setOppositeAcctno(String oppositeAcctno) {
		this.oppositeAcctno = oppositeAcctno;
	}

	/**
	*列名
	* @return
	*/
	public String getOppositeAcctName() {
		return oppositeAcctName;
	}
	/**
	*列名
	* @param oppositeAcctName
	*/
	public void setOppositeAcctName(String oppositeAcctName) {
		this.oppositeAcctName = oppositeAcctName;
	}

	/**
	*列名
	* @return
	*/
	public String getOppositeBankCd() {
		return oppositeBankCd;
	}
	/**
	*列名
	* @param oppositeBankCd
	*/
	public void setOppositeBankCd(String oppositeBankCd) {
		this.oppositeBankCd = oppositeBankCd;
	}

	/**
	*列名
	* @return
	*/
	public String getOppositeBankName() {
		return oppositeBankName;
	}
	/**
	*列名
	* @param oppositeBankName
	*/
	public void setOppositeBankName(String oppositeBankName) {
		this.oppositeBankName = oppositeBankName;
	}

	/**
	*列名
	* @return
	*/
	public String getOppositeCountryCd() {
		return oppositeCountryCd;
	}
	/**
	*列名
	* @param oppositeCountryCd
	*/
	public void setOppositeCountryCd(String oppositeCountryCd) {
		this.oppositeCountryCd = oppositeCountryCd;
	}

	/**
	*列名
	* @return
	*/
	public String getOppositeCustAttri() {
		return oppositeCustAttri;
	}
	/**
	*列名
	* @param oppositeCustAttri
	*/
	public void setOppositeCustAttri(String oppositeCustAttri) {
		this.oppositeCustAttri = oppositeCustAttri;
	}

	/**
	*列名
	* @return
	*/
	public String getOppositeName() {
		return oppositeName;
	}
	/**
	*列名
	* @param oppositeName
	*/
	public void setOppositeName(String oppositeName) {
		this.oppositeName = oppositeName;
	}

	/**
	*列名
	* @return
	*/
	public Double getOrigAssetTotalVal() {
		return origAssetTotalVal;
	}
	/**
	*列名
	* @param origAssetTotalVal
	*/
	public void setOrigAssetTotalVal(Double origAssetTotalVal) {
		this.origAssetTotalVal = origAssetTotalVal;
	}

	/**
	*列名
	* @return
	*/
	public String getOrigPeriodLen() {
		return origPeriodLen;
	}
	/**
	*列名
	* @param origPeriodLen
	*/
	public void setOrigPeriodLen(String origPeriodLen) {
		this.origPeriodLen = origPeriodLen;
	}

	/**
	*列名
	* @return
	*/
	public String getOrigPeriodUnit() {
		return origPeriodUnit;
	}
	/**
	*列名
	* @param origPeriodUnit
	*/
	public void setOrigPeriodUnit(String origPeriodUnit) {
		this.origPeriodUnit = origPeriodUnit;
	}

	/**
	*列名
	* @return
	*/
	public Date getOrigTxnDt() {
		return origTxnDt;
	}
	/**
	*列名
	* @param origTxnDt
	*/
	public void setOrigTxnDt(Date origTxnDt) {
		this.origTxnDt = origTxnDt;
	}

	/**
	*列名
	* @return
	*/
	public String getOutInAcctInd() {
		return outInAcctInd;
	}
	/**
	*列名
	* @param outInAcctInd
	*/
	public void setOutInAcctInd(String outInAcctInd) {
		this.outInAcctInd = outInAcctInd;
	}

	/**
	*列名
	* @return
	*/
	public String getOverdue() {
		return overdue;
	}
	/**
	*列名
	* @param overdue
	*/
	public void setOverdue(String overdue) {
		this.overdue = overdue;
	}

	/**
	*列名
	* @return
	*/
	public String getPeriodCon() {
		return periodCon;
	}
	/**
	*列名
	* @param periodCon
	*/
	public void setPeriodCon(String periodCon) {
		this.periodCon = periodCon;
	}

	/**
	*列名
	* @return
	*/
	public String getPeriodLen() {
		return periodLen;
	}
	/**
	*列名
	* @param periodLen
	*/
	public void setPeriodLen(String periodLen) {
		this.periodLen = periodLen;
	}

	/**
	*列名
	* @return
	*/
	public String getPeriodUnit() {
		return periodUnit;
	}
	/**
	*列名
	* @param periodUnit
	*/
	public void setPeriodUnit(String periodUnit) {
		this.periodUnit = periodUnit;
	}

	/**
	*列名
	* @return
	*/
	public String getPriceDatum() {
		return priceDatum;
	}
	/**
	*列名
	* @param priceDatum
	*/
	public void setPriceDatum(String priceDatum) {
		this.priceDatum = priceDatum;
	}

	/**
	*列名
	* @return
	*/
	public Double getRate() {
		return rate;
	}
	/**
	*列名
	* @param rate
	*/
	public void setRate(Double rate) {
		this.rate = rate;
	}

	/**
	*列名
	* @return
	*/
	public String getRateType() {
		return rateType;
	}
	/**
	*列名
	* @param rateType
	*/
	public void setRateType(String rateType) {
		this.rateType = rateType;
	}

	/**
	*列名
	* @return
	*/
	public Date getReleaseDt() {
		return releaseDt;
	}
	/**
	*列名
	* @param releaseDt
	*/
	public void setReleaseDt(Date releaseDt) {
		this.releaseDt = releaseDt;
	}

	/**
	*列名
	* @return
	*/
	public String getReportId() {
		return reportId;
	}
	/**
	*列名
	* @param reportId
	*/
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	/**
	*列名
	* @return
	*/
	public String getRepoPeriodLen() {
		return repoPeriodLen;
	}
	/**
	*列名
	* @param repoPeriodLen
	*/
	public void setRepoPeriodLen(String repoPeriodLen) {
		this.repoPeriodLen = repoPeriodLen;
	}

	/**
	*列名
	* @return
	*/
	public String getRepoPeriodUnit() {
		return repoPeriodUnit;
	}
	/**
	*列名
	* @param repoPeriodUnit
	*/
	public void setRepoPeriodUnit(String repoPeriodUnit) {
		this.repoPeriodUnit = repoPeriodUnit;
	}

	/**
	*列名
	* @return
	*/
	public String getSaleAssetType() {
		return saleAssetType;
	}
	/**
	*列名
	* @param saleAssetType
	*/
	public void setSaleAssetType(String saleAssetType) {
		this.saleAssetType = saleAssetType;
	}

	/**
	*列名
	* @return
	*/
	public String getSecuredPartyCountryCd() {
		return securedPartyCountryCd;
	}
	/**
	*列名
	* @param securedPartyCountryCd
	*/
	public void setSecuredPartyCountryCd(String securedPartyCountryCd) {
		this.securedPartyCountryCd = securedPartyCountryCd;
	}

	/**
	*列名
	* @return
	*/
	public String getSecuredPartyDomeAreaCd() {
		return securedPartyDomeAreaCd;
	}
	/**
	*列名
	* @param securedPartyDomeAreaCd
	*/
	public void setSecuredPartyDomeAreaCd(String securedPartyDomeAreaCd) {
		this.securedPartyDomeAreaCd = securedPartyDomeAreaCd;
	}

	/**
	*列名
	* @return
	*/
	public String getSecuredPartyNm() {
		return securedPartyNm;
	}
	/**
	*列名
	* @param securedPartyNm
	*/
	public void setSecuredPartyNm(String securedPartyNm) {
		this.securedPartyNm = securedPartyNm;
	}

	/**
	*列名
	* @return
	*/
	public String getSecuredPartyOrgId() {
		return securedPartyOrgId;
	}
	/**
	*列名
	* @param securedPartyOrgId
	*/
	public void setSecuredPartyOrgId(String securedPartyOrgId) {
		this.securedPartyOrgId = securedPartyOrgId;
	}

	/**
	*列名
	* @return
	*/
	public String getSecuritiescode() {
		return securitiescode;
	}
	/**
	*列名
	* @param securitiescode
	*/
	public void setSecuritiescode(String securitiescode) {
		this.securitiescode = securitiescode;
	}

	/**
	*列名
	* @return
	*/
	public String getSecuType() {
		return secuType;
	}
	/**
	*列名
	* @param secuType
	*/
	public void setSecuType(String secuType) {
		this.secuType = secuType;
	}

	/**
	*列名
	* @return
	*/
	public Double getSellAmt() {
		return sellAmt;
	}
	/**
	*列名
	* @param sellAmt
	*/
	public void setSellAmt(Double sellAmt) {
		this.sellAmt = sellAmt;
	}

	/**
	*列名
	* @return
	*/
	public String getSellCurrency() {
		return sellCurrency;
	}
	/**
	*列名
	* @param sellCurrency
	*/
	public void setSellCurrency(String sellCurrency) {
		this.sellCurrency = sellCurrency;
	}

	/**
	*列名
	* @return
	*/
	public Double getSellPrc() {
		return sellPrc;
	}
	/**
	*列名
	* @param sellPrc
	*/
	public void setSellPrc(Double sellPrc) {
		this.sellPrc = sellPrc;
	}

	/**
	*列名
	* @return
	*/
	public Date getSltDt() {
		return sltDt;
	}
	/**
	*列名
	* @param sltDt
	*/
	public void setSltDt(Date sltDt) {
		this.sltDt = sltDt;
	}

	/**
	*列名
	* @return
	*/
	public String getSubaccountno() {
		return subaccountno;
	}
	/**
	*列名
	* @param subaccountno
	*/
	public void setSubaccountno(String subaccountno) {
		this.subaccountno = subaccountno;
	}

	/**
	*列名
	* @return
	*/
	public Double getTolRecord() {
		return tolRecord;
	}
	/**
	*列名
	* @param tolRecord
	*/
	public void setTolRecord(Double tolRecord) {
		this.tolRecord = tolRecord;
	}

	/**
	*列名
	* @return
	*/
	public String getTxnAttri() {
		return txnAttri;
	}
	/**
	*列名
	* @param txnAttri
	*/
	public void setTxnAttri(String txnAttri) {
		this.txnAttri = txnAttri;
	}

	/**
	*列名
	* @return
	*/
	public String getTxnOrgId() {
		return txnOrgId;
	}
	/**
	*列名
	* @param txnOrgId
	*/
	public void setTxnOrgId(String txnOrgId) {
		this.txnOrgId = txnOrgId;
	}

	/**
	*列名
	* @return
	*/
	public String getTxnType() {
		return txnType;
	}
	/**
	*列名
	* @param txnType
	*/
	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	/**
	*列名
	* @return
	*/
	public Double getYieldRate() {
		return yieldRate;
	}
	/**
	*列名
	* @param yieldRate
	*/
	public void setYieldRate(Double yieldRate) {
		this.yieldRate = yieldRate;
	}

}
