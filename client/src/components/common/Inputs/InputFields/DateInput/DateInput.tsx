import React, { useLayoutEffect, useRef } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput } from "../../../../../types/Auth-types"
import InputField from "../InputField/InputField"
import { ICommonVar } from "../../../../../../../common/types/Global-types"
import { useIMask } from 'react-imask'
import { getTimeParams } from "../../../../../utils/getTime"



type DateInputProps = Omit<ISignFormInput, 'placeholder'> & {
	inputDateRef: React.MutableRefObject<HTMLInputElement>;
	icon: ICommonVar['icon'];
}
const DateInput = ({ name, register, errors={}, reset, disabled=false, inputDateRef, icon, withCopyBut, withEmptyIcon, autoFocus, undoFieldButParams }: DateInputProps) => {

	const inputRef = inputDateRef || useRef(null)
	const dateMaskOptions = {
		mask: [{
			mask: '00.00.0000',
		}],
	}

	const { ref: formRef, onChange: onFormChange, ...restRegister } = register(name, {
		minLength: {
			value: 10,
			message: `Введена неполная дата`
		},
		validate: {
			isCorrectDay: (val: string) => {
				if (!val) return true
				const message = 'Некорректный день'
				const day = parseInt(val.split('.')[0])
				return  (day <= 31 && day > 0)  || message
			},
			isCorrectMonth: (val: string) => {
				if (!val) return true
				const message = 'Некорректный месяц'
				const month = parseInt(val.split('.')[1])
				return  (month <= 12 && month > 0)  || message
			},
			isCorrectYear: (val: string) => {
				if (!val) return true
				const message = 'Некорректный год'
				const year = parseInt(val.split('.')[2])
				const { year: yearNow } = getTimeParams(['year'])
				return  (year < yearNow - 7 && year > yearNow - 100)  || message
			},
		},
	})

	const {
		ref: maskedInputRef,
		value: maskedValue,
		setValue: setMaskedValue,
	} = useIMask(dateMaskOptions, {
		ref: inputRef,
		onAccept: (val, _, e) => {
			e && onFormChange(e)
			!val && clearInput()
		}
	})

	const handleClickCleaner = async () => {
		await focusInput(inputRef)
		clearInput()
	}

	const clearInput = () => {
		setMaskedValue('')
		reset(name)
	}

	//* 'setValueForm' and 'maskedValue' sync
	useLayoutEffect(() => {
		setMaskedValue(inputRef.current?.value)
	}, [inputRef.current, inputRef.current?.value !== maskedValue])


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
				inputMode: 'numeric',
				maxLength: 10,
				label: 'Дата рождения',
				placeholder: '04.09.2001',
				autoComplete: 'bday',
				autoFocus,
				disabled,
			}}
			cleanerParams={{
				isCleanerOpened: !!maskedValue,
				handleClickCleaner: handleClickCleaner
			}}
			extraButParams={{
				...(withCopyBut && {
					isCopy: true,
					isExtraButVisible: !!maskedValue,
				}),
				...(undoFieldButParams && {
					undoFieldButParams: {
						name,
						onClick: () => {
							inputRef.current.focus()
							undoFieldButParams.onClick(name)
						},
						isOpened: maskedValue || maskedValue === '' ? undoFieldButParams.preloadValues[name] !== maskedValue : false,
					}
				})
			}}
			emptyIconParams={
				withEmptyIcon && {
					isOpened: !maskedValue
				}
			}
		/>
	)

}

export default DateInput