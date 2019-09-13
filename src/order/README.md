old sample reference :

```

class Order {

    	private int quantity;
    private String seatNo;
    private boolean drinkHere;
    private int price;
    private String itemName;
    private String establishTime;
    private int drinkTemperature;
    private OrderTicket orderTicket;

}

New structure:

訂單 :

1. 訂單生成時間
2. 訂單號碼
3. 桌次
4. [訂單品項]
5. 金額 = sum ([訂單品項])
6. 內用或外帶

訂單品項 :

1. 品項 ID
2. 品項名稱
3. 數量
4. 單價
5. 特殊需求
6. 溫度

訂單號碼生成規則 : YYYYMMDD-流水號
桌次 : 總共 1 ~ 10 桌
```
