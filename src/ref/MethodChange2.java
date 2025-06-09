package ref;

public class MethodChange2 {

    public static void main(String[] args) {
        Data dataA = new Data();
        dataA.value = 10;
        System.out.println("메서드 호출 전 dataA.value = " + dataA.value); // 10
        System.out.println("dataA의 주소값 : " + dataA);

        changePrimitive(dataA);
        // 주소값을 참조하기 때문에 value 값이 바뀜
        System.out.println("메서드 호출 후 dataA.value = " + dataA.value); // 20

    }

    static void changePrimitive(Data dataX) {
        System.out.println("dataX의 주소값 : " + dataX);
        dataX.value = 20;
    }
}
