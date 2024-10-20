package com.zidol.programmers.base;

import java.util.Arrays;
import java.util.Scanner;

public class Base01 {

	// 문자열 정수형으로 바꾸기
	public int solution01(String n_str) {
		int answer = 0;
		answer = Integer.parseInt(n_str);
		return answer;
	}

	// 카운트 업
	public int[] solution02(int start_num, int end_num) {
		// 배열의 길이
		int size = end_num - start_num + 1;

		// 배열 선언(배열의 길이는 size)
		int[] answer = new int[size];

		// 반복문으로 배열 채우기
		for (int i = 0; i < size; i++) {
			answer[i] = start_num++;
		}
		// 확인
		System.out.println(Arrays.toString(answer));

		return answer;
	}

	//문자열 출력하기
	public void solution03() {
		Scanner sc = new Scanner(System.in);
        String a = sc.next();
        System.out.println(a);  
	}
	
	// 정수 a와 b 출력하기
	public void solution04() {
		try (Scanner sc = new Scanner(System.in)) {
			int a = sc.nextInt();
			int b = sc.nextInt();

			System.out.println("a = " + a + "\nb = " + b);
		}
	}

	//문자열 반복해서 출력하기
	public void solution05() {
		try (Scanner sc = new Scanner(System.in)) {
			String str = sc.next();
			int n = sc.nextInt();

			for (int i = 0; i < n; i++) {
				System.out.print(str+"\t");
			}
		}
	}

	
}
