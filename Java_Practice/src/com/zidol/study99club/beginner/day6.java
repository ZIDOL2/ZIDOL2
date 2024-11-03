package com.zidol.study99club.beginner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class day6 {

	public static void main(String[] args) throws IOException {
		/*3
		BANANA 2
		PLUM 4
		BANANA 3
		*/
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String result = "";
		String cards =  "";
		String[] cardInfo = null;
		int cardCnt = Integer.parseInt(br.readLine());
		Map<String, Integer> cardMap = new HashMap<>();
		
		//입력받은 과일, 숫자 배열만든 후 Map에 담기
		for(int i=0; i<cardCnt; i++) {
			System.out.println(Arrays.toString(cardInfo));
			cards =  br.readLine();
			cardInfo = cards.split(" "); 
			
			int num = Integer.parseInt(cardInfo[1]);
				
			//같은 과일이 있으면 숫자 더해주기
			if(cardMap.containsKey(cardInfo[0])) {
				//덧셈을 위해 형변환
				int num2 = cardMap.get(cardInfo[0]);
					
				cardMap.put(cardInfo[0],num+num2);
			} else {
				cardMap.put(cardInfo[0], Integer.parseInt(cardInfo[1]));
			}
				
		}
	
		if(cardMap.containsValue(5)) {
			result = "YES";
		} else {
			result = "NO";
		}
			
		System.out.println(result);
	}
}
