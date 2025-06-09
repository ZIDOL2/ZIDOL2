package class1;

public class ClassStart1 {

    public static void main(String[] args) {
        String std1Name = "학생1";
        int std1Age = 15;
        double std1Grade = 90;

        String std2Name = "학생2";
        int std2Age = 16;
        double std2Grade = 80;

        String std3Name = "학생3";
        int std3Age = 17;
        double std3Grade = 80;

        // 기본 출력
        System.out.printf("이름: %s 나이: %d 성적: %.0f \n", std1Name,std1Age,std1Grade);
        System.out.printf("이름: %s 나이: %d 성적: %.0f \n", std2Name,std2Age,std2Grade);
        System.out.printf("이름: %s 나이: %d 성적: %.0f", std3Name,std3Age,std3Grade);

    }
}
