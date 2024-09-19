import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { focusInput } from '../../../../../utils/focusInput'
import { AuthContext } from '../../../../../context/Auth-context'
import { FaArrowRightLong } from "react-icons/fa6"
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { LuCheckCircle } from "react-icons/lu"
import { FaUser } from "react-icons/fa"



type SignUpFormProps = {
    isFormBlur: boolean;
    isSubmitButBlur: boolean;
}
const SignUpForm = ({ isFormBlur, isSubmitButBlur }: SignUpFormProps) => {
    // console.log('SignUp')
    
    const { handleCheckUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefLogin = useRef(null)

    const {
        register,
        handleSubmit,
        resetField,
        watch,
        setError,
        formState: { errors } 
    } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues: {
            username: 'User',
            password: '1234User',
            confirm_password: '1234User'
        }
    })

    //* Confirm_password's error react validation
    useEffect(() => {
        // console.log(watch('password'), watch('confirm_password'))
        const pass = watch('password')
        const confirm = watch('confirm_password')
        if (pass && confirm) {
            pass !== confirm ? 
            setError('confirm_password', {message: 'Пароли не совпадают'}) : 
            setError('confirm_password', null)
        }
    }, [watch('password'), watch('confirm_password')])

    const onSubmit = async (data) => {
        delete data.confirm_password

        setIsLoading(true)
        await handleCheckUser(data)
            .catch(() => {
                focusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className={`inputs-cont cont ${isFormBlur ? 'blur' : ''}`}>
                <UserNameInput
                    name='username'
                    placeholder='Логин'
                    icon={<FaUser className='input-icon'/>}
                    inputType='sign_up'
                    register={register}
                    error={errors?.username}
                    reset={resetField}
                    disabled={isFormBlur}
                    inputRefLogin={inputRefLogin}
                />
                <PasswordInput
                    name='password'
                    inputType='sign_up'
                    register={register}
                    error={errors?.password}
                    reset={resetField}
                    disabled={isFormBlur}
                />
                <PasswordInput
                    name='confirm_password'
                    inputType='confirm'
                    register={register}
                    error={errors?.confirm_password}
                    reset={resetField}
                    watch={watch}
                    disabled={isFormBlur}
                />
            </div>
            <div className={`blur_icon-cont cont ${isFormBlur ? 'active' : ''}`}>
                <LuCheckCircle className='fa-icon'/>
            </div>
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                disabled={isFormBlur || isSubmitButBlur}
                isLoading={isLoading}
                title='Продолжить регистрацию'
            />
        </form>
    )  
}

export default SignUpForm