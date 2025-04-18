import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import DropDownSearchInput from '../../../../common/Inputs/InputFields/DropDownSearchInput/DropDownSearchInput'
import NameInput from '../../../../common/Inputs/InputFields/NameInput/NameInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import PhoneInput from '../../../../common/Inputs/InputFields/PhoneInput/PhoneInput'
import AvatarButton from '../../../AvatarListCard/AvatarButton'
import { IDataListElement } from '../../../../../assets/AuthPage/AuthPage-data'
import useCloseOnEsc from "../../../../../hooks/useCloseOnEsc"
import { ISignUp, ISignUpReq } from "../../../../../../../common/types/Auth-types"
import { useModalState } from "../../../../../stores/Global-store"
import SignUp from "../../../../../features/auth/signUp"
import { ICONS } from "../../../../../assets/common/Icons-data"
import { focusInput } from "../../../../../utils/focusInput"



const getDefaultGenderByMiddleName = (middleName: string) => {

    switch (middleName.slice(-2)) {
        case 'ич':
        case 'лы': return 'male'
        case 'на':
        case 'ва':
        case 'зы': return 'female'
        default: return null
    }
}

type SignUpInfoFormProps = {
    STORES_LIST: IDataListElement[];
    JOBS_LIST: IDataListElement[];
    AVATARS_LIST: IDataListElement[];
    isFormDisabled: boolean;
    isAvatarButDisabled: boolean;
}
const SignUpInfoForm = ({ STORES_LIST , JOBS_LIST, AVATARS_LIST, isFormDisabled, isAvatarButDisabled }: SignUpInfoFormProps) => {
    // console.log('SignUpInfoForm')

    const { getCommonModalState } = useModalState()
    const [avatar, setAvatar] = useState<string>('hedgehog')
    const [errorAvatar, setErrorAvatar] = useState<{message: string} | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefPhone = useRef<HTMLInputElement>(null)
    const defaultValues = {
        phone: '',
        store: '',
        job: '',
        lastName: '',
        firstName: '',
        middleName: '',
    }
    const preloadValues = {
        phone: '(29) 569-79-88',
        store: 'Офис',
        job: 'Управляющий',
        lastName: 'Бобрик',
        firstName: 'Илья',
        middleName: 'Юрьевич',
    }

    const {
        register,
        handleSubmit,
        resetField: reset,
        watch,
        setError,
        setValue,
        formState: { errors }
    } = useForm<ISignUp>({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues,
    })

    const commonProps = {
        register,
        errors,
        reset,
        watch,
        disabled: isFormDisabled,
    }
    const dropDownSearchInputProps = {
        ...commonProps,
        setValue,
        setError,
    }

    const checkAvatar: SubmitHandler<ISignUp> = (data) => {
        avatar ? onSubmit(data) : setErrorAvatar({ message: 'Выберите аватар пользователя' })
    }

    //* For forms Esc blur while any DropDown, SnackBar or JumpingCard is opened
    useCloseOnEsc({
        conditionsList: [!isFormDisabled, !getCommonModalState()],
        callback: () => SignUp.handleReturnToSignUp()
    })
    
    const onSubmit = async (data: ISignUp) => {
        data.avatar = avatar
        data.gender = getDefaultGenderByMiddleName(data.middleName)

        setIsLoading(true)
        await SignUp.handleSignUp(data as ISignUpReq)
            .catch(() => {
                focusInput(inputRefPhone)
            })
            .finally(() => setIsLoading(false))
    }

    //! Remove
    const preloadFormValuesSetting = () => {
        for (const name in defaultValues) {
            setValue(name as keyof {
                phone: string;
                store: string;
                job: string;
                lastName: string;
                firstName: string;
                middleName: string;
            }, preloadValues[name])
        }
    }
    useEffect(() => {
        preloadFormValuesSetting()
    }, [])


    return ( 
        <form
            onSubmit={handleSubmit(checkAvatar)}
            id='sign_up_info-form'
            className='form cont'
        >
            <div className='inputs-cont cont'>
                <PhoneInput 
                    name='phone'
                    inputPhoneRef={inputRefPhone}
                    { ...commonProps }
                />
                <DropDownSearchInput 
                    LIST={STORES_LIST}
                    name='store'
                    placeholder='Точка'
                    icon={ICONS.store}
                    autoComplete={'home'}
                    { ...dropDownSearchInputProps }
                />
                <DropDownSearchInput 
                    LIST={JOBS_LIST}
                    name='job'
                    placeholder='Должность'
                    icon={ICONS.job}
                    autoComplete={'organization-title'}
                    { ...dropDownSearchInputProps }
                />
                <NameInput
                    name='lastName'
                    placeholder='Фамилия'
                    icon={ICONS.name}
                    inputType='name'
                    autoComplete={'family-name'}
                    { ...commonProps }
                />
                <NameInput
                    name='firstName'
                    placeholder='Имя'
                    icon={ICONS.name}
                    inputType='name'
                    autoComplete={'given-name'}
                    { ...commonProps }
                />
                <NameInput
                    name='middleName'
                    placeholder='Отчество'
                    icon={ICONS.name}
                    inputType='name'
                    autoComplete={'additional-name'}
                    { ...commonProps }
                />
            </div>
            <div className='avatar_and_submit_buts-cont cont'>
                <AvatarButton
                    LIST={AVATARS_LIST}
                    currentAvatar={avatar}
                    setAvatar={setAvatar}
                    error={errorAvatar}
                    setError={setErrorAvatar}
                    disabled={isAvatarButDisabled}
                    isTabDisabled={isFormDisabled}
                />
                <SubmitBut
                    icon={ICONS.enter}
                    disabled={isFormDisabled}
                    isLoading={isLoading}
                    tabNotBlur={true}
                    toolTip={{
                        message: 'Завершить регистрацию и выполнить вход'
                    }}
                />
            </div>
        </form>
     )
}
 
export default SignUpInfoForm