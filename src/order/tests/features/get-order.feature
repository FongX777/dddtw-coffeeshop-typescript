Feature: Staff gets an order
  As a staff
  I want to get a specific order
  So that I can view and handle it

  Scenario: Get an order
    Given all orders:
      | orderNo | createdOn        | amount | use_in |
      | A001    | 2019/10/10T10:10 | 100    | true   |
      | A001    | 2019/10/10T11:10 | 200    | false  |
      | A001    | 2019/10/10T12:10 | 50     | true   |
    When the staff open order 'A001'
    Then order 'A001' should be presented