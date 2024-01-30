package com.zidol.baekjoon.level1;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		int A = sc.nextInt();
		int B = sc.nextInt();

		int plus = A + B, miu = A - B, mul = A * B, div = A / B, rem = A % B;

		if (A >= 1 && B <= 10000) {
			System.out.printf("%d \n%d \n%d \n%d \n%d", plus, miu, mul, div, rem);
		}
		sc.close();

	}
}
