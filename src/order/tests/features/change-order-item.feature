Feature: Staff change order items of orders
  As a staff
  I want to change the order items of orders
  So that I can meet customers' needs

  Background:
    Given a staff
    And an order 'A001' with order items:
      | product name        | qty | unit price |
      | Espresso Single     | 1   | 50         |
      | Caffe Latte / Vanti | 1   | 160        |

  Scenario: Add new order items
    Given the stuff has input a new item:
      | product name        | qty | unit price |
      | Caffe Latte / Short | 2   | 100        |
    When the staff applys the change
    Then the order item should be added

  Scenario: Remove order items
    When the staff remove the first order item of the order
    Then the order item should be removed

  Scenario: Change order items
    Given the stuff has input changes on the first item:
      | product name    | qty | unit price |
      | Espresso Single | 2   | 50         |
    When the staff applys the change
    Then the order itemed should be updated