import React, {Component} from "react";
import {Formik} from 'formik';

class AuthForm extends Component {
    render() {
        return (
            <div>
                <Formik 
                    initialValues={ 
                        {
                            email:"",
                            password:"",
                            passwordConfirm:"",
                        }
                    }

                    onSubmit={
                            (values) => {
                                console.log(values)

                            }                       
                   }
                >
                    {({ values, handleChange, handleSubmit }) => 
                        <div>
                            <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email : </label>
                            <input
                            name="email"
                            placeholder="Enter Your Email"
                            className="form-control"
                            value={values.email}
                            onChange={handleChange}
                            />

                            <br/>

                            <label htmlFor="password">Password : </label>
                            <input
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            value={values.password}
                            onChange={handleChange}
                            />

                            <br/>

                            <label htmlFor="passwordConfirm">Confirm Password : </label>
                            <input
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            className="form-control"
                            value={values.passwordConfirm}
                            onChange={handleChange}
                            />
                            
                            <br/>

                            <button type="submit" className="btn btn-success">Sign Up</button>

                            </form>
                        </div>
                    }

                </Formik>
            </div>
        )
    }
}

export default AuthForm;