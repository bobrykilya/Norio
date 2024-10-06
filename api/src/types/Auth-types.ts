import { IPreprocessing, ISignInReq, ISignUpReq } from "../../../common/types/Auth-types"
import { ICommonVar } from "../../../common/types/Global-types"


//* Controllers types
export type ISignInController = IPreprocessing & ISignInReq;
export type ISignUpController = IPreprocessing & ISignUpReq;

export type IService<T> = T & {
	queryTime: ICommonVar['queryTime'];
	fingerprint?: ICommonVar['fingerprint'];
}
