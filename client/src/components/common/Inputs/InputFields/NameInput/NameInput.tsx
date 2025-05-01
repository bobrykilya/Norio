import React, { useRef } from 'react'
import { focusInput } from '../../../../../utils/focusInput'
import { capitalize } from '../../../../../utils/capitalize'
import { ISignFormInput, NameInputTypesOptions } from '../../../../../types/Auth-types'
import InputField from '../InputField/InputField'



type NameInputProps = ISignFormInput & {
	inputType: NameInputTypesOptions;
	inputMaxLength?: number;
	inputRefLogin?: React.MutableRefObject<HTMLInputElement> | null;
}
const NameInput = ({
					   name,
					   placeholder,
					   icon,
					   inputType,
					   register,
					   errors = {},
					   reset,
					   watch,
					   notSaveUser = false,
					   inputMaxLength = 20,
					   disabled = false,
					   inputRefLogin = null,
					   withCopyBut,
					   withEmptyIcon,
					   autoComplete,
					   undoFieldButParams,
					   autoFocus,
					   setValue,
				   }: NameInputProps) => {

	const inputRef = inputRefLogin || useRef(null)
	const isCleanerOpened = Boolean(watch && watch(name))
	// console.log(inputRef.current?.value)

	const getNormalizeValue = (value: string) => {
		switch (inputType) {
			case 'sign_in':
				return value
			case 'sign_up':
				return capitalize(value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, ''))
			case 'name':
				return capitalize(value.replace(/[^а-яА-ЯёЁ]/g, ''))
			case 'email':
				return value
					.replace(/[^a-zA-Z\d@._-]/g, '')
					.replace(/\.{2}/g, '.')
					.toLowerCase()
		}
	}
	const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const normalizedValue = getNormalizeValue(e.target.value)
		setValue(name, normalizedValue, { shouldValidate: true })
		!normalizedValue && clearInput()
	}

	const handleClickCleaner = async () => {
		clearInput()
		await focusInput(inputRef)
	}

	const clearInput = () => {
		reset(name)
	}

	const getRegister = (type: NameInputTypesOptions) => {
		switch (type) {
			case 'sign_in':  //*** SignIn
				return register(name, {
					required: true,
				})
			case 'sign_up':  //*** SignUp
				return register(name, {
					required: true,
					minLength: {
						value: 4,
						message: `Длина логина должна быть от 4 букв`,
					},
					validate: {
						isOneLanguage: (val: string) => (!/[а-яА-ЯёЁ]/.test(val) || !/[a-zA-Z]/.test(val)) ||
							'Логин должен быть лишь на одном языке',
					},
				})
			case 'name':
				return register(name, {
					required: true,
					minLength: {
						value: 2,
						message: `Длина поля '${placeholder}' должна быть от 2 букв`,
					},
				})
			case 'email':
				return register(name, {
					minLength: {
						value: 5,
						message: `Ваш email должен быть от 5 символов`,
					},
					validate: {
						isValidEmail: (val: string) => (val === '' || /[a-zA-Z\d._-]+@[a-zA-Z._-]+\.[a-zA-Z\d_-]+/.test(val)) ||
							'Неверный формат email',
					},
				})
		}
	}

	const { ref: formRef, ...restRegister } = getRegister(inputType)


	return (
		<InputField
			contClassName={'user_name_input-cont'}
			inputIcon={icon}
			registerForm={{
				formRef,
				restRegister,
				error: errors[name],
			}}
			inputRef={inputRef}
			inputParams={{
				type: 'text',
				inputMode: inputType === 'email' ? 'email' : 'text',
				maxLength: inputMaxLength,
				placeholder,
				autoComplete: autoComplete ? autoComplete : notSaveUser ? 'off' : 'username',
				disabled,
				autoFocus,
				onInput: handleOnInput,
			}}
			cleanerParams={{
				isCleanerOpened,
				handleClickCleaner: handleClickCleaner,
			}}
			extraButParams={{
				...(withCopyBut && {
					isCopy: true,
					isExtraButVisible: isCleanerOpened,
				}),
				...(undoFieldButParams && {
					undoFieldButParams: {
						name,
						onClick: undoFieldButParams.onClick,
						isOpened: watch ? undoFieldButParams.preloadValues[name] !== watch(name) : false,
					},
				}),
			}}
			emptyIconParams={
				withEmptyIcon && {
					isOpened: !isCleanerOpened,
				}
			}
		/>
	)
}

export default NameInput