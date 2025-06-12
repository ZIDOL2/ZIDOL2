package access.a;

public class PublicClassInnerMain {
    public static void main(String[] args) {
        PublicClass publicClass = new PublicClass();
        // 같은 패키지 안에 있기 떄문에 접근 가능
        Defaultclass1 class1 = new Defaultclass1();
        Defaultclass2 class2 = new Defaultclass2();
    }
}
