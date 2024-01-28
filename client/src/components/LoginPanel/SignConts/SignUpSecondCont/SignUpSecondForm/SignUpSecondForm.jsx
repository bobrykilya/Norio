// import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import DropDownSearchInput from './../../../Inputs/DropDownSearchInput/DropDownSearchInput'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { HiOutlineHome } from "react-icons/hi"
import { GrUserWorker } from "react-icons/gr"
import { GrUserExpert } from "react-icons/gr";
import { TiArrowRightOutline } from "react-icons/ti"
import PhoneInput from '../../../Inputs/PhoneInput/PhoneInput'


const SignUpSecondForm = ({ STORES_LIST , JOBS_LIST, formBlur }) => {
    // console.log('SignUp_2')

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
        data.sign_up_phone = '+375' + data.sign_up_phone
        alert(JSON.stringify(data))
        // console.log(`Юзер: ${data.sign_up_surname}`)
        // console.log(`Пароль: ${data.sign_up_password}`)
        // console.log(`Точка: ${data.sign_up_store}`)
        // console.log(`Устройство: ${data.device}`)
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up_2-form' className='form cont'>
            <div className='inputs-cont cont'>
                <PhoneInput 
                    name='sign_up_phone'
                    register={register}
                    error={errors?.sign_up_phone}
                    reset={resetField}
                    disabled={formBlur ? true : false}
                />
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
                    disabled={formBlur ? true : false}
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
                    disabled={formBlur ? true : false}
                />
                <UserNameInput
                    name='sign_up_surname'
                    placeholder='Фамилия'
                    icon={<GrUserExpert className='input-icon'/>}
                    type='name'
                    register={register}
                    error={errors?.sign_up_surname}
                    reset={resetField}
                    inputMaxLength={20}
                    disabled={formBlur ? true : false}
                />
                <UserNameInput
                    name='sign_up_name'
                    placeholder='Имя'
                    icon={<GrUserExpert className='input-icon'/>}
                    type='name'
                    register={register}
                    error={errors?.sign_up_name}
                    reset={resetField}
                    inputMaxLength={20}
                    disabled={formBlur ? true : false}
                />
            </div>
            <SubmitBut 
                icon={<TiArrowRightOutline className='fa-icon'/>}
            />
        </form>
     )
}
 
export default SignUpSecondForm