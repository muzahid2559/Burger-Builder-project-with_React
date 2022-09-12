import React,{Component} from "react";
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';


class Checkout extends Component{
    state ={
        values:{
            deliveryAddress:"",
            phone:"",
            paymentType:"Cash On Delivery",
        }
    }

    inputChangeHandler = (e) =>{
        this.setState({
            values:{
                ...this.state.values,
                [e.target.name] : e.target.value,
            }
        })
    }

    submitHandler = () =>{
        console.log(this.state.values)
    }

    goBack = () => {
        this.props.navigate('/');  // <-- এখানে navigate use করা হয়েছে 
      };

    render() {
        return(
            <div>
               <form style={{   border:"1px solid grey", 
                                boxShadow:"1px 1px #888888" ,
                                borderRadius:"5px",
                                padding:"60px",
                            }}>
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address" onChange={(e) => this.inputChangeHandler(e)}></textarea>
                <br/>
                <input name="phone" className="form-control" value={this.state.values.phone} placeholder="Your Phone Number" onChange={(e) => this.inputChangeHandler(e)}/>
                <br/>
                <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputChangeHandler(e)}>
                    <option value="Cash On Delivery"> Cash On Delivery </option>
                    <option value="Bkash"> Bkash </option>
                </select>
                <br/>

                <div style = {{ textAlign:"right" }}>
                <Button style={{ backgroundColor:"#D70F64"  }} onClick={this.submitHandler}> Place Order </Button>
                <Button color="secondary" className= "ms-1" onClick={this.goBack}> Cancel </Button>
                </div>

               </form>
            </div>
    
        )
    }
}


// নিচের কোডটি দিয়ে Checkout এ navigate ফাংশন টা পাঠাচ্ছি। 
function WithNavigate(props) {
    let navigate = useNavigate();
    return <Checkout {...props} navigate={navigate} />;
  }
  

export default connect(null, null)(WithNavigate);

