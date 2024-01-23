import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRightLong } from "react-icons/fa6"
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { useActions } from '../../../../../Hooks/useActions'
import { LuCheckCircle } from "react-icons/lu"
import { BsFillCloudCheckFill } from "react-icons/bs"
import { BsFillPatchCheckFill } from "react-icons/bs"
import { BsShieldFillCheck } from "react-icons/bs"



const SignUpForm = ({ formBlur }) => {

    
    const { toggleCoverPanel } = useActions()

    // console.log(formBlur)

    const {
        register,
        handleSubmit,
        resetField,
        watch,
        setError,
        formState: { errors, isLoading } 
    } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange"
    })

    //* Confirm_password's error react validation
    useEffect(() => {
        const pass = watch('sign_up_password')
        const confirm = watch('confirm_password')
        if (pass && confirm) {
            pass !== confirm ? 
            setError('confirm_password', {message: 'Пароли не совпадают'}) : 
            setError('confirm_password', null)
        }
    }, [watch('sign_up_password'), watch('confirm_password')])

    const onSubmit = (data) => {
        // data.sign_up_store = store
        data.sign_up_device = navigator.userAgent
        data.sign_up_username = data.sign_up_username.toLowerCase()
        delete data.confirm_password
        // alert(JSON.stringify(data))
        // console.log(`Юзер: ${data.sign_up_username}`)
        // console.log(`Пароль: ${data.sign_up_password}`)
        // console.log(`Точка: ${data.sign_up_store}`)
        // console.log(`Устройство: ${data.device}`)

        toggleCoverPanel('sign_up_2')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className={`inputs-cont cont ${formBlur ? 'blur' : ''}`}>
                <UserNameInput
                    name='sign_up_username'
                    placeholder='Логин'
                    register={register}
                    isValidate={true}
                    error={errors?.sign_up_username}
                    reset={resetField}
                    // inputRef={inputUserNameRef}
                /> 
                <PasswordInput
                    name='sign_up_password'
                    register={register}
                    error={errors?.sign_up_password}
                    reset={resetField}
                />
                <PasswordInput
                    name='confirm_password'
                    register={register}
                    error={errors?.confirm_password}
                    reset={resetField}
                    isConfirmPass={true}
                    watch={watch}
                />
            </div>
            <div className={`blur_icon-cont cont ${formBlur ? 'active' : ''}`}>
                <LuCheckCircle className='fa-icon'/>
            </div>
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                notSaveUser={false}
                disabled={formBlur}
                isLoading={isLoading}
            />
        </form>
    )  
}

export default SignUpForm