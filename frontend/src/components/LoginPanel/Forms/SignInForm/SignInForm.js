// import { useState } from 'react'
import NameInput from '../../Inputs/NameInput/NameInput'
import PasswordInput from '../../Inputs/PasswordInput/PasswordInput'
import CheckBox from './CheckBox/CheckBox'
import SubmitBut from '../../SubmitBut/SubmitBut'



const SignInForm = (props) => {

    // const LOG_INFO = {
    //     u_name: false,
    //     u_passw: false
    // }
    const form_name = '#sign_in-cont'
    const submit_but = document.querySelector(form_name + ' .submit-but')
    const passw_el = document.querySelector(form_name + ' .passw_input')
    const name_el = document.querySelector(form_name + ' .name_input')
    let CheckBoxVal = false

    // const [logInfo, setLogInfo] = useState(LOG_INFO)

    // const handleChangeInputName = (name) => {
    //     LOG_INFO.u_name = name ? name : false
        // console.log(LOG_INFO)

        // setLogInfo(prevLogInfo =>{
        //     return {
        //         ...prevLogInfo,
        //         u_name: name
        //     }
        // })
        // console.log(logInfo)
    // }
    // const handleChangeInputPassword = (password) => {
    //     LOG_INFO.u_passw = password ? password : false
    //     // console.log(LOG_INFO)
    // }
    const handleChangeCheckBox = (checked) => {
        checked ? submit_but.type = 'button' : submit_but.type = 'submit'
        CheckBoxVal = checked
    }

    // const CheckInput = (e) => {
    //     console.log(e)
    // }

    // const handleCheckInputs = (e) => {
    //     // console.log(CheckInput(e))
    // }

    const SignIn = async () => {
        const LOG_INFO = {
            u_name: name_el.value,
            u_passw: passw_el.value,
            u_device: navigator.userAgent,
            is_once: CheckBoxVal,
        }
        console.log(LOG_INFO)
    }

    return (
        <form id='sign_in-form' className='cont'>
            {/* <NameInput onChange={handleChangeInputName}/>
            <PasswordInput onChange={handleChangeInputPassword}/> */}
            <NameInput/>
            {/* <PasswordInput form={form_name} onCheckInput={CheckInput}/> */}
            <PasswordInput form={form_name}/>
            <label id='checkbox-cont' className='cont'>
                <CheckBox onChange={handleChangeCheckBox}/>
                <span>Не запоминать меня</span>
            </label>
            <SubmitBut onClick={SignIn}/>
        </form>
    )  
}

export default SignInForm