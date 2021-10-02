import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
import CalculatorPage from '../page_object/CalculatorPage'
const calculator = new CalculatorPage()

Given("Open chrome browser and start application", () => {
    cy.visit("https://www.online-calculator.com/full-screen-calculator/")
    calculator.clickC()
});

When("I calculate {string} with {string} using operation {string}", (numberA, numberB, operator) => {
    calculator.clickNummber(numberA)
    calculator.clickOperator(operator)
    calculator.clickNummber(numberB)
    calculator.clickEqual()
});

Then("I should be able to see {string}", (expected) => {
    calculator.screenShotResult()
    if(expected == "Error"){
        calculator.screenShotError()
    }
    else{
        calculator.screenShotExpectedResult(expected)
    }
});