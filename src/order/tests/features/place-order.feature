Feature: Customer places an order
  As a customer
  I want to place an order
  So that I can have coffee to drink

  Scenario: Customer places an order
    Given a customer Kevin
    When the custoemr ordered an Espresso
    Then the order should be created