Feature: Staff deliver an order
  As a staff
  I want to mark an order from processing to deliver
  So that I can know the current status of the order

  Scenario: Deliver an order
    Given an order
      | orderNo | status     | createdOn        | amount | use_in |
      | A001    | Processing | 2019/10/10T10:10 | 100    | true   |
    When the staff deliver order 'A001'
    Then status of order 'A001' should be 'Delive'