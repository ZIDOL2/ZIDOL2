package com.zidol.baekjoon.level2;

import java.util.Scanner;

public class Oven {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		
		int A = sc.nextInt();
		int B = sc.nextInt();
		int C = sc.nextInt();
		
		int min = (A*60)+B; //전체 시간을 분으로 바꿔주기
		min = min+C; //오븐 작동 시간 더해주기
		
		int h = (min/60)%24; //분으로 만든 시간을 24시간 단위로 만들어주기
												//25시간이 될 수도 있기때문에 24로 나눈 나머지를 시간으로 설정
		int m=min%60;
		
		System.out.println(h+" "+m);
	
		sc.close();
	}

}
