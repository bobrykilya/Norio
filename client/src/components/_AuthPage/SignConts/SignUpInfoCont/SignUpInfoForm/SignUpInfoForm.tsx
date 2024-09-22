import React, { useContext, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthContext } from '../../../../../context/Auth-context'
import DropDownSearchInput from '../../../Inputs/DropDownSearchInput/DropDownSearchInput'
import UserNameInput from '../../../Inputs/NameInput/NameInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { HiOutlineHome } from "react-icons/hi"
import { GrUserExpert, GrUserWorker } from "react-icons/gr"
// import { TiArrowRightOutline } from "react-icons/ti"
import { BiLogInCircle } from "react-icons/bi"
import PhoneInput from '../../../Inputs/PhoneInput/PhoneInput'
import AvatarButton from '../../../AvatarButton/AvatarButton'
import { focusInput } from '../../../../../utils/focusInput'
import { IDataListElement } from '../../../../../assets/AuthPage/AuthPage-data'
import { IHandleSignUp } from '../../../../../types/Auth-types'
import useCloseOnEsc from "../../../../../hooks/useCloseOnEsc"



type SignUpInfoFormProps = {
    STORES_LIST: IDataListElement[];
    JOBS_LIST: IDataListElement[];
    AVATARS_LIST: IDataListElement[];
    isFormDisabled: boolean;
    isAvatarButDisabled: boolean;
    isAnyCoverModalOpened: boolean;
}
const SignUpInfoForm = ({ STORES_LIST , JOBS_LIST, AVATARS_LIST, isFormDisabled, isAvatarButDisabled, isAnyCoverModalOpened }: SignUpInfoFormProps) => {
    // console.log('SignUpInfoForm')

    const { handleSignUp, handleReturnToSignUp } = useContext(AuthContext)
    const [avatar, setAvatar] = useState<string>('hedgehog')
    const [errorAvatar, setErrorAvatar] = useState<{message: string} | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefPhone = useRef<HTMLInputElement>(null)
    const name_input_icon = <GrUserExpert className='input-icon' />


    const {
        register,
        handleSubmit,
        resetField,
        watch,
        setError,
        setValue,
        formState: { errors }
    } = useForm<IHandleSignUp>({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues: {
            phone: '295697981',
            store: 'Офис',
            job: 'Управляющий',
            last_name: 'Бобрик',
            first_name: 'Илья', 
            middle_name: 'Юрьевич',
        }
    })

    const checkAvatar: SubmitHandler<IHandleSignUp> = (data) => {
        avatar ? onSubmit(data) : setErrorAvatar({ message: 'Выберите аватар пользователя' })
    }

    //* For forms Esc blur while any DropDown, SnackBar or JumpingList is opened
    useCloseOnEsc({
        conditionsList: [isFormDisabled, isAnyCoverModalOpened],
        successFun: () => handleReturnToSignUp()
    })
    
    const onSubmit = async (data: IHandleSignUp) => {
        data.phone = '+375' + data.phone
        data.avatar = avatar

        setIsLoading(true)
        await handleSignUp(data)
            .catch(() => {
                focusInput(inputRefPhone)
            })
            .finally(() => setIsLoading(false))
    }


    return ( 
        <form onSubmit={handleSubmit(checkAvatar)} id='sign_up_info-form' className='form cont'>
            <div className='inputs-cont cont'>
                <PhoneInput 
                    name='phone'
                    register={register}
                    error={errors?.phone}
                    reset={resetField}
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
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
                    disabled={isFormDisabled}
                />
                <UserNameInput
                    name='last_name'
                    placeholder='Фамилия'
                    icon={name_input_icon}
                    inputType='name'
                    register={register}
                    error={errors?.last_name}
                    reset={resetField}
                    inputMaxLength={25}
                    disabled={isFormDisabled}
                />
                <UserNameInput
                    name='first_name'
                    placeholder='Имя'
                    icon={name_input_icon}
                    inputType='name'
                    register={register}
                    error={errors?.first_name}
                    reset={resetField}
                    disabled={isFormDisabled}
                />
                <UserNameInput
                    name='middle_name'
                    placeholder='Отчество'
                    icon={name_input_icon}
                    inputType='name'
                    register={register}
                    error={errors?.middle_name}
                    reset={resetField}
                    disabled={isFormDisabled}
                />
            </div>
            <div className='avatar_and_submit_buts-cont cont'>
                <AvatarButton
                    LIST={AVATARS_LIST}
                    avatar={avatar} 
                    setAvatar={setAvatar}
                    error={errorAvatar}
                    setError={setErrorAvatar}
                    disabled={isAvatarButDisabled}
                    isAvatarButTabDisabled={isFormDisabled}
                />
                <SubmitBut
                    icon={<BiLogInCircle className='fa-icon'/>}
                    disabled={isFormDisabled}
                    isLoading={isLoading}
                    tabIndex={0}
                    title='Завершить регистрацию и выполнить вход'
                />
            </div>
        </form>
     )
}
 
export default SignUpInfoForm