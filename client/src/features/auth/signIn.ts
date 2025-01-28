import { ISignInReq } from "../../../../common/types/Auth-types"
import AuthService from "../../services/Auth-service"
import { showSnackMessage } from "../showSnackMessage/showSnackMessage"
import LogOut from "./logOut"
import authCommon from "./authCommon"



const checkDoubleSessions = async (newUsername: string) => {
	const currentUser = JSON.parse(localStorage.getItem('currentUser') || null)

	if (currentUser) {
		if (newUsername !== currentUser.username) {
			LogOut.handleLogOut()
			showSnackMessage({
				type: 'i',
				message: `Был выполнен фоновый выход из аккаунта пользователя: <span class='bold'>${authCommon.getUserAccountInfo({ lastName: currentUser.lastName, firstName: currentUser.firstName, username: currentUser.username })}</span>`
			})
		} else {
			location.reload()
		}
	}
}

class SignIn {

	static handleSignIn = async (data: ISignInReq) => {
		// await checkDoubleSessions(data.username)
		// await timeout(300)

		const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signIn(data)
		authCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })
	}
}

export default SignIn