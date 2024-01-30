package com.zidol.baekjoon.level1;

import java.util.Scanner;

public class ThreeAdd {

	public static void main(String[] agrs) {
		Scanner sc = new Scanner(System.in);

		long A = sc.nextLong();
		long B = sc.nextLong();
		long C = sc.nextLong();

		if (A > 0 && B > 0 && C > 0 && (A <= Math.pow(10, 12)) &&( B <= Math.pow(10, 12)) && C <= (Math.pow(10, 12))) {
			System.out.println(A+B+C);

			sc.close();
		}
	}
}
