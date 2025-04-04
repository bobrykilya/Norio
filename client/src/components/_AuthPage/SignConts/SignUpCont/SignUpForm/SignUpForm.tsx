import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { focusInput } from '../../../../../utils/focusInput'
import { FaArrowRightLong } from "react-icons/fa6"
import UserNameInput from '../../../../common/Inputs/InputFields/NameInput/NameInput'
import PasswordInput from '../../../../common/Inputs/InputFields/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { LuCheckCircle } from "react-icons/lu"
import { FaUser } from "react-icons/fa"
import { useCoverPanelState } from "../../../../../stores/Auth-store"
import useCloseOnEsc from "../../../../../hooks/useCloseOnEsc"
import { ICheckUserReq } from "../../../../../../../common/types/Auth-types"
import { useModalState } from "../../../../../stores/Global-store"
import SignUp from "../../../../../features/auth/signUp"



type SignUpFormProps = {
    isFormBlur: boolean;
    isFormDisabled: boolean;
}
const SignUpForm = ({ isFormBlur, isFormDisabled }: SignUpFormProps) => {
    // console.log('SignUp')
    
    const { setCoverPanelState } = useCoverPanelState()
    const modalState = useModalState(s => s.modalState)
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
            confirmPassword: '1234User'
        }
    })

    const commonProps = {
        register: register,
        errors: errors,
        reset: resetField,
        disabled: isFormDisabled,
    }

    //* confirmPassword's error react validation
    useEffect(() => {
        // console.log(watch('password'), watch('confirmPassword'))
        const pass = watch('password')
        const confirm = watch('confirmPassword')
        if (pass && confirm) {
            pass !== confirm ? 
            setError('confirmPassword', {message: 'Пароли не совпадают'}) : 
            setError('confirmPassword', null)
        }
    }, [watch('password'), watch('confirmPassword')])

    //* For forms Esc blur while any DropDown, SnackBar or JumpingCard is opened
    useCloseOnEsc({
        conditionsList: [!isFormDisabled, !modalState],
        callback: () => setCoverPanelState('sign_in')
    })

    const onSubmit = async (data: ICheckUserReq & { confirmPassword: string }) => {
        delete data.confirmPassword

        setIsLoading(true)
        await SignUp.handleCheckUser(data)
            .catch(() => {
                focusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className={`inputs-cont cont ${ isFormBlur ? 'blur' : ''}`}>
                <UserNameInput
                    name='username'
                    placeholder='Логин'
                    icon={<FaUser className='input_field-icon'/>}
                    inputType='sign_up'
                    inputRefLogin={inputRefLogin}
                    { ...commonProps }
                />
                <PasswordInput
                    name='password'
                    inputType='sign_up'
                    { ...commonProps }
                />
                <PasswordInput
                    name='confirmPassword'
                    inputType='confirm'
                    watch={watch}
                    { ...commonProps }
                />
            </div>
            <div className={`blur_icon-cont cont ${isFormBlur ? 'active' : ''}`}>
                <LuCheckCircle className='fa-icon'/>
            </div>
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                disabled={isFormDisabled}
                blur={isFormBlur}
                isLoading={isLoading}
                toolTip={{
                    text: 'Продолжить регистрацию'
                }}
            />
        </form>
    )  
}

export default SignUpForm