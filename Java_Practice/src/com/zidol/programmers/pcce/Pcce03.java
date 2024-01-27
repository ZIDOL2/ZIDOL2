package com.zidol.programmers.pcce;

import java.util.Scanner;

public class Pcce03 {
	// PCCE 기출문제 3번 / 나이 계산
	public static void main(String[] args) {
		//2030년에 몇 살인지 출력하도록 빈칸을 채워 코드 완성
		Scanner sc = new Scanner(System.in);
		int year = sc.nextInt();
		String age_type = sc.next();
		int answer = 0;

		if (age_type.equals("Korea")) {
			answer = 2030 - year + 1;
		} else if (age_type.equals("Year")) {

			answer = 2030 - year;
		}

		System.out.println(answer);
	}
}
