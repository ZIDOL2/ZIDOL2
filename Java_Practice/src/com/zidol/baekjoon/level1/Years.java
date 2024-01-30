package com.zidol.baekjoon.level1;

import java.util.Scanner;

public class Years {

	public static void main (String[] args){
		Scanner sc = new Scanner(System.in);
		
		int year = sc.nextInt();
		
		if (year >999 && year <3001) {
			System.out.println(year - 543);
	
			sc.close();
		}
	}
}
