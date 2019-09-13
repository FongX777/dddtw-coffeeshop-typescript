Feature: Staff cancels an order
  As a staff
  I want to cancel an order
  So that I can remove canceled order from my revenue

  Scenario: Close an order
    Given an order
      | orderNo | status  | createdOn        | amount | use_in |
      | A001    | Deliver | 2019/10/10T10:10 | 100    | true   |
    When the staff close the order 'A001'
    Then status of order 'A001' should be 'Closed'