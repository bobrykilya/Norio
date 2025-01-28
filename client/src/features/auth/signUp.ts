import { ICheckUserReq, ISignUpReq } from "../../../../common/types/Auth-types"
import AuthService from "../../services/Auth-service"
import authCommon from "./authCommon"
import { useAuthState, useCoverPanelState } from "../../stores/Auth-store"



const setCoverPanelState = useCoverPanelState.getState().setCoverPanelState
const setListOfUsedAvatarsState = useAuthState.getState().setListOfUsedAvatarsState
let signUpUserInfo = {
	username: '',
	hashedPassword: ''
}


const resetSignUpVariables = () => {
	signUpUserInfo = {
		username: '',
		hashedPassword: ''
	}
	setListOfUsedAvatarsState([])
}

class SignUp {

	static handleReturnToSignUp = () => {
		resetSignUpVariables()
		setCoverPanelState('sign_up')
	}

	static handleCheckUser = async (data: ICheckUserReq) => {

		const { username, hashedPassword, avatarsList } = await AuthService.checkUser(data)

		signUpUserInfo = {
			username,
			hashedPassword
		}
		setListOfUsedAvatarsState(avatarsList)

		setCoverPanelState('sign_up_info')
	}

	static handleSignUp = async (data: ISignUpReq) => {
		// await checkDoubleSessions(data.username)
		// await timeout(300)

		data.username = signUpUserInfo.username
		data.hashedPassword = signUpUserInfo.hashedPassword

		const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signUp(data)
		authCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })

		resetSignUpVariables()
		setCoverPanelState('sign_in')
	}
}

export default SignUp