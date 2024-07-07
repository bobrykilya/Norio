import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../../../context/Auth-context'
import DropDownSearchInput from '../../../Inputs/DropDownSearchInput/DropDownSearchInput'
import UserNameInput from '../../../Inputs/UserNameInput/UserNameInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { HiOutlineHome } from "react-icons/hi"
import { GrUserWorker } from "react-icons/gr"
import { GrUserExpert } from "react-icons/gr";
// import { TiArrowRightOutline } from "react-icons/ti"
import { BiLogInCircle } from "react-icons/bi"
import PhoneInput from '../../../Inputs/PhoneInput/PhoneInput'
import AvatarButton from '../../../AvatarButton/AvatarButton'
import { useFocusInput } from '../../../../../hooks/useFocusInput'
import { IDataListElement } from '../../../../../assets/AuthPage/AuthPage-data'
import { IUserInfo } from '../../../../../types/Auth-types'



interface SignUpInfoFormProps {
    STORES_LIST: IDataListElement[];
    JOBS_LIST: IDataListElement[];
    AVATARS_LIST: IDataListElement[];
    isFormBlur: boolean;
}
const SignUpInfoForm = ({ STORES_LIST , JOBS_LIST, AVATARS_LIST, isFormBlur }: SignUpInfoFormProps) => {
    // console.log('SignUpInfoForm')

    const { handleSignUp } = useContext(AuthContext)
    const [avatar, setAvatar] = useState<string | null>('hedgehog')
    const [errorAvatar, setErrorAvatar] = useState<{message: string} | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefPhone = useRef(null)
    const name_input_icon = <GrUserExpert className='input-icon' />

    const {
        register,
        handleSubmit,
        resetField,
        watch,
        setError,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues: {
            phone: '295697982',
            store: 'Офис',
            job: 'Управляющий',
            last_name: 'Бобрик',
            first_name: 'Илья', 
            middle_name: 'Юрьевич',
        }
    })

    const checkAvatar = (data: IUserInfo) => {
        avatar ? onSubmit(data) : setErrorAvatar({ message: 'Выберите аватар пользователя' })
    }
    
    const onSubmit = (data: IUserInfo) => {
        data.phone = '+375' + data.phone
        if (avatar) data.avatar = avatar
        
        setTimeout(async () => {
            setIsLoading(true)
            await handleSignUp(data)
            .catch(() => {
                useFocusInput(inputRefPhone)
            })
            .finally(() => setIsLoading(false))
            // alert(JSON.stringify(data))
        }, 100)
    }

    return ( 
        <form onSubmit={handleSubmit(checkAvatar)} id='sign_up_info-form' className='form cont'>
            <div className='inputs-cont cont'>
                <PhoneInput 
                    name='phone'
                    register={register}
                    error={errors?.phone}
                    reset={resetField}
                    disabled={isFormBlur}
                    inputRefPhone={inputRefPhone}
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
                    disabled={isFormBlur}
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
                    disabled={isFormBlur}
                />
                <UserNameInput
                    name='last_name'
                    placeholder='Фамилия'
                    icon={name_input_icon}
                    type='name'
                    register={register}
                    error={errors?.last_name}
                    reset={resetField}
                    inputMaxLength={25}
                    disabled={isFormBlur}
                />
                <UserNameInput
                    name='first_name'
                    placeholder='Имя'
                    icon={name_input_icon}
                    type='name'
                    register={register}
                    error={errors?.first_name}
                    reset={resetField}
                    disabled={isFormBlur}
                />
                <UserNameInput
                    name='middle_name'
                    placeholder='Отчество'
                    icon={name_input_icon}
                    type='name'
                    register={register}
                    error={errors?.middle_name}
                    reset={resetField}
                    disabled={isFormBlur}
                />
            </div>
            <div className='avatar_and_submit_buts-cont cont'>
                <AvatarButton
                    LIST={AVATARS_LIST}
                    avatar={avatar} 
                    setAvatar={setAvatar}
                    error={errorAvatar}
                    setError={setErrorAvatar}
                    isFormBlur={isFormBlur}
                />
                <SubmitBut
                    icon={<BiLogInCircle className='fa-icon'/>}
                    disabled={isFormBlur}
                    isLoading={isLoading}
                    title='Завершить регистрацию и выполнить вход'
                />
            </div>
        </form>
     )
}
 
export default SignUpInfoForm