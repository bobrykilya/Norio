import React from 'react'
import { focusInput } from '../../../../../utils/focusInput'
import InputError from '../InputUtils/InputError/InputError'
import InputCleaner from '../InputUtils/InputCleaner/InputCleaner'
import { ICommonVar } from '../../../../../../../common/types/Global-types'
import RoundButton from '../../../Buttons/RoundButton/RoundButton'
import { ToolTipProps } from '../../../../others/ToolTip/ToolTip'
import { copyText } from '../../../../../utils/copy'
import { ICONS } from '../../../../../assets/common/Icons-data'



type InputFieldProps = {
	contClassName: string;
	inputIcon: ICommonVar['icon'];
	inputRef: React.MutableRefObject<HTMLInputElement>;
	registerForm: {
		formRef: any;
		restRegister: any;
		error?: {
			message: string;
		};
	};
	inputParams: {
		placeholder: string;
		label?: string;
		isPhone?: boolean;
		type?: string;
		maxLength?: number;
		autoComplete?: string;
		autoFocus?: boolean;
		onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
		onBlur?: () => void;
		onFocus?: () => void;
		disabled?: boolean;
		inputMode?: string;
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
		undoFieldButParams?: {
			name: string;
			onClick: (name: string) => void;
			isOpened: boolean;
		};
	};
	emptyIconParams?: {
		isOpened: boolean;
	};
	children?: any;
}
const InputField = ({
						contClassName,
						inputIcon,
						registerForm,
						inputRef,
						inputParams,
						cleanerParams,
						extraButParams,
						emptyIconParams,
						children,
					}: InputFieldProps) => {

	// console.log(registerForm.restRegister)
	const copyInputValue = () => {
		copyText(inputRef.current.value)
	}

	const handleClickUndoFieldBut = async () => {
		undoFieldButParams.onClick(undoFieldButParams.name)
		await focusInput(inputRef)
	}

	const { placeholder, isPhone, label, ...restInputParams } = inputParams
	const undoFieldButParams = extraButParams?.undoFieldButParams


	return (
		<div
			className={`${contClassName || ''} input_field-cont cont ${extraButParams?.isCopy ? 'with_copy' : ''} ${registerForm.error?.message ? 'error' : ''}`}
		>
            <span
				className='input_field-label'
				onClick={() => focusInput(inputRef)}
			>
                {label || placeholder}
            </span>
			<input
				{...registerForm.restRegister}
				{...restInputParams}
				ref={(e) => {
					inputRef.current = e
					registerForm.formRef(e)
				}}
			/>
			<span
				className={`input_field-placeholder ${isPhone && 'phone'} ${cleanerParams.isCleanerOpened && 'hide'}`}
			>
			    {placeholder}
			</span>
			{
				!undoFieldButParams ?
					<div
						className={`input_field_icon-cont opened`}
					>
						{inputIcon}
					</div> :
					(
						<>
							<div
								className={`input_field_icon-cont ${!undoFieldButParams.isOpened && 'opened'}`}
							>
								{inputIcon}
							</div>
							<RoundButton
								className={`undo_field-but small_clear-but ${undoFieldButParams.isOpened && 'opened'}`}
								onClick={handleClickUndoFieldBut}
								size={'tiny'}
								toolTip={{
									message: 'Откатить поле обратно',
								}}
								bigZIndex={true}
							>
								{ICONS.undo}
							</RoundButton>
						</>
					)
			}
			{children}
			<InputError error={registerForm.error} onClick={() => focusInput(inputRef)} />
			<InputCleaner opened={cleanerParams.isCleanerOpened} onClick={cleanerParams.handleClickCleaner} />
			{
				emptyIconParams &&
				<div
					className={`input_field_empty-icon ${emptyIconParams.isOpened && 'opened'}`}
				/>
			}
			{
				extraButParams &&
				extraButParams.isCopy ?
					<RoundButton
						className={`extra_input_field-but before_hover-but ${extraButParams.isExtraButVisible && 'opened'}`}
						onClick={extraButParams.onClick || copyInputValue}
						size={'tiny'}
						toolTip={{
							message: 'Скопировать поле',
						}}
					>
						{ICONS.copy}
					</RoundButton> :
					<RoundButton
						className={`extra_input_field-but before_hover-but ${extraButParams.isExtraButVisible && 'opened'}`}
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