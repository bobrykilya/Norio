import React, { InputHTMLAttributes } from 'react'

import RoundButton from '../../../Buttons/RoundButton/RoundButton'
import InputCleaner from '../InputUtils/InputCleaner/InputCleaner'
import InputError from '../InputUtils/InputError/InputError'
import { ICONS } from '@assets/common/Icons-data'
import { ToolTipProps } from '@others/ToolTip/ToolTip'
import { ICommonVar } from '@shared/types/Global-types'
import { copyText } from '@utils/copy'
import { safeDestructure } from '@utils/desctructure'
import { focusInput } from '@utils/focusInput'



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
		label?: string;
		isPhone?: boolean;
	} & InputHTMLAttributes<HTMLInputElement>;
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

	const copyInputValue = () => {
		copyText(inputRef.current.value)
	}

	const handleClickUndoFieldBut = async () => {
		undoFieldButParams.onClick(undoFieldButParams.name)
		await focusInput(inputRef)
	}

	const { placeholder, isPhone, label, ...restInputParams } = inputParams
	const { undoFieldButParams, isExtraButVisible, isCopy, ...restExtraButParams } = safeDestructure(extraButParams)


	return (
		<div
			className={`${contClassName || ''} input_field-cont cont ${isCopy ? 'with_copy' : ''} ${registerForm.error?.message ? 'error' : ''}`}
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
								size={'xs'}
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
				isCopy ?
					<RoundButton
						className={`extra_input_field-but before_hover-but ${isExtraButVisible && 'opened'}`}
						onClick={extraButParams.onClick || copyInputValue}
						size={'xs'}
						toolTip={{
							message: 'Скопировать поле',
						}}
					>
						{ICONS.copy}
					</RoundButton> :
					<RoundButton
						className={`extra_input_field-but before_hover-but ${isExtraButVisible && 'opened'}`}
						size={'xs'}
						{...restExtraButParams}
					>
						{extraButParams.icon}
					</RoundButton>
			}
		</div>
	)
}

export default InputField 