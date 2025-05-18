import AuthCommon from './authCommon'
import AuthService from '@services/Auth-service'
import { ISignInReq } from '@shared/types/Auth-types'



class SignIn {

	static handleSignIn = async (data: ISignInReq) => {

		const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signIn(data)
		AuthCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId, isFast: data.fastSession })
	}
}

export default SignIn