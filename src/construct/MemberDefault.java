package construct;

public class MemberDefault {
    String name;

    MemberDefault() {
        // 생성자 기능이 필요하지 않은 경우도 많기 때문에
        // 자바가 기본생성자를 자동으로 만드는 편의 기능을 제공한다.
        // 하지만 생성자가 한개라도 있으면 자바는 기본생성자를 만들지 않는다.
    }
}
