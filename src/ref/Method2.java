package ref;

public class Method2 {
    public static void main(String[] args) {
        Student student1 = createStudent("학생1", 15,90);
        Student student2 = createStudent("학생2", 16,80);

        printStudent(student1);
        printStudent(student2);

    }

    static Student createStudent(String name, int age, int grade){
        Student student = new Student();
        System.out.println(student); // 참조값 찍어보기
        student.name = name;
        student.age = age;
        student.grade = grade;
        return student;
    }

    static void printStudent(Student std) {
        System.out.println("이름:" + std.name + " 나이:" + std.age + " 성적:" + std.grade);
    }
}

