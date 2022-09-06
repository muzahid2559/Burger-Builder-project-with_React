import React, {Component} from "react";
import Burger from "./Burger/Burger";

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            {type: 'salad', amount: 1 },
            {type: 'cheese', amount: 3 },
            {type: 'meat', amount: 2 },
        ]
    }
    render() {
        return (
            <div>
               <Burger ingredients= {this.state.ingredients}/>
            </div>
        )
    }
}