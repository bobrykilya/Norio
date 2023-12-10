// import { useState } from 'react'
import NameInput from '../../Inputs/NameInput/NameInput'
import PasswordInput from '../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../SubmitBut/SubmitBut'



const SignUpForm = (props) => {

    const form_name = '#sign_up-cont'
    const passw_el = document.querySelector(form_name + ' .passw_input')
    const name_el = document.querySelector(form_name + ' .name_input')


    const handleSignUp = async () => {
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
            <SubmitBut handleSign={handleSignUp}/>
        </form>
    )  
}

export default SignUpForm