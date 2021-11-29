import React, { useState } from 'react';
import '../FormStyles.css';
import { Formik, Form, Field, ErrorMessage } from 'formik'

const LoginForm = () => {
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: ''
    });

    const [formEnviado, setFormEnviado] = useState(false)


    return (
        <Formik
            
            initialValues = {{                
                email: '',
                password: '',                          
            }}

            validate={(values) => {

                let errores = {}
                
                if (!values.email.trim()) {
                    errores.email = 'Please enter an email'
                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                    errores.email = 'Please enter a valid email'
                }
                
                if (!values.password.trim()) {
                    errores.password = 'Please enter a password'

                } else if (values.password.length < 6) {
                    errores.password = 'Your password must be at least 6 characters'

                } else if (values.password.search(/[a-z]/i) < 0) {
                    errores.password = "Your password must contain at least one letter."

                } else if (values.password.search(/[0-9]/) < 0) {
                    errores.password = "Your password must contain at least one digit."
                }

                else if (values.password.search(/(?=.*[!@#$%^&*])/)) {
                    errores.password = "Your password must contain at least one special character."
                }

                return errores
                




            }}
            onSubmit={(values, {resetForm}) => {
                
                setInitialValues({
                    email: values.email,
                    password: values.password,
                })
                
                setFormEnviado(true)
                setTimeout(() => {
                    setFormEnviado(false)
                }, 10000);
                alert(
                    `
                    Email: ${values.email}
                    Password: ${values.password}                    
                    `
                )
                resetForm()
            }}
        
        >

            {({errors}) => (
                <Form className="form-container">
                    <Field 
                        className="input-field"
                        id='email'
                        type="email" 
                        name="email" 
                        placeholder="Enter email"
                        
                    />

                    <ErrorMessage name='email' component={() => (
                        <div className='form-error'>{errors.email}</div>
                    )}/>

                    

                    <Field 
                        className="input-field"
                        id='password'
                        type="password" 
                        name="password" 
                        placeholder="Enter password"
                        
                    />

                    <ErrorMessage name='password' component={() => (
                        <div className='form-error'>{errors.password}</div>
                    )}/>
                        
                        
                    <button className="submit-btn" type="submit">Log In</button>
                    {
                        formEnviado && <p className="form-success">Log in successfull</p>
                    }
                </Form>                
            )}

        </Formik>
    );
}
 
export default LoginForm;