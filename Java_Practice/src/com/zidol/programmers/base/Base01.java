package com.zidol.programmers.base;

import java.util.Arrays;

public class Base01 {
	
	//문자열 정수형으로 바꾸기
	public int solution(String n_str) {
		int answer = 0;
        answer = Integer.parseInt(n_str);
        return answer; 
    } 
	
	//카운트 업
	public int[] solution2(int start_num, int end_num) {
		//배열의 길이
        int size = end_num-start_num+1;
        
        //배열 선언(배열의 길이는 size)
        int[] answer = new int[size];
        
        //반복문으로 배열 채우기
        for(int i=0; i<size; i++){
            answer[i] = start_num++;
        }
        //확인
        System.out.println(Arrays.toString(answer));
        
        return answer;
    }
}
