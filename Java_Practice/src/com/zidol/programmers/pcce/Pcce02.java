package com.zidol.programmers.pcce;

import java.util.Scanner;

public class Pcce02 {
	//PCCE 기출문제 2번 / 피타고라스의 정리
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int c = sc.nextInt();

        int b_square = (c*c) - (a*a); //c-a 로 되어있었다.

        System.out.println(b_square);
	}

}
