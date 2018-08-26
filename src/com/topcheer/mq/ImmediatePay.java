package com.topcheer.mq;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

public class ImmediatePay {
	public final static int SUCCESS = 1;
	public final static int FAILURE = 2;
	public final static int DELAY = 3;

	public final static String LCP_SUCCESS = "90000";

	
	public static ConcurrentHashMap<String, Object> seqMap = new ConcurrentHashMap<String, Object>();

	private static Timer timer = new Timer(true);

	/**
	 * 
	 * @param params
	 *            ���䵽���ĵĲ���
	 * @param rtMap
	 *            ���ķ��ص���Ϣ
	 * @return ״̬��
	 */
	public static void pay(List<Map> rpts) throws Exception {
		
		for(Map m : rpts){
			MQSender.addMess(m.get("xml").toString());			
		}
		
		MQSender.mqSendM.run();		
		
		do {			
			Thread.sleep(100);
		} while (!MQReceiver.hasSentM.isEmpty());
		
	}

	static class DelayNotifyTask extends TimerTask {
		Object waitKey;

		DelayNotifyTask(Object waitKey) {
			this.waitKey = waitKey;
		}

		@Override
		public void run() {
			System.out.println("DelayNotifyTask 1");
			synchronized (waitKey) {
				System.out.println("DelayNotifyTask 2");
				waitKey.notify();
			}
		}
	}

