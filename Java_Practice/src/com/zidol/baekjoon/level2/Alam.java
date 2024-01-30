package com.zidol.baekjoon.level2;

import java.util.Scanner;

public class Alam {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);

		int H = sc.nextInt();
		int M = sc.nextInt();

		if (H > -1 && H < 24 && M > -1 && M < 60) {
			if (M < 45) {
				H--;
				M= 60 - (45 - M);
				if (H < 0) {
					H = 23;
				}
				System.out.println(H + " " + M);
			} else {
				System.out.println(H + " " + (M - 45));
			}
		}
		sc.close();
	}

}
