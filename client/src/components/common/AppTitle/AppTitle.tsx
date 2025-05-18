import React from 'react'

import { APP_TITLE } from '@/../constants'



const AppTitle = () => {
	return (
		<div className='app_title-cont'>
			<span className='app_title-name'>{APP_TITLE}</span>
		</div>
	)
}

export default AppTitle