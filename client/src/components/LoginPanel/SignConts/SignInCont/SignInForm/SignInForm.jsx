import { useState } from 'react'
import { useForm } from 'react-hook-form'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import CheckBox from './CheckBox/CheckBox'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { BiLogInCircle } from "react-icons/bi"



const SignInForm = () => {

    //! notSaveUser = false
    const [notSaveUser, setNotSaveUser] = useState(true)

    // let CheckBoxVal = false
    
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


    const handleChangeCheckBox = () => {
        // CheckBoxVal = notSaveUser
        setNotSaveUser((prev) => !prev)
    }


    const onSubmit = (data) => {
        alert(JSON.stringify({...register()}))
        // alert(JSON.stringify(data))
    }
    const handleClickSubmit = async () => {
        return
    }

    return (
        <form id='sign_in-form' className='form cont' onSubmit={handleSubmit(onSubmit)}>
            <div className='inputs-cont cont'>
                {/* <UserNameInput /> */}
                {/* <PasswordInput checkMethods={{...register()}}/> */}
                <label id='checkbox-cont' className='cont'>
                    <CheckBox onChange={handleChangeCheckBox} checked={notSaveUser}/>
                    <span>Не запоминать меня</span>
                </label>
            </div>
            <SubmitBut 
                icon={<BiLogInCircle className='fa-icon'/>}
                onClick={handleClickSubmit}
                notSaveUser={notSaveUser}
            />
        </form>
    )  
}

export default SignInForm