package construct;

public class MemberConstruct {
    String name;
    int age;
    int grade;


    // 추가
    MemberConstruct(String name, int age) {
/*        this.name = name;
        this.age = age;
        this.grade = 50;*/
        // this()를 사용하여 생성자 내부에서 생성자를 호출할 수 있다. => 중복코드 제거
        // 또한 첫 줄이 아니면 컴파일 에러 발생함.
        // System.out.println("go");
        this(name, age, 50);
    }

    // 생성자
    MemberConstruct(String name, int age, int grade) {
        System.out.println("생성자 호출 name=" + name + ",age= " + age + ",grade= " + grade);

        this.name = name;
        this.age = age;
        this.grade = grade;

    }
}
