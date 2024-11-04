package src.com.zidol.study99club.beginner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class day7 {

	public static void main(String[] args) throws IOException {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		String[] numNM = br.readLine().split(" ");

		int N = Integer.parseInt(numNM[0]);
		int M = Integer.parseInt(numNM[1]);

		String[][] songsInfo = new String[N][]; // 입력받은 수 만큼의 2차원배열 생성
		String[] knowList = new String[N]; // 정환이가 아는 노래 목록 담아두기
		String know = "";

		// 정환이가 아는 노래 첫 3음 list에 담아두기
		for (int i = 0; i < N; i++) {
			songsInfo[i] = br.readLine().split(" ");
			for (int j = 2; j < 5; j++) {
				know += songsInfo[i][j];

			}
			knowList[i] = know;
			know = "";
		}
		
		// 문제로 출제된 노래 세 음 담기
		for (int k = 0; k < M; k++) {
			// 출제 후 초기화 해주기 위해 지역변수로 설정
			String code = br.readLine().replace(" ", "");
			ArrayList<String> answer = new ArrayList<>();
			
			// 문제가 제목에 있으면 제목 담기
			for (int h = 0; h < N; h++) {
				if ((knowList[h]).equals(code)) {
					answer.add(songsInfo[h][1]);
				}
			}

			int listSize = answer.size();
			 
		    if(listSize == 1) {
			// size 1이면 제목 출력
		    	System.out.println(answer.get(0)); 
		    } else if(listSize > 1) { // size 1보다 크면 ? 출력 
		        System.out.println("?");
		    } else { //size 0이면 ! 출력 
		        System.out.println("!"); 
		    }
		}
	}
}
