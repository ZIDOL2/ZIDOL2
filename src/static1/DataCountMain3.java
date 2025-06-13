package static1;

public class DataCountMain3 {
    public static void main(String[] args) {
        Data3 data1 = new Data3("A");
        System.out.println("A count = " + Data3.count);

        Data3 data2 = new Data3("B");
        System.out.println("B count = " + Data3.count);

        Data3 data3 = new Data3("C");
        System.out.println("C count = " + Data3.count);

        // 추가
        // 인스턴스를 통한 접근
        Data3 data4 = new Data3("D");
        // 코드를 읽을 때 정적 변수가 아닌 인스턴스 변수로 착각할 수 있어
        // 권장하지 않는다.
        System.out.println(data4.count);
        // 이렇게 data4, data5 식으로 있으면 헷갈림
        // 그래서 인텔리제이도 수정을 권장한다.
        Data3 data5 = new Data3("E");
        System.out.println(data5.count);

        // 클래스를 통한 접근
        System.out.println(Data3.count);
    }
}
