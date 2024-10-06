import { ICommonVar } from "../../../common/types/Global-types"



export type CoverPanelOptions = 'sign_in' | 'sign_up' | 'sign_up_info';

export type SignContProps = {
    actForm: string;
    isFormDisabled: boolean;
    isAnyCoverModalOpened?: boolean;
}

export type IReactHookForm = {
    error?: any;
    reset?: any;
    watch?: any
    setError?: any;
    setValue?: any;
    register?: any;
}

export type ISignFormInput = IReactHookForm & {
    name: string;
    disabled: boolean;
    notSaveUser?: boolean;
    inputType?: SignFormInputTypesOptions;
}

export type SignFormInputTypesOptions = 'sign_in' | 'sign_up' | 'name' | 'confirm';

export type IUserNameInfo = {
	lastName: ICommonVar['lastName'];
	firstName: ICommonVar['firstName'];
	username: ICommonVar['username'];
}