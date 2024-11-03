package com.zidol.study99club.beginner;

public class day2 {

	public static void main(String[] args) {
	
		System.out.println(solution("1012512112451215421545231562156321532155","111122223333222244"));
		
	}
	
	
	 public static int solution(String t, String p) {
	        int answer = 0;
	        int pLen = p.length();
	        int pInt = Integer.parseInt(p);
	        
	        for(int i=0; i<t.length() - pLen + 1; i++) {
	            String str = t.substring(i, i+pLen);
	            
	            if(Integer.parseInt(str) <= pInt) {
	            	answer++;
	            }
	        }
	        
	        return answer;
	    }

}
