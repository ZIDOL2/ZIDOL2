package com.zidol.baekjoon.level1;

import java.util.Scanner;

public class Rest {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);

		int A = sc.nextInt();
		int B = sc.nextInt();
		int C = sc.nextInt();

		int total1 = (A + B) % C;
		int total2 = ((A % C) + (B % C)) % C;
		int total3 = (A * B) % C;
		int total4 = ((A % C) * (B % C)) % C;

		if (A > 1 && B > 1 && C > 1 && A < 10001 && B < 10001 && C < 10001) {
			System.out.printf("%d \n%d \n%d \n%d", total1, total2, total3, total4);
		}

		sc.close();

	}

}
