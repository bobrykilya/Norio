import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../../../context/AuthContext'
import { FaArrowRightLong } from "react-icons/fa6"
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { LuCheckCircle } from "react-icons/lu"
// import { BsFillCloudCheckFill } from "react-icons/bs"
// import { BsFillPatchCheckFill } from "react-icons/bs"
// import { BsShieldFillCheck } from "react-icons/bs"
import { FaUser } from "react-icons/fa"


const SignUpForm = ({ isFormBlur, isSubmitButBlur }) => {
    // console.log('SignUp')
    // console.log(isFormBlur)
    
    const { handleCheckUser } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        resetField,
        watch,
        setError,
        formState: { errors, isLoading } 
    } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues: {
            username: 'User',
            password: '1234User',
            confirm_password: '1234User'
        }
    })

    //* Confirm_password's error react validation
    useEffect(() => {
        // console.log(watch('password'), watch('confirm_password'))
        const pass = watch('password')
        const confirm = watch('confirm_password')
        if (pass && confirm) {
            pass !== confirm ? 
            setError('confirm_password', {message: 'Пароли не совпадают'}) : 
            setError('confirm_password', null)
        }
    }, [watch('password'), watch('confirm_password')])

    const onSubmit = async (data) => {
        data.username = data.username.toLowerCase()
        delete data.confirm_password
        // alert(JSON.stringify(data))
        // console.log(`Юзер: ${data.username}`)
        // console.log(`Пароль: ${data.password}`)
        // console.log(`Устройство: ${data.device}`)
        handleCheckUser(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className={`inputs-cont cont ${isFormBlur ? 'blur' : ''}`}>
                <UserNameInput
                    name='username'
                    placeholder='Логин'
                    icon={<FaUser className='input-icon'/>}
                    type='sign_up'
                    register={register}
                    error={errors?.username}
                    reset={resetField}
                    disabled={isFormBlur}
                />
                <PasswordInput
                    name='password'
                    type='sign_up'
                    register={register}
                    error={errors?.password}
                    reset={resetField}
                    disabled={isFormBlur}
                />
                <PasswordInput
                    name='confirm_password'
                    type='confirm'
                    register={register}
                    error={errors?.confirm_password}
                    reset={resetField}
                    watch={watch}
                    disabled={isFormBlur}
                />
            </div>
            <div className={`blur_icon-cont cont ${isFormBlur ? 'active' : ''}`}>
                <LuCheckCircle className='fa-icon'/>
            </div>
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                notSaveUser={false}
                disabled={isSubmitButBlur}
                isLoading={isLoading}
                title='Продолжить регистрацию'
            />
        </form>
    )  
}

export default SignUpForm