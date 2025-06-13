package static1;

public class DataCountMain1 {
    public static void main(String[] args) {
        Data1 data1 = new Data1("A");
        System.out.println("A count = " + data1.count);

        Data1 data2 = new Data1("B");
        System.out.println("B count = " + data2.count);

        Data1 data3 = new Data1("C");
        System.out.println("C count = " + data3.count);

        // 위 방식은 data1-3 각 인스턴스에 할당하는 방법이라 옳지 않다.
        // 이렇게 전체 count를 사용하는데는 static 변수가 필요하다.
    }
}
