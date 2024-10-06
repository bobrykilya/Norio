import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { focusInput } from '../../../../../utils/focusInput'
import { AuthContext } from '../../../../../context/Auth-context'
import { FaArrowRightLong } from "react-icons/fa6"
import UserNameInput from '../../../Inputs/NameInput/NameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { LuCheckCircle } from "react-icons/lu"
import { FaUser } from "react-icons/fa"
import { useCoverPanelState } from "../../../../../stores/Auth-store"
import useCloseOnEsc from "../../../../../hooks/useCloseOnEsc"
import { ICheckUserReq } from "../../../../../../../common/types/Auth-types"



type SignUpFormProps = {
    isFormBlur: boolean;
    isFormDisabled: boolean;
    isAnyCoverModalOpened: boolean;
}
const SignUpForm = ({ isFormBlur, isFormDisabled, isAnyCoverModalOpened }: SignUpFormProps) => {
    // console.log('SignUp')
    
    const { handleCheckUser } = useContext(AuthContext)
    const setCoverPanelState = useCoverPanelState(s => s.setCoverPanelState)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefLogin = useRef(null)

    const {
        register,
        handleSubmit,
        resetField,
        watch,
        setError,
        formState: { errors } 
    } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues: {
            username: 'User',
            password: '1234User',
            confirmPassword: '1234User'
        }
    })

    //* confirmPassword's error react validation
    useEffect(() => {
        // console.log(watch('password'), watch('confirmPassword'))
        const pass = watch('password')
        const confirm = watch('confirmPassword')
        if (pass && confirm) {
            pass !== confirm ? 
            setError('confirmPassword', {message: 'Пароли не совпадают'}) : 
            setError('confirmPassword', null)
        }
    }, [watch('password'), watch('confirmPassword')])

    //* For forms Esc blur while any DropDown, SnackBar or JumpingList is opened
    useCloseOnEsc({
        successConditionsList: [!isFormDisabled, !isAnyCoverModalOpened],
        successFun: () => setCoverPanelState('sign_in')
    })

    const onSubmit = async (data: ICheckUserReq & { confirmPassword: string }) => {
        delete data.confirmPassword

        setIsLoading(true)
        await handleCheckUser(data)
            .catch(() => {
                focusInput(inputRefLogin)
            })
            .finally(() => setIsLoading(false))
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className={`inputs-cont cont ${ isFormBlur ? 'blur' : ''}`}>
                <UserNameInput
                    name='username'
                    placeholder='Логин'
                    icon={<FaUser className='input-icon'/>}
                    inputType='sign_up'
                    register={register}
                    error={errors?.username}
                    reset={resetField}
                    disabled={isFormDisabled}
                    inputRefLogin={inputRefLogin}
                />
                <PasswordInput
                    name='password'
                    inputType='sign_up'
                    register={register}
                    error={errors?.password}
                    reset={resetField}
                    disabled={isFormDisabled}
                />
                <PasswordInput
                    name='confirmPassword'
                    inputType='confirm'
                    register={register}
                    error={errors?.confirmPassword}
                    reset={resetField}
                    watch={watch}
                    disabled={isFormDisabled}
                />
            </div>
            <div className={`blur_icon-cont cont ${isFormBlur ? 'active' : ''}`}>
                <LuCheckCircle className='fa-icon'/>
            </div>
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                disabled={isFormDisabled}
                blur={isFormBlur}
                isLoading={isLoading}
                title='Продолжить регистрацию'
            />
        </form>
    )  
}

export default SignUpForm