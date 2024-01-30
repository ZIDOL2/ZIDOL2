package com.zidol.baekjoon.level2;

import java.util.Scanner;

public class Year {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);

		int num = sc.nextInt();

		if (num > 0 && num < 4001) {
			if (((num % 4 == 0) && (num % 100 != 0)) || (num % 400 == 0)) {
				System.out.println(1);
			} else if (num % 100 == 0) {
				System.out.println(0);
			} else {
				System.out.println(0);
			}
		} else {
			System.out.println(0);
		}

		sc.close();

	}

}
