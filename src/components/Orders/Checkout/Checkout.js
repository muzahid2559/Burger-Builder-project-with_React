import React,{Component} from "react";
import {Button, Modal, ModalBody} from 'reactstrap';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredient } from '../../../redux/actionCreators';
import { Formik } from 'formik';

const mapDispatchToProps = dispatch =>{
    return {
        resetIngredient: () => dispatch(resetIngredient())
    }
}

const mapStateToProps = state =>{
    return {
        ingredients : state.ingredients,
        totalPrice : state.totalPrice,
        purchasable : state.purchasable
    }
}


class Checkout extends Component{
    state ={
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    goBack = () => {
        this.props.navigate('/');  // <-- এখানে navigate use করা হয়েছে 
      };


    submitHandler = (values) =>{
        this.setState({isLoading: true})
        const order = {
            ingredients: this.props.ingredients,
            customer: values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post("https://burger-eea44-default-rtdb.firebaseio.com/orders.json", order)
        .then(response => {
            if(response.status === 200){
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Order Placed Successfully!",
                })
                this.props.resetIngredient();
                
            } else{
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went Wrong! Order Again!",
                })
            }
        })
        .catch(err =>{
            this.setState({
                isLoading: false,
                isModalOpen: true,
                modalMsg: "Something Went Wrong! Order Again!",
            })
        })
    }

    render() {
        let form = (<div>
                <h4 style={{   border:"1px solid grey", 
                                boxShadow:"1px 1px #888888" ,
                                borderRadius:"5px",
                                padding:"20px",
                            }}>Payment: {this.props.totalPrice} BDT</h4>


                <Formik         
                initialValues={{
                    deliveryAddress: "",
                    phone: "",
                    paymentType: "Cash On Delivery",
                }}

                validate={values => {
                    const errors = {};
                    return errors;
                }}

                onSubmit={(values) => {
                    this.submitHandler(values);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    
                        < form style={{
                            border: "1px solid grey",
                            boxShadow: "1px 1px #888888",
                            borderRadius: "5px",
                            padding: "20px",
                        }} onSubmit={handleSubmit}>

                            <textarea
                                name="deliveryAddress"
                                id="deliveryAddress"
                                value={values.deliveryAddress}
                                className="form-control"
                                placeholder="Your Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            ></textarea>
                            <span>{errors.deliveryAddress && touched.deliveryAddress && errors.deliveryAddress}</span>

                            <br />

                            <input 
                                name="phone" 
                                id="phone" 
                                className="form-control" 
                                value={values.phone} 
                                placeholder="Your Phone Number" 
                                onBlur={handleBlur} 
                                onChange={handleChange} />

                            <br />

                            <select 
                                name="paymentType" 
                                id="paymentType" 
                                className="form-control" 
                                value={values.paymentType} 
                                onBlur={handleBlur} 
                                onChange={handleChange}>

                                <option value="Cash On Delivery">Cash On Delivery</option>
                                <option value="Bkash">Bkash</option>

                            </select>

                            <br />

                            <Button type="submit" style={{ backgroundColor: "#D70F64" }} className="mr-auto" disabled={!this.props.purchasable}>Place Order</Button>
                            <Button color="secondary" className="ml-1" onClick={this.goBack}>Cancel</Button>

                        </form>)}
            </Formik>
        </div>)

        return(

            <div>
                {this.state.isLoading? <Spinner/> : form}    
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p> {this.state.modalMsg} </p>
                    </ModalBody>
                </Modal>

            </div>
    
        )
    }
}


// নিচের কোডটি দিয়ে Checkout এ navigate ফাংশন টা পাঠাচ্ছি। 
function WithNavigate(props) {
    let navigate = useNavigate();
    return <Checkout {...props} navigate={navigate} />;
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);

