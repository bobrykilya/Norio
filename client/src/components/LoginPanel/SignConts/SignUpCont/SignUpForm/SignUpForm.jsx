import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRightLong } from "react-icons/fa6"
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import StoresInput from '../../../Inputs/StoresInput/StoresInput'
import { useFocusInput } from "../../../../Hooks/useFocusInput"



const SignUpForm = () => {

    const inputUserNameRef = useRef(null)

    const {
        register,
        handleSubmit,
        resetField,
        // control,
        formState: { errors }
    } = useForm({
        mode: 'onBlur'
    })

    const handleFocusInput = () => {
        useFocusInput(inputUserNameRef)
    }
    
    const onSubmit = (data) => {
        // alert(data.pass)
        data.device = navigator.userAgent
        // reset(sign_up_password)
        console.log(`Юзер: ${data.sign_up_username}`)
        console.log(`Пароль: ${data.sign_up_password}`)
        console.log(`Устройство: ${data.device}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className='inputs-cont cont'>
                <StoresInput 
                    onFocusInput={handleFocusInput}
                />
                <UserNameInput
                    name='sign_up_username'
                    register={register}
                    error={errors?.sign_up_username}
                    reset={resetField}
                    inputRef={inputUserNameRef}
                    
                /> 
                <PasswordInput
                    name='sign_up_password'
                    register={register}
                    error={errors?.sign_up_password}
                    reset={resetField}
                />
            </div>
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                notSaveUser={false}
                disabled={false}
            />
        </form>
    )  
}

export default SignUpForm