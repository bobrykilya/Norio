import { ICommonVar } from '@shared/types/Global-types'



export type CoverPanelOptions = 'sign_in' | 'sign_up' | 'sign_up_info';

export type SignContProps = {
	actForm: CoverPanelOptions;
	isFormDisabled: boolean;
}

export type IReactHookForm = {
	register: any;
	reset: any;
	watch: any
	setValue: any;
	errors?: any;
	setError?: any;
}

export type ISignFormInput = IReactHookForm & {
	name: string;
	placeholder: string;
	icon: ICommonVar['icon'];
	disabled?: boolean;
	notSaveUser?: boolean;
	withCopyBut?: boolean;
	withEmptyIcon?: boolean;
	autoComplete?: string;
	autoFocus?: boolean;
	undoFieldButParams?: {
		onClick: (name: string) => void;
		preloadValues: any;
	};
}

export type NameInputTypesOptions = 'sign_in' | 'sign_up' | 'name' | 'email';
export type PasswordInputTypesOptions = 'sign_in' | 'sign_up' | 'confirm';