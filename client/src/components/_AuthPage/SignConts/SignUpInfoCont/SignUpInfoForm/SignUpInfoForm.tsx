import React, { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import DropDownSearchInput from '../../../../common/Inputs/InputFields/DropDownSearchInput/DropDownSearchInput'
import UserNameInput from '../../../../common/Inputs/InputFields/NameInput/NameInput'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import PhoneInput from '../../../../common/Inputs/InputFields/PhoneInput/PhoneInput'
import AvatarButton from '../../../AvatarListCard/AvatarButton'
import { focusInput } from '../../../../../utils/focusInput'
import { IDataListElement } from '../../../../../assets/AuthPage/AuthPage-data'
import useCloseOnEsc from "../../../../../hooks/useCloseOnEsc"
import { ISignUp, ISignUpReq } from "../../../../../../../common/types/Auth-types"
import { useModalState } from "../../../../../stores/Global-store"
import SignUp from "../../../../../features/auth/signUp"
import { ICONS } from "../../../../../assets/common/Icons-data"



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

    const modalState = useModalState(s => s.allModalsState)
    const [avatar, setAvatar] = useState<string>('hedgehog')
    const [errorAvatar, setErrorAvatar] = useState<{message: string} | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const inputRefPhone = useRef<HTMLInputElement>(null)


    const {
        register,
        handleSubmit,
        resetField,
        watch,
        setError,
        setValue,
        formState: { errors }
    } = useForm<ISignUp>({
        mode: 'onChange',
        reValidateMode: "onChange",
        defaultValues: {
            phone: '',
            store: 'Офис',
            job: 'Управляющий',
            lastName: 'Бобрик',
            firstName: 'Илья', 
            middleName: 'Юрьевич',
        }
    })

    const commonProps = {
        register: register,
        errors: errors,
        reset: resetField,
        disabled: isFormDisabled,
    }
    const dropDownSearchInputProps = {
        ...commonProps,
        setValue: setValue,
        setError: setError,
        watch: watch,
    }

    const checkAvatar: SubmitHandler<ISignUp> = (data) => {
        avatar ? onSubmit(data) : setErrorAvatar({ message: 'Выберите аватар пользователя' })
    }

    //* For forms Esc blur while any DropDown, SnackBar or JumpingCard is opened
    useCloseOnEsc({
        conditionsList: [!isFormDisabled, !modalState],
        callback: () => SignUp.handleReturnToSignUp()
    })
    
    const onSubmit = async (data: ISignUp) => {
        data.phone = '+375' + data.phone
        data.avatar = avatar
        data.gender = getDefaultGenderByMiddleName(data.middleName)

        setIsLoading(true)
        await SignUp.handleSignUp(data as ISignUpReq)
            .catch(() => {
                focusInput(inputRefPhone)
            })
            .finally(() => setIsLoading(false))
    }


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
                    { ...dropDownSearchInputProps }
                />
                <DropDownSearchInput 
                    LIST={JOBS_LIST}
                    name='job'
                    placeholder='Должность'
                    icon={ICONS.job}
                    { ...dropDownSearchInputProps }
                />
                <UserNameInput
                    name='lastName'
                    placeholder='Фамилия'
                    icon={ICONS.name}
                    inputType='name'
                    { ...commonProps }
                />
                <UserNameInput
                    name='firstName'
                    placeholder='Имя'
                    icon={ICONS.name}
                    inputType='name'
                    { ...commonProps }
                />
                <UserNameInput
                    name='middleName'
                    placeholder='Отчество'
                    icon={ICONS.name}
                    inputType='name'
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
                        text: 'Завершить регистрацию и выполнить вход'
                    }}
                />
            </div>
        </form>
     )
}
 
export default SignUpInfoForm