Feature: Staff gets a list of orders
  As a staff
  I want to get a list of orders
  So that I can manage them

  Scenario: Get a list of orders
    Given all orders:
      | orderNo | status     | createdOn        | amount | use_in |
      | A001    | Closed     | 2019/10/10T10:10 | 100    | true   |
      | A001    | Procseeing | 2019/10/10T11:10 | 200    | false  |
      | A001    | Procseeing | 2019/10/10T12:10 | 50     | true   |
    When the staff open the order list
    Then all orders should be presented