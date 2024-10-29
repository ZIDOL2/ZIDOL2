package com.zidol.study99club.beginner;

public class day2 {

	public void main(String[] args) {
		
		solution("3141592","271");
		
	}
	
	
	 public int solution(String t, String p) {
	        int answer = 0;
	        
	        int pLen = p.length();
	        
	        System.out.println(pLen);
	        /*예를 들어, t="3141592"이고 p="271" 인 경우, 
	         * t의 길이가 3인 부분 문자열은 314, 141, 415, 159, 592입니다.
	         *  이 문자열이 나타내는 수 중 271보다 작거나 같은 수는 141, 159 2개 입니다.
	         * */
	         
			/*
			 * for(int i=0; i<t.length(); i++) {
			 * 
			 * }
			 */
	        
	        
	        return answer;
	    }

}
