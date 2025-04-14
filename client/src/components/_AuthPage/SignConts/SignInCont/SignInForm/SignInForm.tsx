import React, { useRef, useState } from 'react'
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
    // console.log('SignIn')
    const [notSaveUser, setNotSaveUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefLogin = useRef(null)

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
        defaultValues: {
            username: 'Admin',
            password: 'Qwe123',
        }
    })

    const commonProps = {
        register,
        reset,
        notSaveUser,
        disabled: isFormDisabled,
    }

    const handleChangeCheckBox = () => {
        setNotSaveUser((prev) => !prev)
    }

    const onSubmitNotSave = async (data: ISignInReq) => {
        // console.log('Fast')
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
        // alert(JSON.stringify(data))
    }

    const onSubmit = async (data: ISignInReq) => {
        // console.log(data)
        setIsLoading(true)
        await SignIn.handleSignIn(data)
            .catch(() => {
                focusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
        // alert(JSON.stringify(data))
    }

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
                    watch={watch}
                    { ...commonProps }
                />
                <label id='checkbox-cont' className='cont'>
                    <CheckBox onChange={handleChangeCheckBox} checked={notSaveUser} disabled={isFormDisabled} />
                    <span>Быстрая сессия</span>
                    <ToolTip text='Длительность сессии ограничена. Пароль не сохраняется автоматически' />
                </label>
            </div>
            <SubmitBut
                icon={ICONS.enter}
                onClick={handleSubmit(onSubmitNotSave)}
                disabled={isFormDisabled}
                useOnClick={notSaveUser}
                isLoading={isLoading}
                toolTip={{
                    text: 'Выполнить вход'
                }}
            />
        </form>
    )  
}

export default SignInForm