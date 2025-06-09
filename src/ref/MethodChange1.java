package ref;

public class MethodChange1 {

    public static void main(String[] args) {
        int a = 10;
        System.out.println("메서드 호출 전 a = " + a); // 10
        // 기본형은 실제 값을 넘긴다.
        changePrimitive(a);
        System.out.println("메서드 호출 후 a = " + a); // 10

    }

    static void changePrimitive(int x) {
        // 파라미터의 값을 변경해도, 호출자의 변수 값에는 영향이 없다.
        x = 20;
    }
}
