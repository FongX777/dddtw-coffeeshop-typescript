Feature: Staff process an order
  As a staff
  I want to mark an order as processing
  So that I can start processing the order

  Scenario: Process an order
    Given an order
      | orderNo | status  | createdOn        | amount | use_in |
      | A001    | Initial | 2019/10/10T10:10 | 100    | true   |
    When the staff process order 'A001'
    Then status of order 'A001' should be 'Processing'