import { ICommonVar } from "../../../common/types/Global-types"



export type CoverPanelOptions = 'sign_in' | 'sign_up' | 'sign_up_info';

export type SignContProps = {
    actForm: CoverPanelOptions;
    isFormDisabled: boolean;
}

export type IReactHookForm = {
	errors?: any;
    reset?: any;
    watch?: any
    setError?: any;
    setValue?: any;
    register?: any;
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

export type IUserNameInfo = {
	lastName: ICommonVar['lastName'];
	firstName: ICommonVar['firstName'];
	username: ICommonVar['username'];
}