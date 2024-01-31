// import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import DropDownSearchInput from './../../../Inputs/DropDownSearchInput/DropDownSearchInput'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { HiOutlineHome } from "react-icons/hi"
import { GrUserWorker } from "react-icons/gr"
import { GrUserExpert } from "react-icons/gr";
// import { TiArrowRightOutline } from "react-icons/ti"
import { BiLogInCircle } from "react-icons/bi"
import PhoneInput from '../../../Inputs/PhoneInput/PhoneInput'
import AvatarInput from '../../../Inputs/AvatarInput/AvatarInput'


const SignUpSecondForm = ({ STORES_LIST , JOBS_LIST, formBlur }) => {
    // console.log('SignUp_2')

    const name_input_icon = <GrUserExpert className='input-icon'/>

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
        data.phone = '+375' + data.phone
        data.device = navigator.userAgent
        alert(JSON.stringify(data))
        // console.log(`Юзер: ${data.first_name}`)
        // console.log(`Точка: ${data.store}`)
        // console.log(`Устройство: ${data.device}`)
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)} id='sign_up_2-form' className='form cont'>
            <div className='inputs-cont cont'>
                <PhoneInput 
                    name='phone'
                    register={register}
                    error={errors?.phone}
                    reset={resetField}
                    disabled={formBlur ? true : false}
                />
                <DropDownSearchInput 
                    LIST={STORES_LIST}
                    name='store'
                    placeholder='Точка'
                    icon={<HiOutlineHome className='input-icon'/>}
                    register={register}
                    error={errors?.store}
                    reset={resetField}
                    setValue={setValue}
                    setError={setError}
                    watch={watch}
                    disabled={formBlur ? true : false}
                />
                <DropDownSearchInput 
                    LIST={JOBS_LIST}
                    name='job'
                    placeholder='Должность'
                    icon={<GrUserWorker className='input-icon'/>}
                    register={register}
                    error={errors?.job}
                    reset={resetField}
                    setValue={setValue}
                    setError={setError}
                    watch={watch}
                    disabled={formBlur ? true : false}
                />
                <UserNameInput
                    name='last_name'
                    placeholder='Фамилия'
                    icon={name_input_icon}
                    type='name'
                    register={register}
                    error={errors?.last_name}
                    reset={resetField}
                    inputMaxLength={20}
                    disabled={formBlur ? true : false}
                />
                <UserNameInput
                    name='first_name'
                    placeholder='Имя'
                    icon={name_input_icon}
                    type='name'
                    register={register}
                    error={errors?.first_name}
                    reset={resetField}
                    inputMaxLength={20}
                    disabled={formBlur ? true : false}
                />
                <UserNameInput
                    name='middle_name'
                    placeholder='Отчество'
                    icon={name_input_icon}
                    type='name'
                    register={register}
                    error={errors?.middle_name}
                    reset={resetField}
                    inputMaxLength={20}
                    disabled={formBlur ? true : false}
                />
            </div>
            <div className='avatar_and_submit_buts-cont cont'>
                <AvatarInput />
                <SubmitBut
                    icon={<BiLogInCircle className='fa-icon'/>}
                />
            </div>
        </form>
     )
}
 
export default SignUpSecondForm