import { ISignInReq } from "../../../../common/types/Auth-types"
import AuthService from "../../services/Auth-service"
import AuthCommon from "./authCommon"



class SignIn {

	static handleSignIn = async (data: ISignInReq) => {
		
		const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signIn(data)
		AuthCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId, isFast: data.fastSession })
	}
}

export default SignIn