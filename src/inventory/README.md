[AggregateRoot]庫存(Inventory):
(1) 數量(Qty)
(2) 庫存品項(Item)
(3) 庫存限制條件(Inventory Constraints)
方法:
(1) 入庫(Inbound)=>
[Input: SKU ....]

(2) 出庫(Outbound)=>
[Input: SKU, Inventory Category, qty][output: ienumerable<inventory item>]
(排除已過期項目)

-->幾個品項+SKU,就有幾筆在資料庫: SKU(MilkInventory)

[ValueObject]庫存品項(Inventory Item):
(1) 名稱(Name)
(2) 庫存編號(SKU-Stock Keeping Unit)
=>廠商跟進貨商的簡述代號(範例: X-R-T1012)
(3) 價錢(Price)
(4) 保存期限(ExpirationDate)
(5) 進貨商(Manufator)
(6) 庫存品項類型(Category)
(7) 進貨單位(Unit)
(8) 內容量(Capacity)

[Enumeration]庫存品項種類(Inventory Category)
種類名稱-列舉(LowFatMil, Milk, SoyMilk, CoffeeBean, FilterPaper)

[ValueObject]庫存限制條件(Inventory Constraint)
(1) 種類名稱(Category Name)
(2) 最大數量(Max Qty)
(範例)Milk:
(上限)牛奶 2L 瓶裝的 50 瓶
Max Qty: 0~50

CoffeeServe:

1. Barisata
2. Replenish
