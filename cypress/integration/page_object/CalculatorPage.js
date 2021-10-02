import 'cypress-iframe'
const numberRate = {
    "SEVEN": { "value": 7, "x": 1/7, "y": 3/7 },
    "EIGHT": { "value": 8, "x": 1/3, "y": 3/7 },
    "NINE": { "value": 9, "x": 1/2, "y": 3/7 },
    "FOUR": { "value": 4, "x": 1/7, "y": 4/7 },
    "FIVE": { "value": 5, "x": 1/3, "y": 4/7 },
    "SIX": { "value": 6, "x": 1/2, "y": 4/7 },
    "ONE": { "value": 1, "x": 1/7, "y": 5/7 },
    "TWO": { "value": 2, "x": 1/3, "y": 5/7 },
    "THREE": { "value": 3, "x": 1/2, "y": 5/7 },
    "ZERO": { "value": 0, "x": 1/7, "y": 6/7 },
    "DOT": { "value": ".", "x": 1/3, "y": 6/7 },
    "NEGATIVE": { "value": "-", "x": 1/2, "y": 6/7 }
}

const operatorRate = {
    "DIVIDE": { "value": "/", "x": 5/7, "y": 3/7 },
    "MULTIPLY": { "value": "*", "x": 5/7, "y": 4/7 },
    "SUBTRACT": { "value": "-", "x": 5/7, "y": 5/7 },
    "ADD": { "value": "+", "x": 5/7, "y": 6/7 },
    "RESET": { "value": "C", "x": 6/7, "y": 3/7 },
    "EQUAL": { "value": "=", "x": 6/7, "y": 6/7 }
}

class CalculatorPage{
    clickNummber(number){
        let numbers = number.split("")
        for (let i=0;i<numbers.length;i++) {
            for (let key in numberRate) {
                if (numberRate[key].value == numbers[i]) {
                    cy.iframe('#fullframe').find('#canvas').then($canvas => {
                        cy.iframe('#fullframe')
                            .find('#canvas')
                            .click($canvas.width()*numberRate[key].x, $canvas.height()*numberRate[key].y)
                    })
                }
                if(numbers[0] == "-"){
                    this.clickNegativeNumber()
                }
            }
        }
    }

    clickOperator(operator){
        for (let key in operatorRate) {
            if (operatorRate[key].value == operator) {
                cy.iframe('#fullframe').find('#canvas').then($canvas => {
                    cy.iframe('#fullframe')
                        .find('#canvas')
                        .click($canvas.width()*operatorRate[key].x, $canvas.height()*operatorRate[key].y)
                })
            }
        }
    }

    clickNegativeNumber(){
        cy.iframe('#fullframe').find('#canvas').then($canvas => {
            cy.iframe('#fullframe')
                .find('#canvas')
                .click($canvas.width()*numberRate["NEGATIVE"].x, $canvas.height()*numberRate["NEGATIVE"].y)
        })
    }

    clickEqual(){
        cy.iframe('#fullframe').find('#canvas').then($canvas => {
            cy.iframe('#fullframe')
                .find('#canvas')
                .click($canvas.width()*operatorRate["EQUAL"].x, $canvas.height()*operatorRate["EQUAL"].y)
            })
    }

    clickC(){
        cy.iframe('#fullframe').find('#canvas').then($canvas => {
            cy.iframe('#fullframe')
                .find('#canvas')
                .click($canvas.width()*operatorRate["RESET"].x, $canvas.height()*operatorRate["RESET"].y)
        })
    }

    screenShotResult(){
        cy.iframe('#fullframe').find('#canvas').matchImageSnapshot()
    }

    screenShotExpectedResult(expected)
    {
        this.clickC()
        this.clickNummber(expected)
        this.screenShotResult()
    }
    
    screenShotError(){
        this.clickOperator("/")
        this.clickEqual()
        this.screenShotResult()
    }
}
export default CalculatorPage