package com.zidol.baekjoon.level4;

import java.util.Scanner;

public class Array1 {

	public static void main(String[] args) {
		
			Scanner sc = new Scanner(System.in);
			
			int N = sc.nextInt();
			int cnt = 0;
			int[] arr = new int[N];

			for(int i=0; i<N; i++) {
				arr[i] += sc.nextInt();
			}
			
			int find = sc.nextInt();
			
			for(int i=0; i<arr.length; i++) {
				if(arr[i] == find) { 
					cnt++;					
				}
			}
				
			System.out.println(cnt);
			}		
	
}

