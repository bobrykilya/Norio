import React, { useEffect, useRef } from 'react'

import { useIMask } from 'react-imask'

import InputField from '../InputField/InputField'
import { PHONE_CODES_LIST } from '@assets/AuthPage/AuthPage-data'
import { ICONS } from '@assets/common/Icons-data'
import { ISignFormInput } from '@type/Auth-types'
import { copyText } from '@utils/copy'
import { focusInput } from '@utils/focusInput'



type PhoneInputProps = Omit<ISignFormInput, 'placeholder'> & {
	inputPhoneRef?: React.MutableRefObject<HTMLInputElement>;
}
const PhoneInput = ({
						name,
						register,
						errors = {},
						reset,
						disabled = false,
						inputPhoneRef,
						withCopyBut,
						withEmptyIcon,
						undoFieldButParams,
					}: Omit<PhoneInputProps, 'icon'>) => {

	// console.log('PhoneInput has been updated')
	const inputRef = inputPhoneRef || useRef(null)
	const phoneMaskOptions = {
		mask: [{
			mask: '(00) 000-00-00',
		}],
	}

	const { ref: formRef, onChange: onFormChange, ...restRegister } = register(name, {
		required: true,
		minLength: {
			value: 14,
			message: `Номер должен содержать код и 7 цифр`,
		},
		validate: {
			isCorrectCode: (val: string) => {
				const message = 'Неизвестный код оператора связи'
				if (val.length >= 9) {
					return (PHONE_CODES_LIST.includes(val.substring(1, 3)) || message)
				} else {
					return true
				}
			},
		},
	})

	const {
		ref: maskedInputRef,
		setValue: setMaskedValue,
		value: maskedValue,
	} = useIMask(phoneMaskOptions, {
		ref: inputRef,
		onAccept: (val, _, e) => {
			e && onFormChange(e)
			!val && clearInput()
		},
	})


	const copyInputValue = () => {
		copyText('+375 ' + inputRef.current?.value)
	}

	const handleClickCleaner = async () => {
		await focusInput(inputRef)
		clearInput()
	}

	const clearInput = () => {
		setMaskedValue('')
		reset(name)
	}


	//* 'setValueForm' and 'maskedValue' sync
	useEffect(() => {
		// console.log('setValueForm and maskedValue sync')
		setMaskedValue(inputRef.current?.value)
	}, [inputRef.current, inputRef.current?.value !== maskedValue])


	return (
		<InputField
			contClassName={'phone_input-cont'}
			inputIcon={ICONS.phone}
			registerForm={{
				formRef,
				restRegister,
				error: errors[name],
			}}
			inputRef={maskedInputRef}
			inputParams={{
				type: 'tel',
				inputMode: 'tel',
				maxLength: 14,
				label: 'Мобильный номер',
				isPhone: true,
				placeholder: '(29) 555-35-35',
				autoComplete: 'tel-national',
				disabled: disabled,
			}}
			cleanerParams={{
				isCleanerOpened: !!maskedValue,
				handleClickCleaner: handleClickCleaner,
			}}
			extraButParams={{
				...(withCopyBut && {
					isCopy: true,
					isExtraButVisible: !!maskedValue,
					onClick: copyInputValue,
				}),
				...(undoFieldButParams && {
					undoFieldButParams: {
						name,
						onClick: () => {
							inputRef.current.focus()
							undoFieldButParams.onClick(name)
						},
						isOpened: maskedValue || maskedValue === '' ? undoFieldButParams.preloadValues[name] !== maskedValue : false,
					},
				}),
			}}
			emptyIconParams={
				withEmptyIcon && {
					isOpened: !maskedValue,
				}
			}
		>
			<span className='phone_mask'>+375</span>
		</InputField>
	)
}

export default PhoneInput