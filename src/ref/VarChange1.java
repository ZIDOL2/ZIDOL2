package ref;

public class VarChange1 {

    public static void main(String[] args) {
        // 기본형은 변수의 '값'을 복사해서 대입한다.
        int a = 10;
        int b = a;

        System.out.println("a = " + a);
        System.out.println("b = " + b);

        // a변경
        a = 20;
        System.out.println("a = " + a);
        System.out.println("b = " + b);

        // b변경
        b = 30;
        System.out.println("a = " + a);
        System.out.println("b = " + b);
    }

}
