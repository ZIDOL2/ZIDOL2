package oop1;

public class MusicPlayerMain4 {

    public static void main(String[] args) {
        MusicPlayer player = new MusicPlayer();

        // 음악 플레이어 켜기
        player.on();
        // 볼륨 증가
        player.up();
        // 볼륨 증가
        player.up();
        // 플레이어 상태
        player.showStatus();
        // 볼륨 감소
        player.down();
        // 플레이어 종료
        player.off();
        // 상태 재확인
        player.showStatus();
    }
}
