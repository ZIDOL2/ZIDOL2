package com.zidol.study99club.beginner;

import java.util.Scanner;

public class day1 {

	public static boolean main(String[] args) {
		boolean answer= true;
	    int pCnt = 0; // P/p count 변수
	    int yCnt = 0; // Y/y count 변수
		
	    Scanner sc = new Scanner(System.in);
	    String s = sc.next();
	    
	    // 문제상 대소문자 구분하지 않아 toLowerCase() 사용 및 split 사용하여 배열생성
	    String[] strArr = s.toLowerCase().split("");
		
	    // 반복문을 통해 해당 문자열이 p면 pCnt, y면 yCnt 증가
	    // else는 없어도 다음 i가 수행되지만, 예외처리 코딩습관을 기르기 위해 사용
	    for(int i=0; i<strArr.length; i++) {
	        if(strArr[i].equals("p")) {
	            pCnt++;
	        } else if(strArr[i].equals("y")) {
	            yCnt++;
	        } else {
	            continue;
	        }
	    }
		
	    // pCnt와 yCnt가 일치하면 개수가 같아 true 반환
	    if(pCnt == yCnt) {
	        answer = true;
	    } else {
	        answer = false;
	    }
		
	    sc.close();
	    return answer;
	}
	
}
