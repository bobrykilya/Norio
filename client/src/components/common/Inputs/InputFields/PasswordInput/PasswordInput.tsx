import React, { useRef, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput, PasswordInputTypesOptions } from '../../../../../types/Auth-types'
import InputField from "../InputField/InputField"
import ToolTip from "../../../../others/ToolTip/ToolTip"
import { ICONS } from "../../../../../assets/common/Icons-data"
import { PartialBy } from "../../../../../../../common/types/Global-types"



type IPasswordInputProps = PartialBy<ISignFormInput, 'placeholder' | 'icon'> & {
	inputType: PasswordInputTypesOptions;
	required?: boolean;
	inputRefPassword?: React.MutableRefObject<HTMLInputElement> | null;
	matchWithName?: string;
}
const PasswordInput = ({
						   name,
						   inputType,
						   register,
						   errors = {},
						   reset,
						   watch = false,
						   notSaveUser = false,
						   disabled = false,
						   undoFieldButParams,
						   autoComplete,
						   placeholder,
						   icon,
						   required,
						   setValue,
						   inputRefPassword,
						   matchWithName,
					   }: IPasswordInputProps) => {

	const [isLockOpened, setIsLockOpened] = useState(false)
	const [isCapsLockEnabled, setIsCapsLockEnabled] = useState(false)

	const inputRef = inputRefPassword || useRef(null)
	const isCleanerOpened = Boolean(watch && watch(name))

	const getNormalizeValue = (value: string) => {
		switch (inputType) {
			case 'sign_in':
				return value
			case 'sign_up':
			case 'confirm':
				return value.replace(/[^а-яА-ЯёЁa-zA-Z0-9.@_ ]/g, '')
		}
	}
	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

		const normalizedValue = getNormalizeValue(e.target.value)
		e.target.value = normalizedValue
		setValue(name, normalizedValue)

		!normalizedValue && clearInput()
	}

	const handleClickCleaner = async () => {
		clearInput()
		await focusInput(inputRef)
	}

	const clearInput = () => {
		reset(name)
		setIsCapsLockEnabled(false)
	}

	const handleCheckCapsLockState = (e: React.KeyboardEvent) => {
		e.getModifierState('CapsLock') ?
			setIsCapsLockEnabled(true) :
			setIsCapsLockEnabled(false)
	}

	const handleSwitchLockPosition = async () => {
		setIsLockOpened((prev) => !prev)
		await focusInput(inputRef)
	}


	const getRegister = (type: PasswordInputTypesOptions) => {
		switch (type) {
			case 'sign_in':
				return register(name, {
					required: required !== undefined ? required : true,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						handleChangePassword(e)
					},
				})
			case 'sign_up':
				return register(name, {
					required: required !== undefined ? required : true,
					minLength: {
						value: 4,
						message: 'Длина пароля должна быть от 4 до 15 знаков',
					},
					validate: required === false && watch(name) === '' ? {} : {
						isOneLanguage: (val: string) => (!/[а-яА-ЯёЁ]/.test(val) || !/[a-zA-Z]/.test(val)) ||
							'Пароль должен быть лишь на одном языке',
						isNumber: (val: string) => /(?=.*[0-9])/.test(val) ||
							'Пароль должен содержать цифру',
						isLower: (val: string) => /(?=.*[a-zа-яё])/.test(val) ||
							'Пароль должен содержать строчную букву',
						isUpper: (val: string) => /(?=.*[A-ZА-ЯЁ])/.test(val) ||
							'Пароль должен содержать заглавную букву',
					},
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						handleChangePassword(e)
					},
				})
			case 'confirm':
				return register(name, {
					required: required !== undefined ? required : true,
					validate: {
						passwordsMatch: () => {
							if (watch(name) !== watch(matchWithName)) {
								return 'Пароли не совпадают'
							}
						},
					},
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						handleChangePassword(e)
					},
				})
		}
	}

	const { ref, ...restRegister } = getRegister(inputType)


	return (
		<InputField
			contClassName={'password_input-cont'}
			inputIcon={icon ? icon : ICONS.password}
			registerForm={{
				formRef: ref,
				restRegister,
				error: errors[name],
			}}
			inputRef={inputRef}
			inputParams={{
				type: isLockOpened ? 'text' : 'password',
				maxLength: 20,
				placeholder: placeholder ? placeholder : inputType !== 'confirm' ? 'Пароль' : 'Повтор пароля',
				autoComplete: autoComplete ? autoComplete : notSaveUser ? 'off' : 'current-password',
				onKeyDown: handleCheckCapsLockState,
				onBlur: () => {
					setIsCapsLockEnabled(false)
				},
				disabled,
			}}
			cleanerParams={{
				isCleanerOpened,
				handleClickCleaner: handleClickCleaner,
			}}
			extraButParams={{
				icon: !isLockOpened ? ICONS.eyeOpened : ICONS.eyeClosed,
				isExtraButVisible: isCleanerOpened,
				onClick: handleSwitchLockPosition,
				toolTip: {
					message: !isLockOpened ? 'Показать пароль' : 'Скрыть пароль',
				},
				...(undoFieldButParams && {
					undoFieldButParams: {
						name,
						onClick: undoFieldButParams.onClick,
						isOpened: watch ? undoFieldButParams.preloadValues[name] !== watch(name) : false,
					},
				}),
			}}
		>
			<div
				className={`caps_lock-cont ${isCapsLockEnabled ? 'opened' : ''}`}
			>
				<span>CAPS</span>
				<ToolTip message="Включён Caps-Lock"/>
			</div>
		</InputField>
	)
}

export default PasswordInput