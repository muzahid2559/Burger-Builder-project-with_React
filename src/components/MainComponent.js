import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import { Routes, Route, Navigate} from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import { connect } from "react-redux";



const mapSatateToProps = state =>{
    return{
        token: state.token,
    }
}
const MainComponent  = props =>{

    let rout = null;
    if(props.token === null){
        rout = (
            <Routes>
                <Route path= "/login" element = {<AuthForm/>}/>
                <Route path="/" element ={<Navigate to ="/login"/>}/>
            </Routes>

        )
    } else {
            rout = (       
            <Routes> 
                <Route path="/orders" element= {<Orders/>}/>
                <Route path="/checkout" element= {<Checkout/>}/>
                <Route path="/" element= {<BurgerBuilder/>}/>
                <Route path="/login" element ={<Navigate to ="/"/>}/>
            </Routes>
            )
    }
    return (
        <div>
            <Header/>
            <div className="container">

                {rout}

            </div>
            
        </div>
    )
}

export default connect(mapSatateToProps) (MainComponent);