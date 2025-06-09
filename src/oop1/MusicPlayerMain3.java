package oop1;

public class MusicPlayerMain3 {

    public static void main(String[] args) {

        // 음악 플레이어 관련 데이터를 클래스로 묶어서 관리
        MusicPlayerData data = new MusicPlayerData();

        on(data);
        up(data);
        up(data);
        down(data);
        showStatus(data);
        off(data);

    }

    // 플레이어 on
    static void on(MusicPlayerData data) {
        data.isOn = true;
        System.out.println("음악 플레이어를 시작합니다.");
    }

    // 플레이어 off
    static void off(MusicPlayerData data) {
        data.isOn = false;
        System.out.println("음악 플레이어를 종료합니다.");
    }

    // 볼륨 증가
    static void up(MusicPlayerData data) {
        data.volume++;
        System.out.println("음악 플레이어 볼륨: " + data.volume);
    }

    // 볼륨 다운
    static void down(MusicPlayerData data) {
        data.volume--;
        System.out.println("음악 플레이어 볼륨: " + data.volume);
    }

    // 음악 플레이어 상태
    static void showStatus(MusicPlayerData data) {
        System.out.println("음악 플레이어 상태 확인");
        if(data.isOn) {
            System.out.println("음악 플레이어 ON, 볼륨: " + data.volume);
        } else {
            System.out.println("음악 플레이어 OFF");
        }
    }

}
