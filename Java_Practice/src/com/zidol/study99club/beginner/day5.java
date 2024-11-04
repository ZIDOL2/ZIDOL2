package src.com.zidol.study99club.beginner;

import java.util.HashMap;

public class day5 {

	public static void main(String[] args) {
		System.out.println(solutions(5,".... . .-.. .-.. ---"));
	}

	public static String solutions(int N, String s) {
		String result = "";
		
		HashMap<String, String> map = new HashMap<String, String>(); 
		
		
		map.put(".-","A");
		map.put("-...","B");
		map.put("-.-.","C");
		map.put("-..","D");
		map.put(".","E");
		map.put("..-.","F");
		map.put("--.","G");
		map.put("....","H");
		map.put("..","I");
		map.put(".---","J");
		map.put("-.-","K");
		map.put(".-..","L");
		map.put("--","M");
		map.put("-.","N");
		map.put("---","O");
		map.put(".--.","P");
		map.put("--.-","Q");
		map.put(".-.","R");
		map.put("...","S");
		map.put("-","T");
		map.put("..-","U");
		map.put("...-","V");
		map.put(".--","W");
		map.put("-..-","X");
		map.put("-.--","Y");
		map.put("--..","Z");
		map.put(".----","1");
		map.put("..---","2");
		map.put("...--","3");
		map.put("....-","4");
		map.put(".....","5");
		map.put("-....","6");
		map.put("--...","7");
		map.put("---..","8");
		map.put("----.","9");
		map.put("-----","0");
		map.put("--..--",",");
		map.put(".-.-.-",".");
		map.put("..--..","?");
		map.put("---...",":");
		map.put("-....-","-");
		map.put(".--.-.","@");

		//입력받은 모스부호 배열로 변경
		String[] morse = s.split(" ");
		for(int i=0; i<N; i++) {
			result += map.get(morse[i]);
		}
		
		return result;
	}
}
