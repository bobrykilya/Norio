import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import NameInput from '../../../Inputs/NameInput/NameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import StoresInput from '../../../Inputs/StoresInput/StoresInput'
import InputsCleaner from '../../InputsCleaner/InputsCleaner'
import { FaArrowRightLong } from "react-icons/fa6"



const SignUpForm = () => {

    const [store, setStore] = useState('Точка')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const {
        // register,
        handleSubmit,
        control,
        // formState: {
        //     errors
        // }
    } = useForm()

    const onSubmit = (data) => {
        alert(data)
        console.log(data)
    }
    
    //     const REG_INFO = {
    //         u_name: name_el.value,
    //         u_passw: passw_el.value,
    //         u_device: navigator.userAgent,
    //     }
    //     console.log(REG_INFO)
    const handleResetInputs = () => {
        return
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className='inputs-cont cont'>
                {/* <input {{... register}} type="text" /> */}
                {/* <StoresInput store={store} setStore={setStore}/> */}
                <NameInput name={name} setName={setName} control={control} /> 
                {/* <PasswordInput password={password} setPassword={setPassword}/>
                <InputsCleaner opened={true} onClick={handleResetInputs}/> */}
            </div>
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                notSaveUser={false}
            />
        </form>
    )  
}

export default SignUpForm