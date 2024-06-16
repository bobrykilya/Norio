import { useState, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useFocusInput } from './../../../../../hooks/useFocusInput';
import { AuthContext } from "../../../../../context/Auth-context"
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import CheckBox from '../../../../Inputs/CheckBox/CheckBox'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { BiLogInCircle } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import ToolTip from './../../../../ToolTip/ToolTip' 



const SignInForm = ({  isFormBlur=false}) => {
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
            username: 'Adminf',
            password: 'Qwe123',
        }
    })

    const handleChangeCheckBox = () => {
        setNotSaveUser((prev) => !prev)
    }

    const onSubmitNotSave = async (data) => {
        data.fastSession = true
        
        reset()

        setIsLoading(true)
        await handleSignIn(data)
            .catch(() => {
                setValue('username', data.username)
                setValue('password', data.password)
                useFocusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
        // alert(JSON.stringify(data))
    }

    const onSubmit = async (data) => {

        setIsLoading(true)
        await handleSignIn(data)
            .catch(() => {
                useFocusInput(inputRefLogin)
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
                    type='sign_in'
                    register={register}
                    reset={resetField}
                    watch={watch}
                    notSaveUser={notSaveUser}
                    disabled={isFormBlur}
                />
                <label id='checkbox-cont' className='cont'>
                    <CheckBox onChange={handleChangeCheckBox} checked={notSaveUser}/>
                    <span>Быстрая сессия</span>
                    <ToolTip text='Длительность сессии - 10мин. Пароль не сохраняется автоматически' />
                </label>
            </div>
            <SubmitBut
                icon={<BiLogInCircle className='fa-icon'/>}
                notSaveUser={notSaveUser}
                onClick={handleSubmit(onSubmitNotSave)}
                isLoading={isLoading}
                title='Выполнить вход'
            />
        </form>
    )  
}

export default SignInForm