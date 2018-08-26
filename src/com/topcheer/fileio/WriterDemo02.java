package com.topcheer.fileio;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.topcheer.jdbc.JdbcOracleBaseService;
public class WriterDemo02 extends JdbcOracleBaseService{
	
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs =null;
	public static void main(String args[]) throws Exception{	// 异常抛出，不处理
		WriterDemo02 w = new WriterDemo02();
		w.write(w.getXml());
	}
	
	public void write(Map<String,String> map)  throws Exception{
		 Set<Map.Entry<String, String>> set = map.entrySet();
	        for (Iterator<Map.Entry<String, String>> it = set.iterator(); it.hasNext();) {
	            Map.Entry<String, String> entry = (Map.Entry<String, String>) it.next();
				OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream("d:\\20140509" + File.separator + entry.getKey().replace("/", "_")+".XML"),"GBK");
				// 第3步、进行写操作
				out.write(entry.getValue()) ;// 将内容输出，保存文件
				// 第4步、关闭输出流
				out.close() ;// 关闭输出流
	        }
	}
	
	public Map<String,String> getXml() {
		String reXml = "";
		String title = "";
		Map<String,String> map = new HashMap<String,String>();
		conn = this.getConnection();
		String sql = "select RPT_NM,data_dt,XML,data_dt,RPT_ID FROM ZMQ_T_PUBLISH_RPT where DATA_DT = '2014-05-09'   ";
		try {
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while(rs.next()) {
				reXml = rs.getString(3);
				title = "TOPCHEER_"+rs.getString("RPT_ID")+"_14050900";
				map.put(title, reXml);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			this.release(rs, ps, conn);
		}
		return map;
	}
	
}