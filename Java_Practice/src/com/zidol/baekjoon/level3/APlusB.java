package com.zidol.baekjoon.level3;

import java.util.Scanner;
public class APlusB {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		int n = sc.nextInt();
		int sum = 0;
		
		for (int i = 1; i < n+1; i++) {
			sum += i;
			
		}
		System.out.println(sum);
		
		sc.close();
	}
}
