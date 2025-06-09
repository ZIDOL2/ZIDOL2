package ref;

public class Method1 {
    public static void main(String[] args) {
        Student std1 = new Student();
        initStudent(std1, "학생1", 15,90);

        Student std2 = new Student();
        initStudent(std2,"학생2", 16,80);

        printStudent(std1);
        printStudent(std2);

    }

    static void initStudent(Student std, String name, int age, int grade) {
        std.name = name;
        std.age = age;
        std.grade = grade;
    }
    static void printStudent(Student std) {
        System.out.println("이름:" + std.name + " 나이:" + std.age + " 성적:" + std.grade);
    }
}

