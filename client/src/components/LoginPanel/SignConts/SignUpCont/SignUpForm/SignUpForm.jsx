import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import StoresInput from '../../../Inputs/StoresInput/StoresInput'
import InputsCleaner from '../../../Inputs/InputsCleaner/InputsCleaner'
import { FaArrowRightLong } from "react-icons/fa6"



const SignUpForm = () => {

    const [store, setStore] = useState('Точка')
    
    const [isCleanerOpened, setIsCleanerOpened] = useState(true)
    const inputUserNameRef = useRef(null)

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        // control,
        formState: { errors }
    } = useForm({
        mode: 'onBlur'
    })

    // console.log(isDirty)
    // useEffect(() => {
    //     isDirty ? setIsCleanerOpened(true) : setIsCleanerOpened(false)
    // }, [isDirty]);


    const handleResetInputs = () => {
        // console.log('Cleaning')
        // setIsLockVisible(false)
        // setIsLockOpened(false)
        reset()
        clearErrors()
        // setIsCleanerOpened(false)
    }
    
    const onSubmit = (data) => {
        // alert(data.pass)
        data.device = navigator.userAgent
        console.log(`Юзер: ${data.sign_up_username}`)
        console.log(`Пароль: ${data.sign_up_password}`)
        console.log(`Устройство: ${data.device}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className='inputs-cont cont'>
                {/* <input {{... register}} type="text" /> */}
                <StoresInput store={store} setStore={setStore}/>
                <UserNameInput
                    name='sign_up_username'
                    register={register}
                    error={errors?.sign_up_username}
                    inputRef={inputUserNameRef}
                /> 
                <PasswordInput
                    name='sign_up_password'
                    register={register}
                    error={errors?.sign_up_password}
                />
                {/* <InputsCleaner opened={isCleanerOpened} onClick={handleResetInputs}/> */}
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