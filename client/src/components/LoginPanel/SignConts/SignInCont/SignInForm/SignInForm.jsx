
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import CheckBox from './CheckBox/CheckBox'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { BiLogInCircle } from "react-icons/bi"



const SignInForm = () => {

    const [notSaveUser, setNotSaveUser] = useState(false)
    const inputUserNameRef = useRef(null)

    const {
        register,
        handleSubmit,
        resetField,
        getValues,
        // control,
    } = useForm({
        mode: 'onBlur',
        reValidateMode: "onBlur"
    })

    const handleChangeCheckBox = () => {
        setNotSaveUser((prev) => !prev)
    }

    const onSubmitNotSave = async () => {
        // console.log()
        const data = {
            sign_in_username: getValues('sign_in_username'),
            sign_in_password: getValues('sign_in_password'),
            is_not_save: true,
            sign_up_device: navigator.userAgent
        }
        alert(JSON.stringify(data))
        // alert('Not Save')
    }

    const onSubmit = async (data) => {
        data.is_not_save = false
        data.sign_up_device = navigator.userAgent
        // console.log(data)
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_in-form' className='form cont' >
            <div className='inputs-cont cont'>
                <UserNameInput
                    name='sign_in_username'
                    register={register}
                    error={null}
                    reset={resetField}
                    inputRef={inputUserNameRef}
                /> 
                <PasswordInput
                    name='sign_in_password'
                    register={register}
                    error={null}
                    reset={resetField}
                    isSignIn={true}
                />
                <label id='checkbox-cont' className='cont'>
                    <CheckBox onChange={handleChangeCheckBox} checked={notSaveUser}/>
                    <span>Не запоминать меня</span>
                </label>
            </div>
            <SubmitBut 
                icon={<BiLogInCircle className='fa-icon'/>}
                notSaveUser={notSaveUser}
                onClick={onSubmitNotSave}
            />
        </form>
    )  
}

export default SignInForm