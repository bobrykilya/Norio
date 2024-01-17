import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRightLong } from "react-icons/fa6"
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import PasswordInput from '../../../Inputs/PasswordInput/PasswordInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import StoresInput from '../../../Inputs/StoresInput/StoresInput'
import { useFocusInput } from "../../../../Hooks/useFocusInput"



const SignUpForm = () => {

    const [store, setStore] = useState('Точка')
    const [storeError, setStoreError] = useState(null)
    const inputUserNameRef = useRef(null)

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
            setError('confirm_password', {})
        }
    }, [watch('sign_up_password'), watch('confirm_password')])

    const handleFocusInput = () => {
        useFocusInput(inputUserNameRef)
    }
    
    const checkStoresInput = (data) => {
        // console.log(store)
        store !== 'Точка' ? onSubmit(data) : openStoreError()
    }

    const openStoreError = () => {
        // console.log(store)
        setStoreError({message: 'Выберите точку'})
    }

    const onSubmit = (data) => {
        // data.sign_up_store = store
        data.sign_up_device = navigator.userAgent
        data.sign_up_username = data.sign_up_username.toLowerCase()
        delete data.confirm_password
        alert(JSON.stringify(data))
        // console.log(`Юзер: ${data.sign_up_username}`)
        // console.log(`Пароль: ${data.sign_up_password}`)
        // console.log(`Точка: ${data.sign_up_store}`)
        // console.log(`Устройство: ${data.device}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up-form' className='form cont'>
            <div className='inputs-cont cont'>
                {/* <StoresInput
                    store={store}
                    setStore={setStore}
                    onFocusInput={handleFocusInput}
                    error={storeError}
                    setStoreError={setStoreError}
                /> */}
                <UserNameInput
                    name='sign_up_username'
                    register={register}
                    error={errors?.sign_up_username}
                    reset={resetField}
                    inputRef={inputUserNameRef}
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
            <SubmitBut 
                icon={<FaArrowRightLong className='fa-icon'/>}
                notSaveUser={false}
                disabled={false}
                isLoading={isLoading}
            />
        </form>
    )  
}

export default SignUpForm