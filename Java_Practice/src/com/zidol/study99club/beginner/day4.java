package com.zidol.study99club.beginner;

import java.util.HashMap;
import java.util.Map;

public class day4 {

	public static void main(String[] args) {
	
		System.out.println(solution("one4seveneight"));
		
	}
	
	/*
	 *  숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다.
	 *  s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.
	 */
	 public static int solution(String s) {
	        int answer = 0;
	        String[] strNum = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
	        //HashMap 생성
	        Map<String, Integer> map = new HashMap<>();
	        
	        for(int i=0; i<strNum.length; i++) {
	        	map.put(strNum[i], i);
	        }
	        
	        
	        return answer;
	    }

}
