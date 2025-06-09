package class1;

public class ClassStart4 {

    public static void main(String[] args) {
        Student student1 = new Student();
        student1.name = "학생1";
        student1.age = 15;
        student1.grade = 90;

        Student student2 = new Student();
        student2.name = "학생2";
        student2.age = 16;
        student2.grade = 80;

        Student[] students = new Student[2];
        students[0] = student1;
        students[1] = student2;

        for(Student student : students){
            System.out.println("이름:" + student.name + " 나이:" + student.age + " 성적:" + student.grade);
        }

        Student[] students1 = new Student[2];
        student2.name = "학생2-2";
        student2.age = 19;
        student2.grade = 50;
        students1[0] = student1;
        students1[1] = student2;

        for(Student student : students1){
            System.out.println("이름:" + student.name + " 나이:" + student.age + " 성적:" + student.grade);
        }

        // 이렇게 하면 student2의 주소값을 가져와 student2의 name, age, grade의 값을 변경하기 때문에 위험하다.
        // 참조형 대입은 흔하게 하는 실수이므로 주의!
        Student student3 = student2;
        System.out.println(student3.name);
        student3.name = "학생3";
        System.out.println(student2.name + " => " + student3.name);



    }
}
