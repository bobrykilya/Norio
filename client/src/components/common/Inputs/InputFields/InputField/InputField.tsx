import React from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import InputError from "../InputUtils/InputError/InputError"
import InputCleaner from "../InputUtils/InputCleaner/InputCleaner"
import { ICommonVar } from "../../../../../../../common/types/Global-types"
import RoundButton from "../../../Buttons/RoundButton/RoundButton"
import { ToolTipProps } from "../../../../others/ToolTip/ToolTip"
import { copyText } from "../../../../../utils/copy"
import { RxCopy } from "react-icons/rx"



type InputFieldProps = {
	contClassName: string;
	inputIcon: ICommonVar['icon'];
	registerForm: {
		refForm: any;
		restRegister: any;
		error?: {
			message: string;
		};
	};
	inputRef: React.MutableRefObject<HTMLInputElement>;
	inputParams: {
		placeholder: string;
		label?: string;
		type?: string;
		maxLength?: number;
		autoComplete?: string;
		autoFocus?: boolean;
		onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
		onBlur?: () => void;
		onFocus?: () => void;
		disabled?: boolean;
		inputMode?: string;
		value?: string;
	};
	cleanerParams: {
		isCleanerOpened: boolean;
		handleClickCleaner: () => void;
	};
	extraButParams?: {
		isCopy?: boolean
		isExtraButVisible?: boolean;
		icon?: ICommonVar['icon'];
		onClick?: () => void;
		toolTip?: ToolTipProps;
	};
	emptyIconParams?: {
		isOpened: boolean;
	};
	children?: any;
}
const InputField = ({ contClassName, inputIcon, registerForm, inputRef, inputParams, cleanerParams, extraButParams, emptyIconParams, children }: InputFieldProps) => {

	// console.log(registerForm.restRegister)
	const copyInputValue = () => {
		copyText(inputRef.current.value)
	}


	return (
		<div className={`${contClassName || ''} input_field-cont cont ${extraButParams?.isCopy ? 'with_copy' : ''} ${registerForm.error?.message ? 'error' : ''}`}>
            <span
				className='input_field-label'
				onClick={() => focusInput(inputRef)}
			>
                {inputParams.label || inputParams.placeholder}
            </span>
			<input
				{ ...registerForm.restRegister }
				ref={(e) => {
					registerForm.refForm(e)
					inputRef.current = e
				}}
				{ ...inputParams }
			/>
			{inputIcon}
			{children}
			<InputError error={registerForm.error} onClick={() => focusInput(inputRef)} />
			<InputCleaner opened={cleanerParams.isCleanerOpened} onClick={cleanerParams.handleClickCleaner} />
			{
				emptyIconParams &&
				<div
				    className={`input_field_empty-icon ${emptyIconParams.isOpened ? 'opened' : ''}`}
				/>
			}
			{
				extraButParams &&
				(
					extraButParams.isCopy ?
						<RoundButton
							className={`extra_input_field-but before_hover-but ${extraButParams.isExtraButVisible ? 'opened' : ''}`}
							onClick={extraButParams.onClick || copyInputValue}
							size={'tiny'}
							toolTip={{
								text: 'Скопировать поле'
							}}
						>
							<RxCopy className={'fa-icon'} />
						</RoundButton> :
						<RoundButton
							className={`extra_input_field-but before_hover-but ${extraButParams.isExtraButVisible ? 'opened' : ''}`}
							size={'tiny'}
							{...extraButParams}
						>
							{extraButParams.icon}
						</RoundButton>
				)
			}
		</div>
	)
}

export default InputField 