	// test
	public static void main(String argsp[]) {
		try {
			List<Map> rpts = new ArrayList<Map>();	
			String xml = ""
					+"<?xml version=\"1.0\" encoding=\"GBK\"?>"
					+"<CFX>"
					+"	<HEAD>"
					+"		<VER>1.0</VER>"
					+"		<SRC>102100009980</SRC>"
					+"		<DES>100000000000</DES>"
					+"		<APP>FTZMIS</APP>"
					+"		<MsgNo>210101</MsgNo>"
					+"		<MsgID>20051024092733000440</MsgID>"
					+"		<MsgRef>20051024092733000440</MsgRef>"
					+"		<WorkDate>20051024</WorkDate>"
					+"<EditFlag>1</EditFlag>"
					+"		<Reserve>String</Reserve>"
					+"	</HEAD>"
					+"	<MSG>"
					+"		<FTZ210101>"
					+"			<BATCH>"
					+"				<AccountNo>4312121212121</AccountNo>"
					+"				<AccountName>帐户1</AccountName>"
					+"				<AccType>01</AccType>"
					+"				<DepositRate>0.0225</DepositRate>"
					+"				<CustomType>1</CustomType>"
					+"				<BalanceCode>121212121</BalanceCode>"
					+"				<DocumentType>11</DocumentType>"
					+"				<DocumentNo>12121211-x</DocumentNo>"
					+"				<Currency>CNY</Currency>"
					+"				<Balance>121212121.12</Balance>"
					+"				<SubmitDate>20130801</SubmitDate>"
					+"				<TotalCount>2</TotalCount>"
					+"				<AccOrgCode>121212121212</AccOrgCode>"
					+"</BATCH>"
					+"<TRANLIST>"
					+"				<TRAN>"
					+"				<SeqNo>000001</SeqNo>"
					+"					<CDFlag>2</CDFlag>"
					+"					<TranDate>20130801</TranDate>"
					+"					<OrgTranDate></OrgTranDate>"
					+"					<Amount>200.00</Amount>"
					+"					<OppAccount>4312121212121</OppAccount>"
					+"					<OppName>客户2</OppName>"
					+"					<OppBankCode>121212121212</OppBankCode>"
					+"					<CountryCode>CHN</CountryCode>"
					+"					<DistrictCode>121212</DistrictCode>"
					+"					<TranType>123456</TranType>"
					+"					<TermLength></TermLength>"
					+"					<TermUnit></TermUnit>"
					+"					<ExpireDate></ExpireDate>"
					+"				</TRAN>"
					+"				<TRAN>"
					+"				<SeqNo>000002</SeqNo>"
					+"					<CDFlag>2</CDFlag>"
					+"					<TranDate>20130801</TranDate>"
					+"					<OrgTranDate></OrgTranDate>"
					+"					<Amount>200.00</Amount>"
					+"						<OppAccount>4312121212121</OppAccount>"
					+"						<OppName>客户2</OppName>"
					+"						<OppBankCode>121212121212</OppBankCode>"
					+"						<CountryCode>CHN</CountryCode>"
					+"						<DistrictCode>121212</DistrictCode>"
					+"					<TranType>123456</TranType>"
					+"					<TermLength></TermLength>"
					+"						<TermUnit></TermUnit>"
					+"						<ExpireDate></ExpireDate>"
					+"				</TRAN>"
					+"		</TRANLIST>"
					+"</FTZ210101>"
					+"		<FTZ210101>"
					+"			<BATCH>"
					+"				<AccountNo>4312121212133</AccountNo>"
					+"				<AccountName>帐户2</AccountName>"
					+"				<AccType>01</AccType>"
					+"				<DepositRate>0.0225</DepositRate>"
					+"				<CustomType>1</CustomType>"
					+"				<BalanceCode>121212121</BalanceCode>"
					+"				<DocumentType>11</DocumentType>"
					+"				<DocumentNo>12121211-x</DocumentNo>"
					+"				<Currency>CNY</Currency>"
					+"				<Balance>121212121.12</Balance>"
					+"				<SubmitDate>20130801</SubmitDate>"
					+"				<TotalCount>0</TotalCount>"
					+"				<AccOrgCode>121212121212</AccOrgCode>"
					+"</BATCH>"
					+"<TRANLIST/>"
					+"		</FTZ210101>"	
					+"	</MSG>"
					+"</CFX>";			
			Map m = new HashMap();
			m.put("rptid","210101");
			m.put("xml", xml);
			rpts.add(m);
			
			String xml2 = ""
					+"<?xml version=\"1.0\" encoding=\"GBK\"?>"
					+"<CFX>"
					+"	<HEAD>"
					+"		<VER>1.0</VER>"
					+"		<SRC>102100009980</SRC>"
					+"		<DES>100000000000</DES>"
					+"		<APP>FTZMIS</APP>"
					+"		<MsgNo>210102</MsgNo>"
					+"		<MsgID>20051024092733000440</MsgID>"
					+"		<MsgRef>20051024092733000440</MsgRef>"
					+"		<WorkDate>20051024</WorkDate>"
					+"<EditFlag>1</EditFlag>"
					+"		<Reserve>String</Reserve>"
					+"	</HEAD>"
					+"	<MSG>"
					+"		<FTZ210101>"
					+"			<BATCH>"
					+"				<AccountNo>4312121212121</AccountNo>"
					+"				<AccountName>帐户1</AccountName>"
					+"				<AccType>01</AccType>"
					+"				<DepositRate>0.0225</DepositRate>"
					+"				<CustomType>1</CustomType>"
					+"				<BalanceCode>121212121</BalanceCode>"
					+"				<DocumentType>11</DocumentType>"
					+"				<DocumentNo>12121211-x</DocumentNo>"
					+"				<Currency>CNY</Currency>"
					+"				<Balance>121212121.12</Balance>"
					+"				<SubmitDate>20130801</SubmitDate>"
					+"				<TotalCount>2</TotalCount>"
					+"				<AccOrgCode>121212121212</AccOrgCode>"
					+"</BATCH>"
					+"<TRANLIST>"
					+"				<TRAN>"
					+"				<SeqNo>000001</SeqNo>"
					+"					<CDFlag>2</CDFlag>"
					+"					<TranDate>20130801</TranDate>"
					+"					<OrgTranDate></OrgTranDate>"
					+"					<Amount>200.00</Amount>"
					+"					<OppAccount>4312121212121</OppAccount>"
					+"					<OppName>客户2</OppName>"
					+"					<OppBankCode>121212121212</OppBankCode>"
					+"					<CountryCode>CHN</CountryCode>"
					+"					<DistrictCode>121212</DistrictCode>"
					+"					<TranType>123456</TranType>"
					+"					<TermLength></TermLength>"
					+"					<TermUnit></TermUnit>"
					+"					<ExpireDate></ExpireDate>"
					+"				</TRAN>"
					+"				<TRAN>"
					+"				<SeqNo>000002</SeqNo>"
					+"					<CDFlag>2</CDFlag>"
					+"					<TranDate>20130801</TranDate>"
					+"					<OrgTranDate></OrgTranDate>"
					+"					<Amount>200.00</Amount>"
					+"						<OppAccount>4312121212121</OppAccount>"
					+"						<OppName>客户2</OppName>"
					+"						<OppBankCode>121212121212</OppBankCode>"
					+"						<CountryCode>CHN</CountryCode>"
					+"						<DistrictCode>121212</DistrictCode>"
					+"					<TranType>123456</TranType>"
					+"					<TermLength></TermLength>"
					+"						<TermUnit></TermUnit>"
					+"						<ExpireDate></ExpireDate>"
					+"				</TRAN>"
					+"		</TRANLIST>"
					+"</FTZ210101>"
					+"		<FTZ210101>"
					+"			<BATCH>"
					+"				<AccountNo>4312121212133</AccountNo>"
					+"				<AccountName>帐户2</AccountName>"
					+"				<AccType>01</AccType>"
					+"				<DepositRate>0.0225</DepositRate>"
					+"				<CustomType>1</CustomType>"
					+"				<BalanceCode>121212121</BalanceCode>"
					+"				<DocumentType>11</DocumentType>"
					+"				<DocumentNo>12121211-x</DocumentNo>"
					+"				<Currency>CNY</Currency>"
					+"				<Balance>121212121.12</Balance>"
					+"				<SubmitDate>20130801</SubmitDate>"
					+"				<TotalCount>0</TotalCount>"
					+"				<AccOrgCode>121212121212</AccOrgCode>"
					+"</BATCH>"
					+"<TRANLIST/>"
					+"		</FTZ210101>"	
					+"	</MSG>"
					+"</CFX>";			
			Map m2 = new HashMap();
			m2.put("rptid","210102");
			m2.put("xml", xml2);
			rpts.add(m2);
			pay(rpts);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
