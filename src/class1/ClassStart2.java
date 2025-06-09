package class1;

public class ClassStart2 {

    public static void main(String[] args) {
        // 학생 정보를 각 배열로 생성
        String[] stdNames = {"학생1", "학생2", "학생3", "학생4"};
        int[] stdAges = {15, 16, 17, 20};
        int[] stdGrades = {90, 80, 100, 25};

        for(int i=0; i< stdNames.length; i++){
            System.out.println("이름: "+stdNames[i]+" 나이: "+stdAges[i]+" 성적: "+stdGrades[i]);
        }

        // 이렇게 관리하는 방식은 좋지 않음
        // '학생'의 개념을 하나로 묶는 것이 사람이관리하기 좋은 방식이다.
        // 학생 - 이름,나이,성적
        // 클래스를 사용해 해결할 수 있다!
    }
}
