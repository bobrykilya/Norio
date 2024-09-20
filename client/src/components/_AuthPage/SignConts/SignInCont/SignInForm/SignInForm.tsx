import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { focusInput } from '../../../../../utils/focusInput';
import { AuthContext } from "../../../../../context/Auth-context"
import UserNameInput from '../../../Inputs/NameInput/NameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import CheckBox from '../../../../Inputs/CheckBox/CheckBox'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { BiLogInCircle } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import ToolTip from '../../../../ToolTip/ToolTip'
import { IHandleSignIn } from '../../../../../types/Auth-types';



interface SignInFormProps {
    isFormBlur: boolean;
}
const SignInForm = ({ isFormBlur }: SignInFormProps) => {
    // console.log('SignIn')
    const { handleSignIn } = useContext(AuthContext)
    const [notSaveUser, setNotSaveUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefLogin = useRef(null)

    const {
        register,
        handleSubmit,
        reset,
        resetField,
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

    const handleChangeCheckBox = () => {
        setNotSaveUser((prev) => !prev)
    }

    const onSubmitNotSave = async (data: IHandleSignIn) => {
        // console.log('Fast')
        data.fastSession = true
        
        reset()

        setIsLoading(true)
        await handleSignIn(data)
            .catch(() => {
                setValue('username', data.username)
                setValue('password', data.password)
                focusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
        // alert(JSON.stringify(data))
    }

    const onSubmit = async (data: IHandleSignIn) => {
        // console.log(data)
        setIsLoading(true)
        await handleSignIn(data)
            .catch(() => {
                focusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
        // alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_in-form' className='form cont' >
            <div className='inputs-cont cont'>
                <UserNameInput
                    name='username'
                    placeholder='Логин'
                    icon={<FaUser className='input-icon'/>}
                    register={register}
                    reset={resetField}
                    notSaveUser={notSaveUser}
                    disabled={isFormBlur}
                    inputRefLogin={inputRefLogin}
                /> 
                <PasswordInput
                    name='password'
                    inputType='sign_in'
                    register={register}
                    reset={resetField}
                    watch={watch}
                    notSaveUser={notSaveUser}
                    disabled={isFormBlur}
                />
                <label id='checkbox-cont' className='cont'>
                    <CheckBox onChange={handleChangeCheckBox} checked={notSaveUser} disabled={isFormBlur} />
                    <span>Быстрая сессия</span>
                    <ToolTip text='Длительность сессии ограничена. Пароль не сохраняется автоматически' />
                </label>
            </div>
            <SubmitBut
                icon={<BiLogInCircle className='fa-icon'/>}
                blur={isFormBlur}
                notSaveUser={notSaveUser}
                onClick={handleSubmit(onSubmitNotSave)}
                isLoading={isLoading}
                title='Выполнить вход'
            />
        </form>
    )  
}

export default SignInForm