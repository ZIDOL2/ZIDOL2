package access;

public class SpeakerMain {

    public static void main(String[] args) {
        Speaker speaker = new Speaker(90);

        speaker.volumeUp();
        speaker.showVolume();

        speaker.volumeUp();
        speaker.showVolume();

        speaker.volumeDown();
        speaker.showVolume();

        // 필드에 직접 접근1
        System.out.println("volume 필드 직접 접근 수정");
        // private으로 선언되어있는 변수는 외부 클래스에서 접근 불가능
//        speaker.volume = 200;
        speaker.showVolume();
        // 필드에 직접 접근하지 못하도록 하는것이 접근제어자
    }
}
