import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import StoresInput from '../../../Inputs/StoresInput/StoresInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import { useFocusInput } from "../../../../../Hooks/useFocusInput"
import { TiArrowRightOutline } from "react-icons/ti"



const SignUpSecondForm = () => {

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

    const handleFocusInput = () => {
        // useFocusInput(inputUserNameRef)
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
        alert(JSON.stringify(data))
        // console.log(`Юзер: ${data.sign_up_username}`)
        // console.log(`Пароль: ${data.sign_up_password}`)
        // console.log(`Точка: ${data.sign_up_store}`)
        // console.log(`Устройство: ${data.device}`)
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up_2-form' className='form cont'>
            <div className='inputs-cont cont'>
                <StoresInput
                    store={store}
                    setStore={setStore}
                    onFocusInput={handleFocusInput}
                    error={storeError}
                    setStoreError={setStoreError}
                />
                <UserNameInput
                    name='sign_up_surname'
                    placeholder='Фамилия'
                    register={register}
                    reset={resetField}
                    inputMaxLength={20}
                    // inputRef={inputUserNameRef}
                />
                <UserNameInput
                    name='sign_up_name'
                    placeholder='Имя'
                    register={register}
                    reset={resetField}
                    // inputRef={inputUserNameRef}
                />
                <UserNameInput
                    name='sign_up_phone'
                    placeholder='Телефон'
                    register={register}
                    reset={resetField}
                    // inputRef={inputUserNameRef}
                />
            </div>
            <SubmitBut 
                icon={<TiArrowRightOutline className='fa-icon'/>}
                // notSaveUser={false}
                // disabled={formBlur}
                // isLoading={isLoading}
            />
        </form>
     )
}
 
export default SignUpSecondForm