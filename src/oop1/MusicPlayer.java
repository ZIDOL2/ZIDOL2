package oop1;
// 캡슐화 예제다.
public class MusicPlayer {

    // 멤버변수
    int volume = 0;
    boolean isOn = false;

    // 플레이어 on
    void on() {
        isOn = true;
        System.out.println("음악 플레이어를 시작합니다.");
    }

    // 플레이어 off
    void off() {
        isOn = false;
        System.out.println("음악 플레이어를 종료합니다.");
    }

    // 볼륨 증가
    void up() {
        volume++;
        System.out.println("음악 플레이어 볼륨: " + volume);
    }

    // 볼륨 다운
    void down() {
        volume--;
        System.out.println("음악 플레이어 볼륨: " + volume);
    }

    // 음악 플레이어 상태
    void showStatus() {
        System.out.println("음악 플레이어 상태 확인");
        if(isOn) {
            System.out.println("음악 플레이어 ON, 볼륨: " + volume);
        } else {
            System.out.println("음악 플레이어 OFF");
        }
    }
}
