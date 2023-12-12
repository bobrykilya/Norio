// import { useState } from 'react'
import NameInput from '../../../Inputs/NameInput/NameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import StoresInput from '../../../Inputs/StoresInput/StoresInput'


const SignUpForm = (props) => {

    const form_name = '#sign_up-form'
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
        <form id='sign_up-form' className='form cont'>
            <NameInput/>
            <PasswordInput form={form_name}/>
            <StoresInput />
            <SubmitBut icon='fa-solid fa-arrow-right' onClick={handleSignUp}/>
        </form>
    )  
}

export default SignUpForm