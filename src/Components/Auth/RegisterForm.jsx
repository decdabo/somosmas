import React, {useState} from 'react';
import '../FormStyles.css';
import { Formik, Form, Field, ErrorMessage } from 'formik'

const RegisterForm = () => {
    
    const [formEnviado, setFormEnviado] = useState(false)
    const [initialValues, setInitialValues] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword:''
    })

    return (
        <Formik
            initialValues = {{
                name: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword:''            
            }}

            validate={(values) => {

                let errores = {}


                if (!values.name.trim()) {
                    errores.name = 'Please enter a name'
                }

                if (!values.lastName.trim()) {
                    errores.lastName = 'Please enter a last name'
                }

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






                if (!values.confirmPassword) {
                    errores.confirmPassword = 'Please confirm password'
                } else if (values.confirmPassword !== values.password){
                    errores.confirmPassword = 'Passwords can not be different'
                }

                return errores
            }}

            onSubmit={(values, {resetForm}) => {
                setInitialValues({
                    name: values.name,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                })
                
                setFormEnviado(true)
                setTimeout(() => {
                    setFormEnviado(false)
                }, 10000);
                alert(
                            `
                            Name: ${values.name}
                            Last name: ${values.lastName}
                            Email: ${values.email}
                            Password: ${values.password}                    
                            `
                        )
                resetForm()
            }}
        >

            {({errors}) => (
                <Form className="form-container" >
                    <Field 
                        className="input-field" 
                        type="text" 
                        name="name"
                        id='name'
                        placeholder="Enter name"
                        
                    />

                    <ErrorMessage name='name' component={() => (
                        <div className='form-error'>{ errors.name }</div>
                    ) }/>

                    
                        
                        
                    

                    <Field 
                        className="input-field" 
                        type="text" 
                        name="lastName"
                        id='lastName'
                        placeholder="Enter last name"
                        
                    />

                        <ErrorMessage name='lastName' component={() => ( <div className='form-error'>{ errors.lastName }</div> )} />
                    

                       
                        
                        

                    <Field 
                        className="input-field" 
                        type="email" 
                        name="email"
                        id='email'
                        placeholder="Enter email"
                        
                    />
                        <ErrorMessage name='email' component={() => ( <div className='form-error'>{ errors.email }</div> )} />

                    

                    <Field 
                        className="input-field" 
                        type="password" 
                        name="password"
                        id='password'
                        placeholder="Enter password"
                        
                    />
                        <ErrorMessage name='password' component={() => ( <div className='form-error'>{ errors.password }</div> )} />
                        
                        

                    <Field 
                        className="input-field" 
                        type="password" 
                        name="confirmPassword"
                        id='confirmPassword'
                        placeholder="Confirm password"
                       
                    />
                        <ErrorMessage name='confirmPassword' component={() => ( <div className='form-error'>{ errors.confirmPassword }</div> )} />
                        
                        
                    <button
                        className="submit-btn"
                        type="submit">
                        Register
                    </button>

                    {
                        formEnviado && <p className="form-success">Form submitted successfully</p>             
                            
                        
                    }
                    
                </Form>
                
            )}

        </Formik>
    );
}
 
export default RegisterForm;