package access.b;

import access.a.AccessData;

public class AccessOuterMain {

    public static void main(String[] args) {
        AccessData data = new AccessData();

        // public 호출 가능
        data.publicField = 1;
        data.publicMethod();

        // 다른 패키지 default 호출 불가
//        data.defaultField = 2;
//        data.defaultMethod();

        // private 호출 불가
//        data.privateField = 3;
//        data.privateMethod();

        // 외부 호출 이지만 해당 메서드 안에서는 접근 가능하기 때문에 호출 가능하다.
        data.innerAccess();
    }
}
