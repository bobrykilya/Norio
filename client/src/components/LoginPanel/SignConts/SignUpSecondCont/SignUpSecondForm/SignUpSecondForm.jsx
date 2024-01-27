// import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import DropDownSearchInput from './../../../Inputs/DropDownSearchInput/DropDownSearchInput'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { HiOutlineHome } from "react-icons/hi"
import { GrUserWorker } from "react-icons/gr"
import { GrUserSettings } from "react-icons/gr"
import { TiArrowRightOutline } from "react-icons/ti"


const SignUpSecondForm = ({ STORES_LIST ,JOBS_LIST }) => {

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

    const onSubmit = (data) => {
        // alert(JSON.stringify(data))
        console.log(`Юзер: ${data.sign_up_surname}`)
        // console.log(`Пароль: ${data.sign_up_password}`)
        // console.log(`Точка: ${data.sign_up_store}`)
        // console.log(`Устройство: ${data.device}`)
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up_2-form' className='form cont'>
            <div className='inputs-cont cont'>
                <DropDownSearchInput 
                    LIST={STORES_LIST}
                    name='stores_input'
                    placeholder='Точка'
                    icon={<HiOutlineHome className='input-icon'/>}
                    register={register}
                    error={errors?.stores_input}
                    reset={resetField}
                    setValue={setValue}
                    setError={setError}
                    watch={watch}
                />
                <DropDownSearchInput 
                    LIST={JOBS_LIST}
                    name='jobs_input'
                    placeholder='Должность'
                    icon={<GrUserWorker className='input-icon'/>}
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
                    icon={<GrUserSettings className='input-icon'/>}
                    register={register}
                    inputMaxLength={20}
                    isValidate={true}
                    error={errors?.sign_up_surname}
                    reset={resetField}
                    notLatin={true}
                />
                <UserNameInput
                    name='sign_up_name'
                    placeholder='Имя'
                    icon={<GrUserSettings className='input-icon'/>}
                    register={register}
                    isValidate={true}
                    error={errors?.sign_up_name}
                    reset={resetField}
                    notLatin={true}
                />
                <UserNameInput
                    name='sign_up_phone'
                    placeholder='Телефон'
                    register={register}
                    reset={resetField}
                />
            </div>
            <SubmitBut 
                icon={<TiArrowRightOutline className='fa-icon'/>}
            />
        </form>
     )
}
 
export default SignUpSecondForm