package access.ex;

public class Item {
    String itemName;
    int price;
    int quantity;

    public Item(String itemName, int price, int quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }

    public String getItemName() {
        return itemName;
    }

    // 객체 본인 데이터는 본인 클래스에서 계산하는게 유지보수에 좋음
    public int getTotalPrice() {
        return price * quantity;
    }
}
