package construct;

public class ConstructMain2 {

    public static void main(String[] args) {
        MemberConstruct member1 = new MemberConstruct("user2", 13, 90);
        MemberConstruct member2 = new MemberConstruct("user1", 11);

        MemberConstruct[] members = {member1, member2};

        for (MemberConstruct s : members) {
            System.out.println("이름: " + s.name + ", 나이: " + s.age + ", 성적: " + s.grade);
        }
    }
}
