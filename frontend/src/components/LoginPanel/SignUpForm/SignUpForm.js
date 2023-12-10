// import { useState } from 'react'
import NameInput from '../NameInput/NameInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import SubmitBut from '../SubmitBut/SubmitBut'
import './SignUpForm.sass'



const SignUpForm = (props) => {

    const form_name = '#sign_up-cont'
    const passw_el = document.querySelector(form_name + ' .passw_input')
    const name_el = document.querySelector(form_name + ' .name_input')


    const handleLogUp = async () => {
        const REG_INFO = {
            u_name: name_el.value,
            u_passw: passw_el.value,
            u_device: navigator.userAgent,
        }
        console.log(REG_INFO)
    }

    return (
        <form id='sign_up-form' className='cont'>
            <NameInput/>
            <PasswordInput form={form_name}/>
            <SubmitBut handleLog={handleLogUp}/>
        </form>
    )  
}

export default SignUpForm