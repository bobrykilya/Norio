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
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(true)

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        // control,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        // mode: 'onChange',
    })

    const onSubmit = (data) => {
        // alert(data.pass)
        console.log(`Юзер: ${data.sign_up_username}`)
        console.log(`Пароль: ${data.sign_up_password}`)
    }
    
    //     const REG_INFO = {
    //         u_name: name_el.value,
    //         u_passw: passw_el.value,
    //         u_device: navigator.userAgent,
    //     }
    //     console.log(REG_INFO)
    const handleResetInputs = () => {
        // console.log('Cleaning')
        reset()
        clearErrors()
        setIsLockVisible(false)
        // setIsCleanerOpened(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className='inputs-cont cont'>
                {/* <input {{... register}} type="text" /> */}
                {/* <StoresInput store={store} setStore={setStore}/> */}
                <UserNameInput
                    name='sign_up_username'
                    register={register}
                    error={errors?.sign_up_username} 
                /> 
                <PasswordInput
                    name='sign_up_password'
                    register={register}
                    error={errors?.sign_up_password}
                    isLockVisible={isLockVisible}
                    setIsLockVisible={setIsLockVisible}
                />
                <InputsCleaner opened={isCleanerOpened} onClick={handleResetInputs}/>
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