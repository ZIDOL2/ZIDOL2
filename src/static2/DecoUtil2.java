package static2;

public class DecoUtil2 {

    // 메서드에 static을 붙여줌
    // 정적 메서드가 된다.
    // 인스턴스 거칠 필요 없이 클래스를 호출하면 된다.
    public static String deco(String str) {
        return "*" + str+ "*";
    }

}
