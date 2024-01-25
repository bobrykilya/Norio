import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import StoresInput from '../../../Inputs/StoresInput/StoresInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import { useFocusInput } from "../../../../../Hooks/useFocusInput"
import { useCapitalize } from './../../../../../Hooks/useCapitalize';
import { TiArrowRightOutline } from "react-icons/ti"
import JobsInput from '../../../Inputs/JobsInput/JobsInput'



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
        setValue,
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
        // data.sign_up_name = useCapitalize(data.sign_up_name)
        // alert(JSON.stringify(data))
        console.log(`Юзер: ${data.sign_up_surname}`)
        // console.log(`Пароль: ${data.sign_up_password}`)
        // console.log(`Точка: ${data.sign_up_store}`)
        // console.log(`Устройство: ${data.device}`)
    }

    return ( 
        <form onSubmit={handleSubmit(checkStoresInput)} id='sign_up_2-form' className='form cont'>
            <div className='inputs-cont cont'>
                <StoresInput
                    store={store}
                    setStore={setStore}
                    onFocusInput={handleFocusInput}
                    error={storeError}
                    setStoreError={setStoreError}
                />
                <JobsInput 
                    name='jobs_input'
                    register={register}
                    error={errors?.jobs_input}
                    reset={resetField}
                    setValue={setValue}
                    setError={setError}
                    watch={watch}
                />
                <UserNameInput
                    name='sign_up_surname'
                    placeholder='Фамилия'
                    register={register}
                    inputMaxLength={20}
                    isValidate={true}
                    error={errors?.sign_up_surname}
                    reset={resetField}
                    notLatin={true}
                    // inputRef={inputUserNameRef}
                />
                <UserNameInput
                    name='sign_up_name'
                    placeholder='Имя'
                    register={register}
                    isValidate={true}
                    error={errors?.sign_up_name}
                    reset={resetField}
                    notLatin={true}
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