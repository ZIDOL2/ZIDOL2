package com.zidol.baekjoon.level2;

//import java.util.Random;
import java.util.Scanner;

public class Dice {

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		
		int num1 = sc.nextInt();
		int num2 = sc.nextInt();
		int num3 = sc.nextInt();
		
		
		if(num1==num2 && num1==num3) {
			System.out.println(10000+(num1*1000));
			
		}else if((num1==num2 && num1!=num3) || num1==num3 && num1 !=num2) {
			System.out.println(1000+(num1*100));
			
		}else if(num2==num3&&num2!=num1){
			System.out.println(10000+(num2*100));
			
		}else{
			int only = num1;
			if(only<num2) only=num2;
			if(only<num3) only=num3;
			System.out.println(only*100);
		
		}
		sc.close();
	}
}
	
//public static void my{
//
//	Random r = new Random();
//
//	int num1 = r.nextInt(6) + 1;
//	int num2 = r.nextInt(6) + 1;
//	int num3 = r.nextInt(6) + 1;
//
//	System.out.println(num1+" "+num2+" "+num3);
//
//	if(num1==num2&&num1==num3)
//	{
//		System.out.println(10000+(num1*1000));
//		
//	}else if((num1==num2&&num1!=num3)||num1==num3&&num1!=num2)
//	{
//		System.out.println(10000 + (num1 * 100));
//	
//	}else if(num2==num3&&num2!=num1)
//	{
//		System.out.println(10000 + (num2 * 100));
//	
//	}else
//	{
//		int only = num1;
//		if (only < num2)
//			only = num2;
//		if (only < num3)
//			only = num3;
//		System.out.println(only * 100);
//	
//	}
//	}



