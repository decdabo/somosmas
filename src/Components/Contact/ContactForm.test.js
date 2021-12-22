import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('test in <ContactForm />', ()=>{
    test('test', ()=>{
        render(<ContactForm />)
        screen.debug()
        const nameInput = screen.getByLabelText(/email/i)
        console.log(nameInput)
    })
})