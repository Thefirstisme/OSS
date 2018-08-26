package test;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Set;

public class TestMap {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// 无序
		//Map a = new HashMap();
		
		LinkedHashMap a = (LinkedHashMap) new LinkedHashMap();
		
		for(int i =0; i <100; i++){
			a.put(i, i+"");
		}
		System.out.println("size-----> " + a.size());
		Set s = a.keySet();
		Iterator it = s.iterator();
		while (it.hasNext()) {
			Integer key = (Integer) it.next();
			String value = (String) a.get(key);
			System.out.println(key + " " + value);
		}

		// LinkedHashMap b = new LinkedHashMap();

	}

}
