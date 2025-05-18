import React from 'react'

import clsx from 'clsx'

import AppTitle from '@common/AppTitle/AppTitle'
import CoverPanel from '@components/_AuthPage/CoverPanel/CoverPanel'
import SignInCont from '@components/_AuthPage/SignConts/SignInCont/SignInCont'
import SignUpCont from '@components/_AuthPage/SignConts/SignUpCont/SignUpCont'
import SignUpInfoCont from '@components/_AuthPage/SignConts/SignUpInfoCont/SignUpInfoCont'
import LogBookButton from '@others/JumpingCards/BottomCard/LogBook/LogBookButton/LogBookButton'
import { useCoverPanelState } from '@stores/Auth-store'
import { useBlockErrorState } from '@stores/Device-store'
import { useModalState } from '@stores/Utils-store'
import { AuthPageAnim } from '@utils/pageTransitions'

import './AuthPage.sass'



type AuthPageProps = {}
const AuthPage = ({}: AuthPageProps) => {

	const coverPanelState = useCoverPanelState(s => s.coverPanelState)
	const isAppBlocked = useBlockErrorState(s => s.isAppBlocked())
	const isJumpingCardOpened = useModalState(s => s.isJumpingCardOpened())
	const isDisabled = isJumpingCardOpened || isAppBlocked


	return (
		<>
			<div
				className={'auth_page-header cont'}
			>
				<AppTitle />
				<LogBookButton isAuthPage={true} />
			</div>
			<AuthPageAnim>
				<div
					id='auth_page-cont'
					className={clsx('cont', isAppBlocked && 'block')}
				>
					<div id='signs-cont' className='cont'>
						<SignInCont
							actForm={coverPanelState}
							isFormDisabled={isDisabled}
						/>
						<SignUpCont
							actForm={coverPanelState}
							isFormDisabled={isDisabled}
						/>
						{coverPanelState !== 'sign_in' &&
							<SignUpInfoCont
								actForm={coverPanelState}
								isFormDisabled={isDisabled}
							/>
						}
					</div>
					<CoverPanel disabled={isAppBlocked} />
				</div>
			</AuthPageAnim>
		</>
	)
}

export default AuthPage