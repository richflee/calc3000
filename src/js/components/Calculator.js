import React, {Component} from "react";
import styled from 'styled-components';

const StyledCalculator = styled.div`
    background-color: #D9FCF9;
    border-bottom: 1px solid #DADADA;
    border-right: 1px solid #DADADA;
    padding: 1em;
`

const StyledCalculatorButtonContainer = styled.div`
    display: flex;
`

const StyledCalculatorButton = styled.button`
    background-color: #FE8A24;
    border-bottom: 1px solid #F46800;
    border-left: 1px solid #D9FCF9;
    border-top: 1px solid #D9FCF9;
    border-right: 1px solid #F46800;
    color: #fff;
    flex-grow: 1;
    line-height: 1.5;
    padding: .5em;
`

const StyledCalculatorDisplay = styled.div`
    text-align: right;
`

const StyledInputDisplay = styled.p`
    font-size: 1.25em;
    font-weight: bold;
    margin-bottom: 0.2em;
`

const Paragraph = styled.p`
    font-size: 1.25em;
    margin-bottom: 0.2em;
    opacity: 0.5;
`


class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            operand: 0,
            operator: undefined,
            inputStack: []
        };

        this.keydownHandler = this.keydownHandler.bind(this);
        this.codeIsDigit = this.isInputCodeNumeric.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.clearEventHandler = this.clearEventHandler.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keydown", this.keydownHandler, false);
    }

    keydownHandler(event){
        if (this.isInputCodeNumeric(event.code)) {
            const inputStr = event.key;
            const inputStackVal = +(this.state.inputStack.join('') + inputStr);
            const operator = this.state.operator;
            const operand = this.state.operand;
            const newOperand = this.evaluate(operand, inputStackVal, operator);
            this.setState({
                operand: newOperand,
                inputStack: this.state.inputStack.concat([inputStr])
            });
            return;
        }
    }

    clearEventHandler() {
        this.setState({
            operand: 0,
            operator: undefined,
            inputStack: []
        });
    }

    isEqualsKeypress(keyCode) {
        return keyCode.match('Digit');
    }

    isInputCodeNumeric(keyCode) {
        return keyCode.match('Digit');
    }

    evaluate(currOperand, newOperand, operator) {
        if (!operator) {
            return newOperand;
        }

        if (currOperand === 0) {
            return newOperand;
        }

        let result = 0;
        switch (operator) {
            case '+':
                result = currOperand + newOperand;
                break;
            case '-':
                result = currOperand - newOperand;
                break;
            case '*':
                result = currOperand * newOperand;
                break;
        
            default:
                break;
        }

        return result;
    }

    changeOperator(operator) {

        if (this.state.operand === 0) {
            return;
        }

        this.setState({
            operator: operator,
            inputStack: []
        });
    }

    render() {
        return (
            <StyledCalculator className="calculator-container">
                <StyledCalculatorDisplay>
                    <StyledInputDisplay>{this.state.inputStack}</StyledInputDisplay>
                    <Paragraph>{this.state.operand}</Paragraph>
                </StyledCalculatorDisplay>
                <StyledCalculatorButtonContainer>
                    <StyledCalculatorButton onClick={this.changeOperator.bind(this, '+')}> + </StyledCalculatorButton>
                    <StyledCalculatorButton onClick={this.changeOperator.bind(this, '-')}> - </StyledCalculatorButton>
                    <StyledCalculatorButton onClick={this.changeOperator.bind(this, '*')}> * </StyledCalculatorButton>
                    <StyledCalculatorButton onClick={this.clearEventHandler}> C </StyledCalculatorButton>
                </StyledCalculatorButtonContainer>
            </StyledCalculator>
        );
    }
};

export default Calculator;