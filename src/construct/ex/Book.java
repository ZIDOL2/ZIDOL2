package construct.ex;

public class Book {
    String title;
    String author;
    int page;

    // 생성자 완성 코드 문제
    public Book() {
        this("", "", 0);
    }

    Book(String title, String author) {
        this(title, author, 0);
    }

    Book(String title, String author, int page) {
        this.title = title;
        this.author = author;
        this.page = page;
    }


    void displayInfo() {
        System.out.println("title: " + title + ", author: " + author + ", page: "+ page);
    }
}
