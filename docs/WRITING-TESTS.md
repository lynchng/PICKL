# Writing Tests

➤ [Home](../README.md)

This is a refresher for writing effective tests using the Gherkin format.

💡 **New to BDD?** Read [Why BDD?](WHY-BDD.md) to understand the benefits of Behavior-Driven Development and why we use Cucumber.

---

Tests are written in a `.feature` file — a collection of behaviors you want to simulate. Scenarios are formed in BDD style, using Cucumber's Gherkin language in order to make tests less code-like and more human readable.

It would be advisable to go through the following links if you're new to Cucumber and Gherkin:

- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Step Definitions](https://cucumber.io/docs/cucumber/step-definitions/)
- [Tag Expressions](https://docs.cucumber.io/tag-expressions/)

To write a single test, you need the bare minimum parts of a feature file:

### Feature

- Commonly the page or a specific feature in an app, this acts as the title of a test case group in the reporting

  ```gherkin
  Feature: Test writing
    # This is a feature description...
    .
    .
    .
  ```

### Scenario

- Commonly the test cases that tests specific requirements and/or acceptance criteria

  ```gherkin
  Scenario: One test case should cover one requirement
    # This is sample test case...
    .
    .
    .
  ```

### Steps

- Denoted by the following keywords:
  - `Given` — a prerequisite or condition
  - `When` — an action
  - `Then` — an expected outcome
  - `And` / `But` — used to conjugate successive `Given`s, `When`s, `Then`s to make the statements aesthetically pleasing
- Steps have to map to a step definition, otherwise the step would fail to execute

  ```gherkin
    Given I am testing an app
      And I have a requirement
      But I don't have this other requirement
    When I test the feature mentioned in the requirement
    Then the feature should perform as expected
      And the requirement should only cover this one feature
  ```

- Whenever you can try to keep each step as simple as possible (one action per step)
  - Once we collect a good set of steps and we find repetitive, more complex patterns, we'll eventually introduce compounded steps
