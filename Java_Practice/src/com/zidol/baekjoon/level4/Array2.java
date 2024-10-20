package com.zidol.baekjoon.level4;

import java.util.Scanner;

public class Array2 {

	
	/*
	 * 첫째 줄에 N과 X가 주어진다. (1 ≤ N, X ≤ 10,000)

		둘째 줄에 수열 A를 이루는 정수 N개가 주어진다. 주어지는 정수는 모두 1보다 크거나 같고, 10,000보다 작거나 같은 정수이다.
	 * */
	
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		
		System.out.print("N : ");
		int N = sc.nextInt();
		System.out.print("X : ");
		int X = sc.nextInt();
		
		int[] arr = new int[N];
		
		for(int i=0; i<N; i++) {
			arr[i] += sc.nextInt();
		}

		for(int j=0; j<arr.length; j++) {
			if(arr[j] < X) {
				System.out.print(arr[j]+" ");
			}
		}
		
		sc.close();
		
		
	}
	
	
}
