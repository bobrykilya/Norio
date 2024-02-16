import { useState } from 'react'
import { useForm } from 'react-hook-form'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import CheckBox from './CheckBox/CheckBox'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { BiLogInCircle } from "react-icons/bi"
import { FaUser } from "react-icons/fa"



const SignInForm = ({  isFormBlur=false}) => {
    // console.log('SignIn')

    const [notSaveUser, setNotSaveUser] = useState(false)
    // const inputUserNameRef = useRef(null)

    const {
        register,
        handleSubmit,
        resetField,
        formState: { isLoading },
    } = useForm({
        mode: 'onBlur',
        reValidateMode: "onBlur"
    })

    const handleChangeCheckBox = () => {
        setNotSaveUser((prev) => !prev)
    }

    const onSubmitNotSave = async (data) => {
        data.is_not_save = true
        data.sign_up_device = navigator.userAgent
        // console.log(data)
        alert(JSON.stringify(data))
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
                    name='username'
                    placeholder='Логин'
                    icon={<FaUser className='input-icon'/>}
                    register={register}
                    reset={resetField}                 
                    notSaveUser={notSaveUser}
                    disabled={isFormBlur}
                /> 
                <PasswordInput
                    name='password'
                    type='sign_in'
                    register={register}
                    reset={resetField}
                    notSaveUser={notSaveUser}
                    disabled={isFormBlur}
                />
                <label id='checkbox-cont' className='cont'>
                    <CheckBox onChange={handleChangeCheckBox} checked={notSaveUser}/>
                    <span>Не запоминать меня</span>
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