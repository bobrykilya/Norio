import { ISignInReq } from "../../../../common/types/Auth-types"
import AuthService from "../../services/Auth-service"
import AuthCommon from "./authCommon"



const checkDoubleSessions = async (newUsername: string) => {
	const currentUser = JSON.parse(localStorage.getItem('currentUser') || null)

	if (currentUser) {
		// if (newUsername !== currentUser.username) {
		// 	LogOut.handleLogOut()
		// 	showSnackMessage({
		// 		type: 'i',
		// 		message: `Был выполнен фоновый выход из аккаунта пользователя: <span class='bold'>${AuthCommon.getUserAccountInfo({ lastName: currentUser.lastName, firstName: currentUser.firstName, username: currentUser.username })}</span>`
		// 	})
		// } else {
		// 	location.reload()
		// }

	}
}

class SignIn {

	static handleSignIn = async (data: ISignInReq) => {
		// await checkDoubleSessions(data.username)
		// await timeout(300)
		// 	.finally( async () => {
		// 	})
				const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signIn(data)
				AuthCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId, isFast: data.fastSession })
	}
}

export default SignIn