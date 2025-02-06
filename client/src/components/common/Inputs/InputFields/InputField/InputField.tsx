import React, { useRef, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import InputError from "../InputUtils/InputError/InputError"
import InputCleaner from "../InputUtils/InputCleaner/InputCleaner"
import { ICommonVar } from "../../../../../../../common/types/Global-types"
import { ISignFormInput } from "../../../../../types/Auth-types"
import RoundButton from "../../../Buttons/RoundButton/RoundButton"



type InputFieldProps = Omit<ISignFormInput, 'notSaveUser' | 'inputType'> & {
	icon: ICommonVar['icon'];
	register: {
		ref: any;
		rest_register: any;
	}
	inputRef?: React.MutableRefObject<HTMLInputElement> | null;
	inputParams: {
		className: string;
		placeholder: string;
		type?: string;
		maxLength?: number;
		autoComplete?: boolean;
		autoFocus?: boolean;
	};
	extraButParams?: {
		icon: ICommonVar['icon'];
		[key: string]: any;
	};
}
const InputField = ({ name, icon, register, error=null, reset, inputRef=null, inputParams, extraButParams }: InputFieldProps) => {

	const [isCleanerOpened, setIsCleanerOpened] = useState(false)
	const [isExtraButVisible, setIsExtraButVisible] = useState(false)
	const refInput = inputRef || useRef(null)


	const handleClickCleaner = async () => {
		clearInput()
		await focusInput(inputRef)
	}

	const clearInput = () => {
		reset(name)
		setIsCleanerOpened(false)
	}


	return (
		<div className={`user_name_input-cont input-cont cont ${error?.message ? 'error' : ''}`}>
            <span
				className='input-label'
				onClick={() => focusInput(refInput)}
			>
                {inputParams.placeholder}
            </span>
			<input
				{...register.rest_register}
				ref={(e) => {
					register.ref(e)
					refInput.current = e
				}}
				{...inputParams}
			/>
			{icon}
			<InputError error={error} onClick={() => focusInput(refInput)} />
			<InputCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
			{
				extraButParams &&
				<RoundButton
					className={`extra_input-but before_hover-but ${isExtraButVisible ? 'opened' : ''}`}
					size={'tiny'}
					{...extraButParams}
				>
					{extraButParams.icon}
				</RoundButton>
			}
		</div>
	)
}

export default InputField 