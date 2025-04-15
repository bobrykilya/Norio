import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { focusInput } from '../../../../../utils/focusInput'
import NameInput from '../../../../common/Inputs/InputFields/NameInput/NameInput'
import PasswordInput from '../../../../common/Inputs/InputFields/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { useCoverPanelState } from "../../../../../stores/Auth-store"
import useCloseOnEsc from "../../../../../hooks/useCloseOnEsc"
import { ICheckUserReq } from "../../../../../../../common/types/Auth-types"
import { useModalState } from "../../../../../stores/Global-store"
import SignUp from "../../../../../features/auth/signUp"
import { ICONS } from "../../../../../assets/common/Icons-data"



type SignUpFormProps = {
    isFormBlur: boolean;
    isFormDisabled: boolean;
}
const SignUpForm = ({ isFormBlur, isFormDisabled }: SignUpFormProps) => {
    // console.log('SignUp')
    
    const { setCoverPanelState } = useCoverPanelState()
    const { getCommonModalState } = useModalState()
    const [isLoading, setIsLoading] = useState(false)
    const inputRefLogin = useRef(null)
    const defaultValues = {
        username: '',
        password: '',
        confirmPassword: ''
    }
    const preloadValues = {
        username: 'Userl',
        password: '1234User',
        confirmPassword: '1234User'
    }

    const {
        register,
        handleSubmit,
        resetField: reset,
        watch,
        setValue,
        setError,
        formState: { errors } 
    } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues
    })

    const commonProps = {
        register,
        errors,
        reset,
        watch,
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
        conditionsList: [!isFormDisabled, !getCommonModalState()],
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

    //! Remove
    const preloadFormValuesSetting = () => {
        for (const name in defaultValues) {
            setValue(name as keyof {
                username: string;
                password: string;
                confirmPassword: string;
            }, preloadValues[name])
        }
    }
    useEffect(() => {
        preloadFormValuesSetting()
    }, [])


    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className={`inputs-cont cont ${ isFormBlur ? 'blur' : ''}`}>
                <NameInput
                    name='username'
                    placeholder='Логин'
                    icon={ICONS.user}
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
                    { ...commonProps }
                />
            </div>
            <div className={`blur_icon-cont cont ${isFormBlur ? 'active' : ''}`}>
                {ICONS.check}
            </div>
            <SubmitBut 
                icon={ICONS.next}
                disabled={isFormDisabled}
                blur={isFormBlur}
                isLoading={isLoading}
                toolTip={{
                    message: 'Продолжить регистрацию'
                }}
            />
        </form>
    )  
}

export default SignUpForm