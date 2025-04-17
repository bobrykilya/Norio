import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { focusInput } from '../../../../../utils/focusInput';
import NameInput from '../../../../common/Inputs/InputFields/NameInput/NameInput'
import PasswordInput from '../../../../common/Inputs/InputFields/PasswordInput/PasswordInput'
import CheckBox from '../../../../common/Inputs/CheckBox/CheckBox'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import ToolTip from '../../../../others/ToolTip/ToolTip'
import { ISignInReq } from "../../../../../../../common/types/Auth-types"
import SignIn from "../../../../../features/auth/signIn"
import { ICONS } from "../../../../../assets/common/Icons-data"



type SignInFormProps = {
    isFormDisabled: boolean;
}
const SignInForm = ({ isFormDisabled }: SignInFormProps) => {
    // console.log('SignIn has been updated')
    
    const [notSaveUser, setNotSaveUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefLogin = useRef(null)
    const defaultValues = {
        username: '',
        password: ''
    }
    const preloadValues = {
        username: 'Admin',
        password: 'Qwe123'
    }

    const {
        register,
        handleSubmit,
        reset: resetForm,
        resetField: reset,
        watch,
        setValue,
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues
    })

    const commonProps = {
        register,
        reset,
        notSaveUser,
        watch,
        disabled: isFormDisabled,
    }

    const handleChangeCheckBox = () => {
        setNotSaveUser((prev) => !prev)
    }

    const onSubmitNotSave = async (data: ISignInReq) => {
        data.fastSession = true

        resetForm()

        setIsLoading(true)
        await SignIn.handleSignIn(data)
            .catch(() => {
                setValue('username', data.username)
                setValue('password', data.password)
                focusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
    }

    const onSubmit = async (data: ISignInReq) => {
        // console.log(data)
        setIsLoading(true)
        await SignIn.handleSignIn(data)
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
            }, preloadValues[name])
        }
    }
    useEffect(() => {
        preloadFormValuesSetting()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_in-form' className='form cont' >
            <div className='inputs-cont cont'>
                <NameInput
                    name='username'
                    placeholder='Логин'
                    icon={ICONS.user}
                    inputRefLogin={inputRefLogin}
                    { ...commonProps }
                />
                <PasswordInput
                    name='password'
                    inputType='sign_in'
                    { ...commonProps }
                />
                <label id='checkbox-cont' className='cont'>
                    <CheckBox onChange={handleChangeCheckBox} checked={notSaveUser} disabled={isFormDisabled} />
                    <span>Быстрая сессия</span>
                    <ToolTip message='Длительность сессии ограничена. Пароль не сохраняется автоматически' />
                </label>
            </div>
            <SubmitBut
                icon={ICONS.enter}
                onClick={handleSubmit(onSubmitNotSave)}
                disabled={isFormDisabled}
                useOnClick={notSaveUser}
                isLoading={isLoading}
                toolTip={{
                    message: 'Выполнить вход'
                }}
            />
        </form>
    )  
}

export default SignInForm