package com.topcheer.fileio;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import com.topcheer.base.utils.PropertyUtils;
import com.topcheer.rpt.bo.Tpublish;

public class OSSFileWriter {

	//默认工程路径
	public static String APPPATH = PropertyUtils.getProperty("app.path");
	//默认报送文件路径：  /share_zmq/Send/YYYYMMDD
	public static String XML_BAKPATH_SEND = PropertyUtils.getProperty("topcheer.xml.send");
	//默认接受人行路径:      /share_zmq/FeedBack/YYYYMMDD
	public static String XML_BAKPATH_FEEDBACK =  PropertyUtils.getProperty("topcheer.xml.feedBack");
	//默认人行下发的路径   /share_zmq/FTZACCREL/YYYYMMDD
	public static String XML_BAKPATH_FTZACCREL =  PropertyUtils.getProperty("topcheer.xml.FTZACCREL");
	
	public static void main(String[] args) throws Exception {
//		String filePash = "";
////		String filePash = "D:\\新建文件夹";
//		String fileName = "111111_20140528_同业往来";
//		String actionName = "";
//		String xml = "<?suf9wiefklsdfu9weiorjsfduifk>";
////		fileNameSpell(filePash, fileName, actionName, xml);
//		Tpublish tpublish = new Tpublish();
//		tpublish.setDataDt("2014-05-26");
//		tpublish.setRptId("210103");
//		tpublish.setMsgid("213123");
//		tpublish.setXml(xml);
//		createFile(tpublish,XML_BAKPATH_FTZACCREL );
	}

	/**
	 * 根据传入字符串
	 * 
	 * @param filePush
	 *            路径
	 * @param fileName
	 *            文件名字
	 * @param actionName
	 *            备份区分后缀名
	 * @param fileContent
	 *            文件内容
	 * @throws Exception
	 */
	public static void createFile(String filePash, String fileName,
			String actionName, String fileContent) throws Exception {
		if (filePash == "") {
			filePash = "";
		}
		filePash = isExist(filePash);
		if(actionName.indexOf(".")==-1){
			actionName=actionName + ".xml";
		}
		String fileName1 = fileName + "_" + actionName;
		writer(filePash, fileName1, fileContent);
	}

	/**
	 * 根据传入对象
	 * 
	 * @param filePath
	 * @param tpublish
	 * @param actionName
	 * @throws Exception
	 * @throws IOException
	 */
	public static void createFile(String filePath,String fileName ,
			Tpublish tpublish) throws Exception {
		String dateString = getDateString().substring(0, 8);
		boolean os = System.getProperties().getProperty("file.separator").equals("\\");
		if (filePath == "") {
			if(os){
				filePath = fileName+"\\"+dateString;
			}else{
				filePath = fileName+"/"+dateString;
			}
		}
		filePath=isExist(filePath);
//		if(fileName.indexOf(".")==-1){
//			fileName=fileName + ".xml";
//		}
		String fileContent = getFileContent(tpublish, fileName);
		fileName = getFileName(tpublish, fileName);
		writer(filePath, fileName, fileContent);
	}

	public static void createFile(Tpublish tpublish,String fileName) throws Exception{
		String filePash="";
		createFile(filePash, fileName, tpublish);
	}

	/**
	 * 写入文件
	 * 
	 * @param filePash
	 * @param fileName
	 * @param xml
	 * @throws Exception
	 * @throws IOException
	 */
	public static void writer(String filePash, String fileName, String fileContent)
			throws Exception, IOException {
		OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(
				filePash + fileName), "GBK");
		out.write(fileContent);
		out.close();
	}

	/**
	 *  判断文件夹是否存在并根据操作系统进行拼写路径或截取路径
	 * */
	public static String isExist(String filePath) {
		File fp = new File(filePath);  
		// os表示当前系统为windows
		boolean os = System.getProperties().getProperty("file.separator").equals("\\");
		if (!fp.exists()) {  
			String paths[];
			if(os){
				 paths = filePath.split("\\\\");
				 return createFolder(paths)+"\\";
			}else{
				 paths = filePath.split("/");
				 return createFolder(paths)+"/";
			}
		} else {
			if(os){
				return filePath+"\\";
			}else{
				return filePath+"/";
			}
		}
	}
	
	/**
	 * 文件夹生成
	 */
	public static String createFolder(String[] args){
		String dir = args[0];
		for (int i = 1; i < args.length; i++) {
			try {
				dir = dir + File.separator + args[i];
				File dirFile = new File(dir);
				if (!dirFile.exists()) {
					dirFile.mkdir();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return dir;
	}
	
	/**
	 * 获得文件名
	 * @return
	 */
//	public static String getFileName(Tpublish tpublish,String actionName){
//		String dateString = getDateString();
//		String fileName = "FTZ_"+tpublish.getRptId() + "_" + tpublish.getDataDt()
//				+ "_" + tpublish.getMsgid() + "_" + dateString + "_"
//				+ actionName;
//		return fileName;
//	}
	
	public static String getFileName(Tpublish tpublish,String folderPath){
		String dateString = getDateString();
		String fileName ="FTZ_"+tpublish.getRptId() + "_" + tpublish.getDataDt()
				+ "_" + tpublish.getMsgid() + "_" + dateString ;
		if(folderPath.equals(XML_BAKPATH_FEEDBACK)){
			 fileName = fileName+ "_ERR.xml";
		}else{
			fileName = fileName+ ".xml";
		}
		return fileName;
	}
	
	
	
	/**
	 * 获得时间字符串
	 * @return
	 */
	public static String getDateString(){
		 //获取系统当前时间，并转成非时间格式的字符串
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = sdf.format(new Date()).replaceAll("\\s*", "")
				.replace(":", "").replace("-", "");
		return dateString;
	}
	
	/**
	 * 获取要写入的文件内容
	 * @return
	 */
	private static String getFileContent(Tpublish tpublish, String fileName) {
		String fileContent = "";
		if(fileName.equals(XML_BAKPATH_FEEDBACK)){
			fileContent = tpublish.getReXml();
		}else{
			fileContent = tpublish.getXml();
		}
		return fileContent;
	}
	
}
