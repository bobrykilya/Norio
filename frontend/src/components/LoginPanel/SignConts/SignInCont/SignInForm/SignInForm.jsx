// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import NameInput from '../../../Inputs/NameInput/NameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import CheckBox from './CheckBox/CheckBox'
import SubmitBut from '../../../SubmitBut/SubmitBut'



const SignInForm = (props) => {

    const form_name = '#sign_in-form'
    const submit_but = document.querySelector(form_name + ' .submit-but')
    const passw_el = document.querySelector(form_name + ' .passw_input')
    const name_el = document.querySelector(form_name + ' .name_input')
    let CheckBoxVal = false
    
    // const SignIn = async () => {
    //     const LOG_INFO = {
    //         u_name: name_el.value,
    //         u_passw: passw_el.value,
    //         u_device: navigator.userAgent,
    //         is_once: CheckBoxVal,
    //     }
    //     console.log(LOG_INFO)
    // }

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()


    const handleChangeCheckBox = (checked) => {
        checked ? submit_but.type = 'button' : submit_but.type = 'submit'
        CheckBoxVal = checked
    }

    const onSubmit = (data) => {
        alert(JSON.stringify({...register()}))
        // alert(JSON.stringify(data))
    }

    return (
        <form id='sign_in-form' className='form cont' onSubmit={handleSubmit(onSubmit)}>
            <NameInput/>
            <PasswordInput checkMethods={{...register()}} form={form_name}/>
            <label id='checkbox-cont' className='cont'>
                <CheckBox onChange={handleChangeCheckBox}/>
                <span>Не запоминать меня</span>
            </label>
            <SubmitBut icon='fa-solid fa-right-to-bracket'/>
        </form>
    )  
}

export default SignInForm