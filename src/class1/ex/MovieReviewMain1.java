package class1.ex;

public class MovieReviewMain1 {
    public static void main(String[] args) {
        MovieReview theMatch = new MovieReview();
        theMatch.title = "승부";
        theMatch.review = "노잼";

        MovieReview aladdin = new MovieReview();
        aladdin.title = "알라딘";
        aladdin.review = "꼭 봐야함";

        System.out.println("=== 개별 출력 ===");
        System.out.println("영화제목 : " + theMatch.title + ", 리뷰 : " + theMatch.review);
        System.out.println("영화제목 : " + aladdin.title + ", 리뷰 : " + aladdin.review);


    }
}
