import React from 'react'

import { ICONS } from '@/assets/common/Icons-data'
// @ts-ignore
import SignInImg from '@assets/AuthPage/sign_in.png'
// @ts-ignore
import SignUpImg from '@assets/AuthPage/sign_up.png'
import SignUp from '@features/auth/signUp'
import ToolTip from '@others/ToolTip/ToolTip'
import { useCoverPanelState } from '@stores/Auth-store'



type CoverPanelProps = {
	disabled: boolean;
}
const CoverPanel = ({ disabled }: CoverPanelProps) => {

	const { coverPanelState, setCoverPanelState } = useCoverPanelState()

	return (
		<div id='cover_and_img-cont' className={`cont opened_${coverPanelState}`}>
			<div id='cover-cont' className='cont'>
				<div id='cover-content' className='cont'>
					<section id='sign_up_info-cont' className='cont'>
						<h1>Нет аккаунта?</h1>
						<p>Подай заявку на<br />регистрацию и дождись<br />активации аккаунта<br />пользователя</p>
						<button
							id='open_sign_up-but'
							type='button'
							onClick={() => setCoverPanelState('sign_up')}
							tabIndex={coverPanelState === 'sign_in' ? 0 : -1}
							disabled={disabled}
						>
							<label htmlFor='open_sign_up-but'>
								Регистрация
							</label>
							<ToolTip message={'Перейти к форме регистрации пользователя'} />
						</button>
					</section>
					<section id='sign_in_info-cont' className='cont'>
						<h1>Есть аккаунт?</h1>
						<p>Выполни вход по<br />регистрационным<br />данным</p>
						<button
							id='open_sign_in-but'
							type='button'
							onClick={() => setCoverPanelState('sign_in')}
							tabIndex={-1}
							disabled={disabled}
						>
							<label htmlFor='open_sign_in-but'>
								Авторизация
							</label>
							<ToolTip message={'Перейти к форме авторизации пользователя'} />
						</button>
					</section>
				</div>
				<button
					id='close_sign_up_info-button'
					type='button'
					tabIndex={-1}
					onClick={SignUp.handleReturnToSignUp}
					disabled={disabled}
					className={'cont'}
				>
					{ICONS.backCircled}
				</button>
			</div>
			<div id='img-cont' className='cont'>
				<img src={SignUpImg} alt='' className='sign_up-img' />
				<img src={SignInImg} alt='' className='sign_in-img' />
			</div>
		</div>
	)
}

export default CoverPanel