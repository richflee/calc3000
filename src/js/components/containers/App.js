import React, { Component } from "react";
import ReactDOM from "react-dom";
import Calculator from "../Calculator";

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: "Calc3000"
        };
    }
    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <Calculator />
            </div>
        );
    }
}
export default App;