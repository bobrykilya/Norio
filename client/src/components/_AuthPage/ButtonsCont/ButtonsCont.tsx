import React from 'react'

import { ICONS } from '@/assets/common/Icons-data'
import ToolTip from '@others/ToolTip/ToolTip'



type ButtonsContProps = {
	disabled?: boolean;
}
const ButtonsCont = ({ disabled }: ButtonsContProps) => {
	// const [deferredPrompt, setDeferredPrompt] = useState(false);

	// const askAppInstall = async () => {
	// console.log(deferredPrompt)
	// await deferredPrompt.prompt()
	// }

	// window.addEventListener("beforeinstallprompt", (e) => {
	//     e.preventDefault()
	//     // console.log(`deferredPrompt saved`)
	//     setDeferredPrompt(e)
	//   })

	return (
		<div className='buts-cont cont'>
			<button
				className='pwa-but'
				tabIndex={-1}
				// onClick={askAppInstall}
				disabled={disabled}
			>
				{ICONS.desktop}
				<ToolTip message='Создать ярлык на рабочем столе' />
			</button>
			<button
				className='info-but'
				tabIndex={-1}
				disabled={disabled}
			>
				{ICONS.instructions}
				<ToolTip message='Описание приложения и инструкция' />
			</button>
		</div>
	)
}

export default ButtonsCont