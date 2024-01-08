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
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isCleanerOpened, setIsCleanerOpened] = useState(true)

    console.log(password)

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
        alert(data.pass)
        console.log(data.password)
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
        // setIsCleanerOpened(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className='inputs-cont cont'>
                {/* <input {{... register}} type="text" /> */}
                {/* <StoresInput store={store} setStore={setStore}/> */}
                {/* <UserNameInput 
                    // fieldname={'username'} 
                    username={username} 
                    setUserName={setUserName}
                    register={register}
                    error={errors?.username} 
                    // control={control}
                />  */}
                <PasswordInput 
                    password={password} 
                    setPassword={setPassword}
                    register={register}
                    error={errors?.password} 
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