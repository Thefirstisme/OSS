package com.topcheer.mq;

import java.util.ArrayList;
import java.util.List;

import com.topcheer.base.velocity.bo.Batch;
import com.topcheer.base.velocity.bo.Head;
import com.topcheer.base.velocity.util.VelocityUtils;


public class Test {
	
	public static void main(String[] args){
//		System.out.println(System.getProperty("user.dir"));
//		String returnXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><CFX> <HEAD> <APP>FTZMIS</APP> <SRC>100000000000</SRC> <DES>404290000000</DES> <VER>1.0</VER> <EditFlag>1</EditFlag> <MsgNo>910101</MsgNo> <MsgID>00000000000000003104</MsgID> <MsgRef>00000000000000002104</MsgRef> <Reserve></Reserve> <WorkDate>20100101</WorkDate> </HEAD> <MSG> <RETURN> <MsgNo>210101</MsgNo> <Result>90000</Result> <AddWord>交易成功</AddWord> <Information></Information> </RETURN> </MSG> </CFX> ";
//
//		//mapping文件地址
//		String appPath = PropertyUtils.getProperty("app.path");
//		String mapPath = appPath + "xmlmap\\" + "RhReportMapping.xml";
//		
//		//通过 CastorFactory 转换
//		//Capsule capsule = (Capsule)CastorFactory.unMarshalBean(mapPath, returnXml);
//		
//		RhReport rhReport =(RhReport)CastorFactory.unMarshalBean(mapPath, returnXml);
//		
//		// TODO
//		List list = rhReport.getCapsule().getList();
//		// TODO
//		ReturnBo returnBo = (ReturnBo)list.get(0);
//		
//		System.out.println(returnBo.getAddWord());
//		System.out.println(returnBo.getInformation());
		
		// 测试人行反馈
//		String mess = 
//			"<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?>         " +
//			"<CFX>                                                               " +
//			"    <HEAD>                                                          " +
//			"        <VER>1.0</VER>                                              " +
//			"        <SRC>100000000000</SRC>                                     " +
//			"        <DES>613002100003</DES>                                     " +
//			"        <APP>FTZMIS</APP>                                           " +
//			"        <MsgNo>910101</MsgNo>                                       " +
//			"        <MsgID>613002100003201403310000001791</MsgID>               " +
//			"        <MsgRef>613002100003201403310000001791</MsgRef>             " +
//			"        <WorkDate>20140331</WorkDate>                               " +
//			"        <EditFlag>1</EditFlag>                                      " +
//			"        <Reserve></Reserve>                                         " +
//			"    </HEAD>                                                         " +
//			"    <MSG>                                                           " +
//			"        <RETURN>                                                    " +
//			"            <AddWord>所属报文编号：210211交易成功</AddWord>          " +
//			"            <MsgNo>210211</MsgNo>                                   " +
//			"            <Result>90000</Result>                                  " +
//			"        </RETURN>                                                   " +
//			"    </MSG>                                                          " +
//			"</CFX>                                                              " ;
//
//		String msgID = XmlUtil.getResMsgRef(mess);
//		String msgNo = XmlUtil.getResMsgNo(mess);
//		TpublishService tPublishService = new TpublishService();
//		XmlUtil.setpublisRpt(tPublishService, msgID,msgNo, mess);
//		String t = "RFH       ?   ?             ?   <mcd><Msd>jms_bytes</Msd></mcd>    `<jms><Dst>queue:///PBC.613002100003.ONLINE.OUT</Dst><Tms>1398155211518</Tms><Dlv>2</Dlv></jms>  <?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> " +
//				"<CFX>                                                                                                                                                                                                                          " +
//				"    <HEAD>                                                                                                                                                                                                                     " +
//				"        <VER>1.0</VER>                                                                                                                                                                                                         " +
//				"        <SRC>100000000000</SRC>                                                                                                                                                                                                " +
//				"        <DES>613002100003</DES>                                                                                                                                                                                                " +
//				"        <APP>FTZMIS</APP>                                                                                                                                                                                                      " +
//				"        <MsgNo>910101</MsgNo>                                                                                                                                                                                                  " +
//				"        <MsgID>613002100003201404220000002374</MsgID>                                                                                                                                                                          " +
//				"        <MsgRef>613002100003201404220000002374</MsgRef>                                                                                                                                                                        " +
//				"        <WorkDate>20140422</WorkDate>                                                                                                                                                                                          " +
//				"        <EditFlag>1</EditFlag>                                                                                                                                                                                                 " +
//				"        <Reserve></Reserve>                                                                                                                                                                                                    " +
//				"    </HEAD>                                                                                                                                                                                                                    " +
//				"    <MSG>                                                                                                                                                                                                                      " +
//				"        <RETURN>                                                                                                                                                                                                               " +
//				"            <AddWord>所属报文编号：210401交易成功</AddWord>                                                                                                                                                                    " +
//				"            <MsgNo>210401</MsgNo>                                                                                                                                                                                              " +
//				"            <Result>90000</Result>                                                                                                                                                                                             " +
//				"        </RETURN>                                                                                                                                                                                                              " +
//				"    </MSG>                                                                                                                                                                                                                     " +
//				"</CFX>                                                                                                                                                                                                                         ";
//
//		System.out.println(t.substring(t.indexOf("<?xml"), t.length()));
		
		
		
		//sendxXmlToMQ();
		//String t = "abc";
		//System.out.println(t.indexOf("d"));
		//String d = t.substring(t.indexOf("d"),t.length());
		//System.out.println(d);
//		Head head =  new Head("msgNo","iddddddddd","declareDt");
//		List<Batch> bList = new ArrayList<Batch>();
//		Batch bat = new Batch();
//		bat.setResult("result1111111");
//		bat.setAddWord("addWord222222");
//		bat.setTolRecord("tolRecord444444");
//		bat.setInformation("information333333");
//		bList.add(bat);
//		String xmlCon = VelocityUtils.marge(head, bList, "ZMQ_Auto_RE_RH");
//		System.out.println(xmlCon);
		
		
		String t= "!@#$%^&*()_+五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八";
		System.out.println(t.matches("(.|\n){1,128}"));
		
	}
	
	
	public static void sendxXmlToMQ(){
		String t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002349</MsgID><MsgRef>613002100003201404220000002349</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002350</MsgID><MsgRef>613002100003201404220000002350</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002351</MsgID><MsgRef>613002100003201404220000002351</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002352</MsgID><MsgRef>613002100003201404220000002352</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002353</MsgID><MsgRef>613002100003201404220000002353</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002354</MsgID><MsgRef>613002100003201404220000002354</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002355</MsgID><MsgRef>613002100003201404220000002355</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002356</MsgID><MsgRef>613002100003201404220000002356</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002357</MsgID><MsgRef>613002100003201404220000002357</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002358</MsgID><MsgRef>613002100003201404220000002358</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002359</MsgID><MsgRef>613002100003201404220000002359</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002360</MsgID><MsgRef>613002100003201404220000002360</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002361</MsgID><MsgRef>613002100003201404220000002361</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002362</MsgID><MsgRef>613002100003201404220000002362</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002363</MsgID><MsgRef>613002100003201404220000002363</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002364</MsgID><MsgRef>613002100003201404220000002364</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002365</MsgID><MsgRef>613002100003201404220000002365</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002366</MsgID><MsgRef>613002100003201404220000002366</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002367</MsgID><MsgRef>613002100003201404220000002367</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002368</MsgID><MsgRef>613002100003201404220000002368</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002369</MsgID><MsgRef>613002100003201404220000002369</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002370</MsgID><MsgRef>613002100003201404220000002370</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002371</MsgID><MsgRef>613002100003201404220000002371</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002372</MsgID><MsgRef>613002100003201404220000002372</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002373</MsgID><MsgRef>613002100003201404220000002373</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110); 
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002374</MsgID><MsgRef>613002100003201404220000002374</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110);
		t110 = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"yes\"?> <CFX><HEAD><VER>1.0</VER><SRC>100000000000</SRC><DES>613002100003</DES><APP>FTZMIS</APP><MsgNo>910101</MsgNo><MsgID>613002100003201404220000002378</MsgID><MsgRef>613002100003201404220000002378</MsgRef><WorkDate>20140422</WorkDate><EditFlag>1</EditFlag><Reserve></Reserve></HEAD><MSG><RETURN><AddWord>所属报文编号：210101交易成功</AddWord><MsgNo>210101</MsgNo><Result>90000</Result></RETURN></MSG> </CFX>"; MQSender.addMess(t110);  
		MQSender.mqSendM.run();
	}
	
	
	
	
}
