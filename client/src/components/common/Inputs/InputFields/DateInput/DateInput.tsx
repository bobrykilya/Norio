import React, { useLayoutEffect, useRef, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput } from "../../../../../types/Auth-types"
import InputField from "../InputField/InputField"
import { ICommonVar } from "../../../../../../../common/types/Global-types"
import { useIMask } from 'react-imask'
import { PHONE_CODES_LIST } from "../../../../../assets/AuthPage/AuthPage-data"



type DateInputProps = ISignFormInput & {
	inputDateRef: React.MutableRefObject<HTMLInputElement>;
	icon: ICommonVar['icon'];
}
const DateInput = ({ name, register, errors={}, reset, disabled=false, inputDateRef, icon, withCopyBut, cleanerState=false, isEmptyIcon }: DateInputProps) => {

	const [isCleanerOpened, setIsCleanerOpened] = useState(cleanerState)
	const inputRef = inputDateRef || useRef(null)
	const dateMaskOptions = {
		mask: [{
			mask: '00.00.0000',
		}],
	}

	const { ref: formRef, onChange: onFormChange, ...restRegister } = register(name, {
		minLength: {
			value: 10,
			message: `Введена не полная дата`
		},
		validate: {
			isCorrectDay: (val: string) => {
				const message = 'Неизвестный код оператора связи'
				if (val.length >= 9) {
					return (PHONE_CODES_LIST.includes(val.substring(1,3)) || message)
				} else {
					return true
				}
			},
		},
	})

	const {
		ref: maskedInputRef,
		setUnmaskedValue,
	} = useIMask(dateMaskOptions, {
		ref: inputRef,
		onAccept: (val, _, e) => {
			onFormChange(e)
			handleChangeDate(val)
		}
	})

	const handleChangeDate = (maskedValue: string) => {
		// maskedValue = maskedValue.replace(/[^0-9]/g, '')
		// maskedValue = inputRef.current.value.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3')
		maskedValue ? setIsCleanerOpened(true) : clearInput()
	}

	const handleClickCleaner = async () => {
		await focusInput(inputRef)
		clearInput()
	}

	const clearInput = () => {
		setUnmaskedValue('')
		reset(name)
		setIsCleanerOpened(false)
	}

	//* First value setting for IMask
	useLayoutEffect(() => {
		setUnmaskedValue(inputRef.current?.value)
	}, [!inputRef.current && inputRef.current?.value])


	return (
		<InputField
			contClassName={'date_input-cont'}
			inputIcon={icon}
			registerForm={{
				formRef,
				restRegister,
				error: errors[name]
			}}
			inputRef={maskedInputRef}
			inputParams={{
				inputMode: 'number',
				maxLength: 10,
				label: 'Дата рождения',
				placeholder: '04.09.2001',
				autoComplete: 'off',
				disabled,
			}}
			cleanerParams={{
				isCleanerOpened: isCleanerOpened,
				handleClickCleaner: handleClickCleaner
			}}
			extraButParams={
				withCopyBut ? {
					isCopy: true,
					isExtraButVisible: isCleanerOpened,
				} :
				null
			}
			emptyIconParams={
				isEmptyIcon && {
					isOpened: !isCleanerOpened
				}
			}
		/>
	)

}

export default DateInput