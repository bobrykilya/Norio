import React, { useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput } from "../../../../../types/Auth-types"
import InputField from "../InputField/InputField"
import { ICommonVar } from "../../../../../../../common/types/Global-types"



type DateInputProps = ISignFormInput & {
	inputRef: React.MutableRefObject<HTMLInputElement>;
	icon: ICommonVar['icon'];
}
const DateInput = ({ name, register, error=null, reset, disabled=false, inputRef, icon, withCopyBut, cleanerState=false }: DateInputProps) => {
	
	const [isCleanerOpened, setIsCleanerOpened] = useState(cleanerState)
	// const opts = {
	//
	// }
	// const {
	// 	ref: ,
	// } = useIMask(opts, /* optional {
  //   onAccept,
  //   onComplete,
  //   ref,
  //   defaultValue,
  //   defaultUnmaskedValue,
  //   defaultTypedValue,
  // } */)


	const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '')
		inputRef.current.value = inputRef.current.value.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3')
		e.target.value ? changeInput() : clearInput()
	}

	const changeInput = () => {
		setIsCleanerOpened(true)
	}

	const handleClickCleaner = async () => {
		await focusInput(inputRef)
		clearInput()
	}

	const clearInput = () => {
		reset(name)
		setIsCleanerOpened(false)
	}

	const { ref, ... rest_register } = register(name, {
		minLength: {
			value: 8,
			message: `Введена не полная дата`
		},
		onChange: handleChangePhone,
	})


	return (
		<InputField
			contClassName={'date_input-cont'}
			inputIcon={icon}
			register={{
				ref,
				rest_register,
			}}
			error={error}
			inputRef={inputRef}
			inputParams={{
				inputMode: 'number',
				maxLength: 8,
				label: 'Дата рождения',
				placeholder: '04.09.2001',
				disabled: disabled,
				autoComplete: 'off',
			}}
			cleanerParams={{
				isCleanerOpened: isCleanerOpened,
				handleClickCleaner: handleClickCleaner
			}}
			extraButParams={
				withCopyBut ? {
					isCopy: true,
					isExtraButVisible: isCleanerOpened,
					// onClick: copyInputValue
				} :
				null
			}
		/>
	)

}

export default DateInput