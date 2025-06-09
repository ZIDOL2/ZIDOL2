package class1.ex;

public class MovieReviewMain2 {
    public static void main(String[] args) {

        MovieReview theMatch = new MovieReview();
        theMatch.title = "승부";
        theMatch.review = "노잼";

        MovieReview aladdin = new MovieReview();
        aladdin.title = "알라딘";
        aladdin.review = "꼭 봐야함";

        MovieReview[] movies = {theMatch, aladdin};

        System.out.println("=== 배열 사용 ===");
        System.out.println("영화제목 : " + movies[0].title + ", 리뷰 : " + movies[0].review);
        System.out.println("영화제목 : " + movies[1].title + ", 리뷰 : " + movies[1].review);



    }
}
