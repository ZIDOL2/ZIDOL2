package pack;

import pack.a.User;

public class packageMain1 {

    public static void main(String[] args) {
        Data data = new Data();

        // import 안하려면 full name 사용해야함
//        pack.a.User user = new pack.a.User();
        User user = new User();
    }
}
